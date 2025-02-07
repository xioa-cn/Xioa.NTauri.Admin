export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginResult {
    success: boolean;
    message: string;
    token?: string;
}

export interface LoginClass {
    Login(loginParams: LoginParams): LoginResult;
}
