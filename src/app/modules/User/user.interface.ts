

export type TUsername = {
    firstName: string;
    middleName: string;
    lastName: string;
}
export type TUser = {
    name: TUsername;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}