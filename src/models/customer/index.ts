export interface Customer {
    customerId: string;
    customerGroupName: string;
    customerCode: string;
    customerName: string;
    gender: string;
    phoneNumber: string;
    birthDay: null;
    email: string;
    address: string;
    note: string;
    statusName: null;
    taxCode: null;
    hastag: null;
    facebookLink: null;
    debt: number;
    areaCityName: null;
    areaDistrictName: null;
    areaCommuneName: null;
    createdDate: string;
    createdByName: null;
    modifiedDate: string;
    modifiedByName: null;
    selected?: boolean;
}

export interface CustomerResponse {
    success: boolean;
    data: Customer[];
    statusCode: number;
    errors: string[];
}

export interface CustomerDetail {
    idTag: string;
    orderReceiptDate: string;
    orderReturnDate: string;
    service: string;
    technicalName: string;
    total: string;
    status: string;
    selected?: boolean;
}
