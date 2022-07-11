export interface BaseUser {
    email: string;
    confirmedEmail: boolean;
}

export interface User extends BaseUser {
    id: number;
}

export interface Users {
    [key: number]: User;
}
