import { MetadataType, SupportedType } from '../metadataType'
import { Result } from '../result';

interface Recipient {
    field: string;
    recipient: string;
    type: string;
}

interface EmailAlertDescriptor {
    fullName: string;
    ccEmails: string;
    description: string;
    protected: boolean;
    recipients: Partial<Array<Recipient> | Recipient>;
    senderAddress: string;
    senderType: string;
    template: string;
}

export class EmailAlert extends MetadataType {
    
    useTooling = false;

    constructor() {
        super();
    }

    public getDependantTypes(): Array<SupportedType> {
        return [
            SupportedType.ApprovalProcess,
            SupportedType.EntitlementProcess,
            SupportedType.Flow,
            SupportedType.WorkflowRule
        ];
    }

    public getSObjectName(): string {
        return 'WorkflowAlert';
    }


    protected getUsageForDescriptor(descriptor: any, possibleDependencies: Map<SupportedType, Map<string, Result>>): Result {
        
        descriptor = descriptor as Partial<EmailAlertDescriptor>;

        let res: Result = new Result();

        res.metadata = descriptor;
        res.type = SupportedType.EmailAlert;
        res.fullName = descriptor.fullName;
        res.active = true; //
        // res.dependencies = [];

        // res.unsuedStatus = res.active ? Status.Used : Status.Inactive;

        return res;
    }
}