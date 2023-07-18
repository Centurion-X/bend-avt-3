/* eslint-disable prettier/prettier */
export interface ITour
{
    date?: string,
    description: string,
    id?: string,
    image: string,
    name: string,
    operator: string,
    price: string,
    type?: string,
    _id?: string
}
export interface ITourClient
{
    description: string,
    image: string,
    name: string,
    operator: string,
    price: string
}