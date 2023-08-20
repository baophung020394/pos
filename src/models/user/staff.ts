export interface Staff {
    userId: string | null;
    firstName: string | null;
    lastName: string | null;
    fulName: string | null;
}

export interface StaffResponse {
    success: boolean;
    data: Staff[];
    statusCode: number;
    errors: string[];
}
