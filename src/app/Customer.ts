import { notes } from "./Notes";


export interface Customer{
    id?: string;
    avatar: string;
    username: string;
    name: string;
    surname: string;
    password: string;
    rentals: string[];
    notes: notes[];
    broken: number;
    late_Pays: number;
    banned: boolean;
    fidelity: number;
  
}