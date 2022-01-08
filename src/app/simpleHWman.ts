import { Company } from "./Company";

export interface simpleHWman{
    id?: string;
    username: string;
    name: string;
    surname: string;
    role: string;
    password: string;
    companies: Company[];
    rentals: string[]


}