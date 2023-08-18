export interface Policy {
    pricePolicyId: string;
    pricePolicyNameCode: string | null;
    pricePolicyName: string | null;
    branchId_Apply: string | null;
    note: string | null;
    status: boolean;
    branchId: string | null;
    createdDate: string | null;
    createdBy: string | null;
    modifiedDate: string | null;
    modifiedBy: string | null;
}

export interface PolicyRequest {
    PricePolicyNameCode: string | null
    pricePolicyName: string | null
    Note: string | null
}

export interface PolicyResponse {
    success: boolean;
    data: Policy[];
    statusCode: number;
    errors: string[];
}
