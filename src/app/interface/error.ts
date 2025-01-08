
export type TErrorSource = {
    path: string | number,
    message: string
}[];

export type TGenericErrorRespons = {
    statusCode: string | number,
    message: string,
    errorSources: TErrorSource
}