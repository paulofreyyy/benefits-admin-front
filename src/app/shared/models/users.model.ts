export interface Users {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRoles;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user'
}