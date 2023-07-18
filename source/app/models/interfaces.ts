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

export interface IOrder
{
    age?: string | null,
    birthDay: string | null,
    cardNumber: string | null,
    firstName: string,
    lastName: string,
    tourId: string,
    userId: string | null
}

export interface IOrderStatistic
{
    birthYear?: string | null,
    cardNumber?: string | null,
    client: string,
    mail?: string | undefined,
    price: string | undefined,
    tour: string | undefined
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
    _id?: string;
    image: string;
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
    _id?: string;
    login: string;
    mail?: string;
    password: string;
}