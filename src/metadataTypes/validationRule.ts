import { MetadataType, MetadataObject } from '../metadataType';

export interface ValidationRuleDescriptor extends MetadataObject {
    description: string;
    errorConditionFormula: string;
    errorDisplayField: string;
    errorMessage: string;
}

export class ValidationRule extends MetadataType {
    
    constructor() {
        super();
    }

    public getSObjectName(): string {
        return 'ValidationRule';
    }
}