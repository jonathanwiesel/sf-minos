import { MetadataType, MetadataObject } from '../metadataType';
import { ApprovalProcess } from './approvalProcess';
import { EntitlementProcess } from './entitlementProcess';
import { WorkflowRule } from './workflowRule';

import { Result } from '../result';

export class FieldUpdate extends MetadataType {
    
    constructor() {
        super();
    }

    public getDependantTypes(): Array<string> {
        return [
            ApprovalProcess.name,
            EntitlementProcess.name,
            WorkflowRule.name
        ];
    }

    public getSObjectName(): string {
        return 'WorkflowFieldUpdate';
    }

    protected getDependenciesByType(descriptor: MetadataObject, type: string, possibleDependencies: Map<string, Result>): Map<string, Result> {

        //TODO
        return;
    }
}