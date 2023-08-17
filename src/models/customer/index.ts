export interface Customer {
    customerId: string;
    customerGroupId?: string;
    customerGroupName: string;
    customerCode: string;
    customerName: string;
    gender: string;
    phoneNumber: string;
    birthDay: string;
    email: string;
    address: string;
    note: string;
    statusName: string;
    status?: string;
    taxCode: string;
    hastag: string;
    facebookLink: string;
    debt: string | number;
    areaCityId?: string;
    areaCityName: string;
    areaDistrictName: string;
    areaDistrictId?: string;
    areaCommuneName: string;
    createdDate: string;
    createdByName: string;
    modifiedDate: string;
    modifiedByName: string;
    selected?: boolean;
}

export interface CustomerReq {
    CustomerCode: string;
    CustomerName: string;
    Gender: string;
    PhoneNumber: string;
    BirthDay: string;
    Email: string;
    Address: string;
    Note: string;
    Status: string;
    TaxCode: string;
    Hastag: string;
    FacebookLink: string;
    Debt: string;
    AreaCityId: string;
    AreaDistrictId: string;
    CustomerGroupId: string;
    CustomerGroupName: string;
    email: string;
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
