export type SignInRequestType = {
    username: string,
    password: string
}

export type SignInSuccessResponseType = {
    access_token: string,
    refresh_token: string
    exprires_access_token: string,
}

export type SignUpRequestType = {
    email: string,
    username: string,
    password: string,
}

export type UserProfile = {
    email: string,
    username: string,
    role: string,
    avatar: string,
    created_at: string,
    updated_at: string,
    created_by: string,
    updated_by: string,
    delete_at: string,
    delete_by: string,
}

export type ForgotPasswordRequest = {
    email: string,
}
export type ForgotPasswordResponse = {
    email: string,
    otp: string,
}
export type ResetPasswordRequest = {
    email: string,
    password: string,
    otp: string,
}
