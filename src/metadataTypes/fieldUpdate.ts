import { MetadataType, SupportedType } from '../metadataType'
import { Result } from '../result';

export class FieldUpdate extends MetadataType {
    
    constructor() {
        super();
    }

    public getDependantTypes(): Array<SupportedType> {
        return [
            SupportedType.ApprovalProcess,
            SupportedType.EntitlementProcess,
            SupportedType.WorkflowRule
        ];
    }

    public getSObjectName(): string {
        return 'WorkflowFieldUpdate';
    }
}