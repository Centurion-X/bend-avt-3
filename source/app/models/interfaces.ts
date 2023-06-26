export interface IMenuType
{
    label: string,
    type: string
}

export interface ITour
{
    description: string;
    id: string;
    img: string;
    name: string;
    price: string;
    tourOperator: string;
}

export interface IUser
{
    card?: string;
    login: string;
    mail?: string;
    password: string;
}