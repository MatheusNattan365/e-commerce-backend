export interface BaseUser {
    name: string;
    thumbnailUrl?: string;
    email: string;
    password: string;
    confirmedEmail: boolean;
}

export interface User extends BaseUser {
    id: number;
}
