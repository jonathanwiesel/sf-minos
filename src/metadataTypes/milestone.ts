import { MetadataType, MetadataObject } from '../metadataType';
import { EntitlementProcess, EntitlementProcessDescriptor, EntitlementProcessMilestoneItem } from './entitlementProcess';
import { Result } from '../result';

export interface MilestoneDescriptor extends MetadataObject {
    description: string;
    RecurrenceType: string;
}

export class Milestone extends MetadataType {
    
    constructor() {
        super();
    }

    public getDependantTypes(): Array<string> {
        return [
            EntitlementProcess.name
        ];
    }

    public getSObjectName(): string {
        return 'MilestoneType';
    }

    protected getDependenciesByType(descriptor: MetadataObject, type: string, possibleDependencies: Map<string, Result>): Map<string, Result> {
        
        let dependencies: Map<string, Result>;

        switch (type) {

            case EntitlementProcess.name:

                dependencies = this.getDependantEntitlements(descriptor, possibleDependencies);
                break;
                
            default:
                break;
        }

        return dependencies;
    }

    private getDependantEntitlements(descriptor: MetadataObject, possibleDependencies: Map<string, Result>): Map<string, Result> {

        let dependencies: Map<string, Result> = new Map();

        let entitlementDesc: EntitlementProcessDescriptor;
        let milestones: Array<Partial<EntitlementProcessMilestoneItem>>;

        for (let entitlementRes of possibleDependencies.values()) {

            entitlementDesc = entitlementRes.metadata as EntitlementProcessDescriptor;
            milestones = entitlementDesc.milestones instanceof Array ? entitlementDesc.milestones : [entitlementDesc.milestones];

            for (let milestone of milestones) {
                if (milestone.milestoneName === descriptor.fullName) {
                    dependencies.set(entitlementRes.fullName, entitlementRes);
                }
            }
        }

        return dependencies;
    }
}