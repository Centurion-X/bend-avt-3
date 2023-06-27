export interface ICustomStatisticUser
{
    city: string,
    company: string,
    id: number,
    name: string,
    phone: string,
    street: string
}

export interface IStatisticUser
{
    address: IStatisticUserAddress,
    company:
    {
        bs: string,
        catchPhrase: string,
        name: string
    },
    email: string,
    id: number,
    name: string,
    phone: string,
    username: string,
    website: string
}

export interface IStatisticUserAddress
{
    city: string,
    geo:
    {
      lat: string,
      lng: string
    },
    street: string,
    suite: string,
    zipcode: string
}