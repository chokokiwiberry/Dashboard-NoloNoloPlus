import { Company } from "./Company";

export interface simpleHWman{
    id?: number;
    username: string;
    name: string;
    surname: string;
    role: string;
    password: string;
    companies: Company[];
    rentals: string[]


}