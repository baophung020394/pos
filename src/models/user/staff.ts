export interface Staff {
    userId: string;
    firstName: string | null;
    lastName: string | null;
    fulName: string | null;
    phone: string | null;
    roleName: string | null;
    branchName: string | null;
    createdDate: string
    createdName: string | null;
    modifiedDate: string | null;
    modifiedName: string | null;
    status: string | null;
}

export interface StaffResponse {
    success: boolean;
    data: Staff[];
    statusCode: number;
    errors: string[];
}
