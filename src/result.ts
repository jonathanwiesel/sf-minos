import { MetadataObject } from './metadataType'

export class Result {

    fullName: string;
    type: string;
    active: boolean;
    used: boolean;
    dependencies: Map<string, Map<string, Result>>;
    metadata: MetadataObject;

    constructor(descriptor: MetadataObject, type: string) {
        this.metadata = descriptor;
        this.type = type;
        this.fullName = descriptor.fullName;
        this.active = descriptor.active === undefined || descriptor.active;
    }
}