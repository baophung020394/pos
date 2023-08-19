export interface Branch {
    branchId: string;
    branchName: string | null;
    branchCode: string | null;
    branchMasterName: string | null;
    address: string | null;
    areaCityName: string | null;
    areaDistrictName: string | null;
    areaCommuneName: string | null;
    statusName: string | null;
    phone: string | null;
}

// export interface PolicyRequest {
//     PricePolicyNameCode: string | null;
//     pricePolicyName: string | null;
//     Note: string | null;
// }

export interface BranchResponse {
    success: boolean;
    data: Branch[];
    statusCode: number;
    errors: string[];
}
