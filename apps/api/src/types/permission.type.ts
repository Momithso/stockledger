export interface permission {
    databaseName: string,
    displayName: string,
    description: string,
    options: permissionOptions,
}

export type permissionOptions = {
    read?: boolean,
    write?: permissionOptionsWrite,
    execute?: boolean
}

export type permissionOptionsWrite = {
    create?: boolean,
    update?: boolean,
    delete?: boolean
}

export type permissionCheck = {
    databaseName: string,
    options: permissionOptions
}

export type permissionError = {
    status: 401 | 400,
    message: "Insufficient permissions" | "Missing Authorization" | "Missmatch"
}