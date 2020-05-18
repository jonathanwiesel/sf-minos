import { MetadataType, SupportedType } from '../metadataType'
import { Result } from '../result';

export class EmailTemplate extends MetadataType {
    
    constructor() {
        super();
    }

    public getDependantTypes(): Array<SupportedType> {
        return [
            SupportedType.ApprovalProcess,
            SupportedType.EmailAlert
        ];
    }

    public getSObjectName(): string {
        return 'EmailTemplate';
    }
}