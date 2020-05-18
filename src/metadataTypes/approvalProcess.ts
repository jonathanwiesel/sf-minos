import { MetadataType, SupportedType, CriteriaItem, ActionType } from '../metadataType'
import { Result, Status } from '../result';

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

interface Approver {
    name: string;
    type: string;
}

interface ApprovalStep {
    allowDelegate: boolean;
    approvalActions: Partial<ApprovalAction>;
    assignedApprover: {
        approver: Partial<Array<Approver> | Approver>;
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

interface ApprovalProcessDescriptor {
    fullName: string;
    active: boolean;
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
    
    useTooling = false;

    constructor() {
        super();
    }

    public getDependantTypes(): Array<SupportedType> {
        return [];
    }

    public getSObjectName(): string {
        return 'ApprovalProcess';
    }

    protected getUsageForDescriptor(descriptor: any, possibleDependencies: Map<SupportedType, Map<string, Result>>): Result {
        
        descriptor = descriptor as Partial<ApprovalProcessDescriptor>;

        let res: Result = new Result();

        res.metadata = descriptor;
        res.type = SupportedType.ApprovalProcess;
        res.fullName = descriptor.fullName;
        res.active = descriptor.active;

        res.unsuedStatus = res.active ? Status.Used : Status.Inactive;

        return res;
    }
}