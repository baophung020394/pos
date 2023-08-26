export interface CustomerGroup {
    customerGroupId: string;
    customerGroupCode: string | null;
    customerGroupName: string | null;
    pricePolicyName: string | null;
    discount: number | 0;
    note: string | null;
    statusName: string | null;
    totalCustomer: number | 0;
    createdDate: string | null;
    createdName: string | null;
    modifiedDate: string | null;
    modifiedName: string | null;
    discription: string | null;
}

export interface CustomerGroupReq {
    CustomerGroupCode: string | null;
    CustomerGroupName: string | null;
    Discount: number | 0;
    PricePolicyName: string | null;
    Note: string | null;
}

export interface CustomerGroupResponse {
    success: boolean;
    data: CustomerGroup[];
    statusCode: number;
    errors: string[];
}

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
    customerCode: string;
    customerName: string;
    gender: string;
    phoneNumber: string;
    birthDay: string;
    address: string;
    note: string;
    status: string;
    taxCode: string;
    hastag: string;
    facebookLink: string;
    debt: string;
    areaCityId: string;
    areaDistrictId: string;
    customerGroupId: string;
    customerGroupName: string;
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
