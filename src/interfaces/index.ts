import {Partial} from 'lodash'

export interface IUser {
    email: string,
    username: string,
}

export interface ILogin {
    email: string,
    password: string 
}

export interface ISignup {
    username: string,
    email: string,
    password: string 
}

export interface Itoken{
    id:string,
    access: string
}
