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

import { Result } from './result';

import { Connection } from 'jsforce';

const TOOLING_COMPOSITE_MAX_SIZE = 25;
const METADATA_READ_MAX_SIZE = 10;

export interface CriteriaItem {
    field: string;
    operation: string;
    value: string;
    valueField?: string;
}

export interface ActionType {
    field: string;
    operation: string;
    value: string;
    valueField?: string;
}

export enum SupportedType {
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

export abstract class MetadataType {

    objectDescriptors: Map<string, any>;
    useTooling = false;
    conn: Connection;

    /**
     * *******************
     * ABSTRACT METHODS
     * *******************
     */

    public abstract getDependantTypes(): Array<SupportedType>;
    public abstract getSObjectName(): string;
    protected abstract getUsageForDescriptor(descriptor: any, possibleDependencies: Map<SupportedType, Map<string, Result>>): Result;

    /**
     * *******************
     * DEFINED METHODS
     * *******************
     */

    constructor() {
        this.objectDescriptors = new Map();
    }
    
    public async fillTypeData(): Promise<void> {        

        if (this.useTooling) await this.fetchToolingSObjects();
        else await this.fetchMetadataSObjects();
    }


    public reportUsage(possibleDependencies: Map<SupportedType, Map<string, Result>>): Map<string, Result> {
        
        let results: Map<string, Result> = new Map();
        let result: Result;

        for (let itereatingDescriptor in this.objectDescriptors.values()) {

            result = this.getUsageForDescriptor(itereatingDescriptor, possibleDependencies);
            results.set(result.fullName, result);
        }

        return results;
    }

    /**
     * *******************
     * TOOLING API
     * *******************
     */

    private async fetchToolingSObjects(): Promise<void> {

        const records = await this.conn.tooling.sobject(this.getSObjectName()).find({}, ['Id']);
        
        const ids: Array<string> = records.map(r => r.Id);

        await this.fetchToolingDescriptions(ids);
    }


    private async fetchToolingDescriptions(ids: Array<string>, index: number = 0): Promise<void> {

        let body = {
            allOrNone: false,
            compositeRequest: []
        }

        let i = index;
        let count = 0;

        while (i < ids.length && count < TOOLING_COMPOSITE_MAX_SIZE) {
            
            body.compositeRequest.push({
                method: 'GET',
                url: `/services/data/${this.conn.version}/tooling/sobjects/${this.getSObjectName()}/${ids[i]}`
            });

            i++;
            count++;
        }


        const res: any = await this.conn.request({
            body: JSON.stringify(body),
            method: 'POST',
            url: '/tooling/composite',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        for (let descriptor of res.compositeResponse) {
            this.objectDescriptors.set(descriptor.body.FullName, descriptor.body);
        }

        if (i < (ids.length - 1)) {
            await this.fetchToolingDescriptions(ids, i);
        }
    }

    /**
     * *******************
     * METADATA API
     * *******************
     */

    private async fetchMetadataSObjects(): Promise<void> {

        const records = await this.conn.metadata.list([{type: this.getSObjectName()}]);

        const fullNames: Array<string> = records.map(r => r.fullName);

        await this.fetchMetadataDescriptions(fullNames);
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
    public static createMetadataTypeDefinition(type: SupportedType, conn: Connection): MetadataType {
        
        let instance : MetadataType;

        switch (type) {
            case SupportedType.ApprovalProcess: instance = new ApprovalProcess();
                break;
            case SupportedType.EmailAlert: instance = new EmailAlert();
                break;
            case SupportedType.EmailTemplate: instance = new EmailTemplate();
                break;
            case SupportedType.EntitlementProcess: instance = new EntitlementProcess();
                break;
            case SupportedType.FieldUpdate: instance = new FieldUpdate();
                break;
            case SupportedType.Flow: instance = new Flow();
                break;
             case SupportedType.Milestone: instance = new Milestone();
                break;
            case SupportedType.ValidationRule: instance = new ValidationRule();
                break;
            case SupportedType.WorkflowRule: instance = new WorkflowRule();
                break;
            case SupportedType.WorkflowTask: instance = new WorkflowTask();
                break;
            default:
                break;
        }

        instance.conn = conn;

        return instance;
    }
}