import { MetadataType, SupportedType } from '../metadataType'
import { Result } from '../result';

export class Flow extends MetadataType {
    
    constructor() {
        super();
    }

    public getDependantTypes(): Array<SupportedType> {
        return [];
    }

    public getSObjectName(): string {
        return 'Flow';
    }
}