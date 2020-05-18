import { MetadataType, SupportedType, CriteriaItem, ActionType } from '../metadataType'
import { Result, Status } from '../result';

interface EntitlementProcessMilestoneTimeTrigger {
    actions: Partial<Array<ActionType> | ActionType>;
    timeLength: number;
    workflowTimeTriggerUnit: string;
}

interface EntitlementProcessMilestoneItem {
    businessHours: string;
    criteriaBooleanFilter?: string;
    milestoneCriteriaFilterItems: Partial<Array<CriteriaItem> | CriteriaItem>;
    milestoneCriteriaFormula: string;
    milestoneName: string;
    minutesCustomClass: string;
    minutesToComplete: number;
    successActions: Partial<Array<ActionType> | ActionType>;
    timeTriggers: Partial<Array<EntitlementProcessMilestoneTimeTrigger> | EntitlementProcessMilestoneTimeTrigger>;
    useCriteriaStartTime: boolean;
}

interface EntitlementProcessDescriptor {
    fullName: string;
    active: boolean;
    businessHours: string;
    description: string;
    entryStartDateField: string;
    exitCriteriaBooleanFilter: string;
    exitCriteriaFilterItems: Partial<Array<CriteriaItem> | CriteriaItem>;
    exitCriteriaFormula: string;
    isVersionDefault: boolean;
    milestones: Partial<Array<EntitlementProcessMilestoneItem> | EntitlementProcessMilestoneItem>;
    name: string;
    SObjectType: string;
    versionMaster: string;
    versionNotes: string;
    versionNumber: number;
}

export class EntitlementProcess extends MetadataType {
    
    useTooling = false;

    constructor() {
        super();
    }

    public getDependantTypes(): Array<SupportedType> {
        return [];
    }

    public getSObjectName(): string {
        return 'EntitlementProcess';
    }

    protected getUsageForDescriptor(descriptor: any, possibleDependencies: Map<SupportedType, Map<string, Result>>): Result {
        
        descriptor = descriptor as Partial<EntitlementProcessDescriptor>;

        let res: Result = new Result();

        res.metadata = descriptor;
        res.type = SupportedType.EntitlementProcess;
        res.fullName = descriptor.fullName;
        res.active = descriptor.active; 
        res.unsuedStatus = res.active ? Status.Used : Status.Inactive;

        return res;
    }
}