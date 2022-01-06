import { Product } from "./Product";


export interface Listing{
    id?: string;
    products: Product[];
    lDisabled: boolean;
    name: string;
    description: string;
    type: string;
    brand: string;
    company: string;
}