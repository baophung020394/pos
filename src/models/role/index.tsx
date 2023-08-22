export interface Functions {
    functionId: string;
    pageId: string | null;
    functionName: string | null;
    functionClaims: string | null;
    roleFunctionClaims: RoleFunctionClaims[];
}

export interface RoleFunctionClaims {
    roleId: string;
    actionId: string | null;
    claimName: string | null;
    value: string | null;
}

export interface Role {
    roleId: string;
    roleName: string | null;
    note: string | null;
    status: string | null;
    SalseStaffActive: string | null;
    SalseStaffInactive: string | null;
    functions: Functions[];
}

export interface RoleRequest {
    roleName: string | null;
    note: string | null;
    functions?: Functions[];
}

export interface RoleResponse {
    success: boolean;
    data: Role[];
    statusCode: number;
    errors: string[];
}
export interface RoleResponseAdd {
    success: boolean;
    data: Role;
    statusCode: number;
    errors: string[];
}
