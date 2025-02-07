
export interface RegisterParams{
    username: string;
    password: string;
    email: string;
}

export interface RegisterResult {
    success: boolean;
    message: string;
}
