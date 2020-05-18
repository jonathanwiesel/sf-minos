import { MetadataType, SupportedType } from '../metadataType'
import { Result } from '../result';

export class Milestone extends MetadataType {
    
    useTooling = false;

    constructor() {
        super();
    }

    public getDependantTypes(): Array<SupportedType> {
        return [
            SupportedType.EntitlementProcess
        ];
    }

    public getSObjectName(): string {
        return 'MilestoneType';
    }
}