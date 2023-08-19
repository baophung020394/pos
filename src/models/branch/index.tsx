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
    default: boolean;
}

export interface BranchRequest {
    BranchId: string;
    BranchName: string | null;
    BranchCode: string | null;
    BranchMasterName: string | null;
    Address: string | null;
    AreaCityName: string | null;
    AreaDistrictName: string | null;
    AreaCommuneName: string | null;
    StatusName: string | null;
    PhoneNumber: string | null;
    Default: boolean;
    Status: boolean;
    AreaCityId: string | null;
    AreaDistrictId: string | null;
}

export interface BranchResponse {
    success: boolean;
    data: Branch[];
    statusCode: number;
    errors: string[];
}
