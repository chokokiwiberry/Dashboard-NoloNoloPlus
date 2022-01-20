import { Product } from "./Product";


export interface Listing{
    _id?: string;
    products: Product[];
    disabled: boolean;
    name: string;
    description: string;
    type: string;
    brand: string;
    company: string;
    createdAt: string,
    updatedAt: string,
    __v: number
}