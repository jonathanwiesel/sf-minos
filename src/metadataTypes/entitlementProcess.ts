import { MetadataType, CriteriaItem, ActionType, MetadataObject } from '../metadataType'

interface EntitlementProcessMilestoneTimeTrigger {
    actions: Partial<Array<ActionType> | ActionType>;
    timeLength: number;
    workflowTimeTriggerUnit: string;
}

export interface EntitlementProcessMilestoneItem {
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

export interface EntitlementProcessDescriptor extends MetadataObject {
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
    
    constructor() {
        super();
    }

    public getSObjectName(): string {
        return 'EntitlementProcess';
    }
}