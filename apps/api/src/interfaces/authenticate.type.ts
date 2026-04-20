export type AuthenticateUserRequest = {
    email: any,
    password: any
}

export type AuthenticateKeyRequest = {
    key: string
}

export type AuthenticateAnswer = {
    token: string,
}

export type AuthenticateError = {
    status: 401 | 400,
    message: "Unauthorized" | "No known user with this email" | "Wrong password"
}

export type JwtPayloadUser = {
    type: "user",
    _id: string,
    email: string
}