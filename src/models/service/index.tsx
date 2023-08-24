export interface Service {
    serviceId: string;
    image: string;
    serviceName: string;
    serviceCode: string;
    categoryName: string;
    retailPrice: string;
    agentPrice: string;
    entryPrice: string;
    webSync: boolean;
    reportPrice: string;
    createdDate: string;
    createdName: string;
    modifiedDate: string;
    modifiedName: string;
}

export interface ServiceResponse {
    success: boolean;
    data: Service[];
    statusCode: number;
    errors: string[];
}
