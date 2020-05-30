import { MetadataType, MetadataObject, ActionType, CriteriaItem } from '../metadataType'

export interface WorkflowRuleDescriptor extends MetadataObject {
    actions: Partial<Array<ActionType> | ActionType>;
    booleanFilter: string;
    criteriaItems: Partial<Array<CriteriaItem> | CriteriaItem>;
    description: string;
    formula: string;
    triggerType: string;
    workflowTimeTriggers: {
        actions: Partial<Array<ActionType> | ActionType>;
        offsetFromField: string;
        timeLength: string;
        workflowTimeTriggerUnit: string;
    }
}

export class WorkflowRule extends MetadataType {
    
    constructor() {
        super();
    }

    public getSObjectName(): string {
        return 'WorkflowRule';
    }
}