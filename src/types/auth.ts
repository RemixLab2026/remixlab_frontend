export interface AuthRequest {
    username: string;
    password: string;
}

export interface UserInfo {
    exp: number;
    username: string;
}