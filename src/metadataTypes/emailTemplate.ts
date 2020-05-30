import { MetadataType, MetadataObject } from '../metadataType';
import { ApprovalProcess } from './approvalProcess';
import { EmailAlert } from './emailAlert';
import { Result } from '../result';

export enum EmailTemplateStyle {
    none,
    freeForm,
    formalLetter,
    promotionRight,
    promotionLeft,
    newsletter,
    products
}

export enum EmailTemplateType {
    text,
    html,
    custom,
    visualforce
}

export enum EmailTemplateUiType {
    Aloha,
    SFX,
    SFX_Sample
}

export interface EmailTemplateDescriptor extends MetadataObject {
    attachedDocuments: Array<string> | string;
    content: string;
    description: string;
    encodingKey: string;
    letterhead: string;
    name: string;
    style: EmailTemplateStyle;
    subject: string;
    textOnly: string;
    type: EmailTemplateType;
    UiType: EmailTemplateUiType;
}

export class EmailTemplate extends MetadataType {
    
    constructor() {
        super();
    }

    public getDependantTypes(): Array<string> {
        return [
            ApprovalProcess.name,
            EmailAlert.name
        ];
    }

    public getSObjectName(): string {
        return 'EmailTemplate';
    }

    protected async getMetadataFolders(): Promise<Array<string>> { 
        return await this.getMetadataFullNames('EmailFolder', null);
    }

    protected getDependenciesByType(descriptor: MetadataObject, type: string, possibleDependencies: Map<string, Result>): Map<string, Result> {
        
        let dependencies: Map<string, Result>;

        switch (type) {

            case ApprovalProcess.name:

                dependencies = this.getDependantApprovalProcesses(descriptor, possibleDependencies);
                break;

            case EmailAlert.name:

                dependencies = this.getDependantEmailAlerts(descriptor, possibleDependencies);
                break;
                
            default:
                break;
        }

        return dependencies;
    }


    private getDependantApprovalProcesses(descriptor: MetadataObject, possibleDependencies: Map<string, Result>): Map<string, Result> {
        return null;
    }

    private getDependantEmailAlerts(descriptor: MetadataObject, possibleDependencies: Map<string, Result>): Map<string, Result> {
        return null;
    }
}