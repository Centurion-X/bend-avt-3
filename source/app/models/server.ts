export interface IAccessToken
{
    access_token: string;
    id: string;
}

export interface IServerError
{
    status: number,
    text: string
}