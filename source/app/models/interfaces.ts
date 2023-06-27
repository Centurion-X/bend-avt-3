export interface IConfiguration
{
    "hasCard": boolean,
    "prefix": string,
    "protocol": string
}

export interface IMenuType
{
    label: string,
    type: string
}

export interface ISettings
{
    token: boolean
}

export interface ITour
{
    date: string;
    description: string;
    id: string;
    img: string;
    name: string;
    price: string;
    tourOperator: string;
    type: string;
}

export interface ITourLocation
{
    id: string,
    name: string
}

export interface ITourUpcoming extends ITour
{
    locationId: string;
    locationName?: string;
}

export interface ITourTypeSelect
{
    date?: string;
    label?: string;
    value?: string;
}

export interface IUser
{
    card?: string;
    login: string;
    mail?: string;
    password: string;
}