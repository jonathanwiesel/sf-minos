import { MetadataType, MetadataObject } from '../metadataType';
import { ApprovalProcess } from './approvalProcess';
import { EntitlementProcess } from './entitlementProcess';
import { Flow } from './flow';
import { WorkflowRule } from './workflowRule';
import { Result } from '../result';

interface Recipient {
    field: string;
    recipient: string;
    type: string;
}

export interface EmailAlertDescriptor extends MetadataObject {
    ccEmails: string;
    description: string;
    protected: boolean;
    recipients: Partial<Array<Recipient> | Recipient>;
    senderAddress: string;
    senderType: string;
    template: string;
}

export class EmailAlert extends MetadataType {
    
    constructor() {
        super();
    }

    public getDependantTypes(): Array<string> {
        return [
            ApprovalProcess.name,
            EntitlementProcess.name,
            Flow.name,
            WorkflowRule.name
        ];
    }

    public getSObjectName(): string {
        return 'WorkflowAlert';
    }


    protected getDependenciesByType(descriptor: MetadataObject, type: string, possibleDependencies: Map<string, Result>): Map<string, Result> {
        //TODO
        return null;
    }
}