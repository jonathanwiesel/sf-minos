import { MetadataType, CriteriaItem, ActionType, MetadataObject } from '../metadataType'

interface ApprovalEntryCriteria {
    booleanFilter: string;
    criteriaItems: Partial<Array<CriteriaItem> | CriteriaItem>;
    formula: string;
}

interface ApprovalAction {
    action: Partial<Array<ActionType> | ActionType>;
}

interface SubmitterType {
    submitter: string;
    type: string;
}

interface ApprovalStep {
    allowDelegate: boolean;
    approvalActions: Partial<ApprovalAction>;
    assignedApprover: {
        approver: Partial<Array<ActionType> | ActionType>;
        whenMultipleApprovers: string;
    };
    description: string;
    entryCriteria: Partial<ApprovalEntryCriteria>;
    ifCriteriaNotMet: string;
    label: string;
    name: string;
    rejectBehavior: {
        type: string;
    };
    rejectionActions: Partial<ApprovalAction>;
}

export interface ApprovalProcessDescriptor extends MetadataObject {
    allowRecall: boolean;
    allowedSubmitters: Partial<Array<SubmitterType> | SubmitterType>;
    approvalPageFields: {
        field: Array<string>;
    };
    approvalStep: Partial<Array<ApprovalStep> | ApprovalStep>;
    description: string;
    emailTemplate: string;
    enableMobileDeviceAccess: boolean;
    entryCriteria: Partial<ApprovalEntryCriteria>;
    finalApprovalActions: Partial<ApprovalAction>;
    finalApprovalRecordLock: boolean;
    finalRejectionActions: Partial<ApprovalAction>;
    finalRejectionRecordLock: boolean;
    initialSubmissionActions: Partial<ApprovalAction>;
    label: string;
    nextAutomatedApprover: {
        useApproverFieldOfRecordOwner: boolean;
        userHierarchyField: string;
    };
    postTemplate: string;
    recallActions: Partial<ApprovalAction>;
    recordEditability: string;
    showApprovalHistory: boolean;
}


export class ApprovalProcess extends MetadataType {
    
    constructor() {
        super();
    }

    public getSObjectName(): string {
        return 'ApprovalProcess';
    }
}