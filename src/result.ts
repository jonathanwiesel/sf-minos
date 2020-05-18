import { SupportedType } from './metadataType'

export enum Status {
    Used,
    Inactive,
    InactiveDependencies,
    NoDependencies
}

export class Result {

    fullName: string;
    type: SupportedType;
    active: boolean;
    unsuedStatus: Status;
    dependencies: Array<Result>;
    metadata: any;
}