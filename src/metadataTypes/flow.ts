import { MetadataType, MetadataObject } from '../metadataType';

interface FlowActionCallOutputParameter {
    assignToReference: string;
    name: string;
}

interface FlowElementReferenceOrValue {
    booleanValue: boolean;
    dateTimeValue: string;
    dateValue: string;
    elementReference: string;
    numberValue: number;
    stringValue: string;
}

interface FlowActionCallInputParameter {
    name: string;
    value: Partial<FlowElementReferenceOrValue>;
}

interface FlowDataTypeMapping {
    typeName: string;
    typeValue: string;
}

interface FlowConnector {
    targetReference: string;
}

enum InvocableActionType {
    activateSessionPermSet,
    addMessageToQuipChat,
    addMessageToQuipDocument,
    addQuipDocumentToFolder,
    addUsersToQuipDocument,
    addUsersToQuipChat,
    attachQuipDocumentToRecord,
    apex,
    archiveKnowledgeArticles,
    assignKnowledgeArticles,
    chatterPost,
    choosePricebook,
    contactRequestAction,
    component,
    contentWorkspaceEnableFolders,
    copyQuipDocument,
    createDraftFromOnlineKnowledgeArticle,
    createQuipChat,
    createQuipDocument,
    createQuipFolder,
    customNotificationAction,
    deactivateSessionPermSet,
    deleteKnowledgeArticle,
    editQuipDocument,
    emailAlert,
    emailSimple,
    externalService,
    flow,
    quickAction,
    publishKnowledgeArticles,
    restoreKnowledgeArticleVersion,
    submitKnowledgeArticleForTranslation,
    submit,
    //order management
    cancelFulfillmentOrderItem,
    cancelOrderItemSummariesPreview,
    cancelOrderItemSummariesSubmit,
    createCreditMemoOrderSummary,
    createFulfillmentOrder,
    createInvoiceFromFulfillmentOrder,
    createOrderPaymentSummary,
    createOrderSummary,
    ensureFundsOrderSummaryAsync,
    ensureRefundsOrderSummaryAsync,
    returnOrderItemSummariesPreview,
    returnOrderItemSummariesSubmit,
    //manufacturing
    refreshActualsCalculation,
    recalculateForecast,
    massUpdateAccountForecast,
    massUpdateSalesAgreement,
    //future
    thanks,
    metricRefresh,
    exportSurveyResponses,
    sendSurveyInvitation
}

interface FlowActionCall {
    actionName: string;
    actionType: InvocableActionType;
    connector: Partial<FlowConnector>;
    dataTypeMappings: Partial<Array<FlowDataTypeMapping> | FlowDataTypeMapping>;
    faultConnector: Partial<FlowConnector>;
    inputParameters: Partial<Array<FlowActionCallInputParameter> | FlowActionCallInputParameter>;
    outputParameters: Partial<Array<FlowActionCallOutputParameter> | FlowActionCallOutputParameter>;
    storeOutputAutomatically: boolean;
}

interface FlowApexPluginCallInputParameter {
    name: string;
    value: Partial<FlowElementReferenceOrValue>;
}

interface FlowApexPluginCallOutputParameter {
    assignToReference: string;
    name: string;
}

interface FlowApexPluginCall {
    apexClass: string;
    connector: Partial<FlowConnector>;
    faultConnector: Partial<FlowConnector>;
    inputParameters: Partial<Array<FlowApexPluginCallInputParameter> | FlowApexPluginCallInputParameter>;
    outputParameters: Partial<Array<FlowApexPluginCallOutputParameter> | FlowApexPluginCallOutputParameter>;
}

interface FlowRecordFilter {
    field: string;
    operator: string;
    value: Partial<FlowElementReferenceOrValue>;
}

interface FlowMetadataValue {
    name: string;
    value: Partial<FlowElementReferenceOrValue>;
}

enum FlowStartFrequency {
    Once,
    Daily,
    Weekly
}

interface FlowSchedule {
    frequency: FlowStartFrequency;
    startDate: string;
    startTime: string;
}

enum RecordTriggerType {
    Create,
    Update,
    CreateAndUpdate
}

enum FlowTriggerType {
    Scheduled,
    RecordBeforeSave
}

interface FlowStart {
    connector: Partial<FlowConnector>;
    filters: Partial<Array<FlowRecordFilter> | FlowRecordFilter>;
    object: string;
    recordTriggerType: RecordTriggerType;
    schedule: Partial<FlowSchedule>;
    triggerType: FlowTriggerType;
}

interface FlowSubflowInputAssignment {
    name: string;
    value: Partial<FlowElementReferenceOrValue>;
}

interface FlowSubflowOutputAssignment {
    assignToReference: string;
    name: string;
}

interface FlowSubflow {
    connector: Partial<FlowConnector>;
    flowName: string;
    inputAssignments: Partial<Array<FlowSubflowInputAssignment> | FlowSubflowInputAssignment>;
    outputAssignments: Partial<Array<FlowSubflowOutputAssignment> | FlowSubflowOutputAssignment>;
}

enum FlowProcessType {
    Appointments,
    AutoLaunchedFlow,
    ContactRequestFlow,
    CustomEvent,
    FieldServiceMobile,
    FieldServiceWeb,
    Flow,
    InvocableProcess,
    Survey,
    Workflow,
    //internal or future
    ActionCadenceFlow,
    ActionPlan,
    CartAsyncFlow,
    CheckoutFlow,
    DecisionStudio,
    DigitalForm,
    Journey,
    JourneyBuilderIntegration,
    LoginFlow,
    ManagedContentFlow,
    OrchestrationFlow,
    SalesEntryExperienceFlow,
    SurveyEnrich,
    TransactionSecurityFlow,
    UserProvisioningFlow
}

enum FlowRunInMode {
    DefaultMode,
    SystemModeWithSharing
}

enum FlowVersionStatus {
    Active,
    Draft,
    Obsolete,
    InvalidDraft
}

export interface FlowDescriptor extends MetadataObject {
    actionCalls: Partial<Array<FlowActionCall> | FlowActionCall>;
    apexPluginCalls: Partial<Array<FlowApexPluginCall> | FlowApexPluginCall>;
    description: string;
    interviewLabel: string;
    isAdditionalPermissionRequiredToRun: boolean;
    isTemplate: boolean;
    label: string;
    processMetadataValues: Partial<Array<FlowMetadataValue> | FlowMetadataValue>;
    processType: FlowProcessType;
    runInMode: FlowRunInMode;
    start: Partial<FlowStart>;
    status: FlowVersionStatus;
    subflows: Partial<Array<FlowSubflow> | FlowSubflow>;
}

export class Flow extends MetadataType {
    
    constructor() {
        super();
    }

    public getSObjectName(): string {
        return 'Flow';
    }
}