import { ApprovalProcess } from './metadataTypes/approvalProcess';
import { EmailAlert } from './metadataTypes/emailAlert';
import { EmailTemplate } from './metadataTypes/emailTemplate';
import { EntitlementProcess } from './metadataTypes/entitlementProcess';
import { FieldUpdate } from './metadataTypes/fieldUpdate';
import { Flow } from './metadataTypes/flow';
import { Milestone } from './metadataTypes/milestone';
import { ValidationRule } from './metadataTypes/validationRule';
import { WorkflowRule } from './metadataTypes/workflowRule';
import { WorkflowTask } from './metadataTypes/workflowTask';

export const MetadataStore: any = {
    ApprovalProcess,
    EmailAlert,
    EmailTemplate,
    EntitlementProcess,
    FieldUpdate,
    Flow,
    Milestone,
    ValidationRule,
    WorkflowRule,
    WorkflowTask
}

import { Result } from './result';

import { Connection } from 'jsforce';

const METADATA_READ_MAX_SIZE = 10;
const VALID_MANAGEABLE_STATES: Array<string> = ['unmanaged', 'deprecatedEditable', 'installedEditable'];

export interface CriteriaItem {
    field: string;
    operation: string;
    value: string;
    valueField?: string;
}

export interface ActionType {
    name: string;
    type: string;
}

export interface MetadataObject {
    fullName: string;
    active?: boolean;
}

export abstract class MetadataType {

    objectDescriptors: Map<string, MetadataObject>;
    conn: Connection;
    type: string;

    /**
     * *******************
     * ABSTRACT METHODS
     * *******************
     */

    public abstract getSObjectName(): string;

    public getDependantTypes(): Array<string> { return []; }
    protected async getMetadataFolders(): Promise<Array<string>> { return [null]; }
    protected getDependenciesByType(descriptor: MetadataObject, type:string, possibleDependencies: Map<string, Result>): Map<string, Result> { return null; }

    /**
     * *******************
     * DEFINED METHODS
     * *******************
     */

    constructor() {
        this.objectDescriptors = new Map();
    }
    
    public async fillTypeData(): Promise<void> {        

        const folders = await this.getMetadataFolders();
        let fullNames: Array<string> = [];

        for (let folder of folders) {
            fullNames = fullNames.concat(await this.getMetadataFullNames(this.getSObjectName(), folder))
        }

        await this.fetchMetadataDescriptions(fullNames);
    }


    public reportUsage(possibleDependencies: Map<string, Map<string, Result>>): Map<string, Result> {
        
        let results: Map<string, Result> = new Map();
        let result: Result;
        
        for (let itereatingDescriptor of this.objectDescriptors.values()) {

            result = new Result(itereatingDescriptor, this.type);

            if (this.getDependantTypes().length) {

                for (let dependantType of this.getDependantTypes()) {
                    result.dependencies.set(dependantType, this.getDependenciesByType(itereatingDescriptor, dependantType, possibleDependencies.get(dependantType)));
                }

                result.used = false;

                if (result.dependencies.size) {

                    for (let dependencyType of result.dependencies.keys()) {

                        for (let dependencyRes of result.dependencies.get(dependencyType).values()) {

                            if (dependencyRes.used) {
                                result.used = true;
                                break;
                            }
                        }

                        if (result.used) {
                            break;
                        }
                    }
                }

            } else {
                result.used = result.active;
            }

            results.set(result.fullName, result);
        }

        return results;
    }
    
    protected async getMetadataFullNames(metadataType: string, folder: string): Promise<Array<string>> {

        const records = await this.conn.metadata.list([{type: metadataType, folder: folder}]);

        const fullNames: Array<string> = records.reduce((filtered, record) => {
            if (!record.manageableState || VALID_MANAGEABLE_STATES.includes(record.manageableState)) {
                filtered.push(record.fullName);
            }
            return filtered;
        }, []);

        return fullNames;
    }

    private async fetchMetadataDescriptions(fullNames: Array<string>, index: number = 0): Promise<void> {

        let namesToFetch: Array<string> = [];

        let i = index;
        let count = 0;

        while (i < fullNames.length && count < METADATA_READ_MAX_SIZE) {
            
            namesToFetch.push(fullNames[i]);

            i++;
            count++;
        }


        let descriptors: any = await this.conn.metadata.read(this.getSObjectName(), namesToFetch);

        if (!(descriptors instanceof Array)) {
            descriptors = [descriptors];
        }

        for (let descriptor of descriptors) {
            this.objectDescriptors.set(descriptor.fullName, descriptor);
        }

        if (i < (fullNames.length - 1)) {
            await this.fetchMetadataDescriptions(fullNames, i);
        }
    }

    /**
     * *******************
     * STATIC METHODS
     * *******************
     */
    public static createMetadataTypeDefinition(type: string, conn: Connection): MetadataType {
        
        let instance : MetadataType = MetadataStore[type]();

        instance.conn = conn;
        instance.type = type;

        return instance;
    }
}