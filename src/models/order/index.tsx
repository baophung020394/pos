export interface Order {
    orderId: string;
    votes: string;
    receiveDate: string;
    customerName: string;
    // categoryName: string;
    phone: string;
    customerGroup: string;
    serviceName: string;
    technicalMember: string;
    total: string;
    statusName: string;
    action: string;
    createdDate: string;
    createdName: string;
    modifiedDate: string;
    modifiedName: string;
}

export interface OrderResponse {
    success: boolean;
    data: Order[];
    statusCode: number;
    errors: string[];
}
