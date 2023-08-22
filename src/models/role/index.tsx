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
    salseStaffActive: string | null;
    salseStaffInactive: string | null;
    createdDate: string | null;
    createdName: string | null;
    modifiedDate: string | null;
    modifiedName: string | null;
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
