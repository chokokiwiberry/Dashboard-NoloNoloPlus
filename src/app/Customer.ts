

export interface Customer{
    id?: string;
    avatar: string;
    username: string;
    name: string;
    surname: string;
    password: string;
    rentals: string[];
    notes:[{
        note: string,
        simpleHWman_id: string
    }]
    broken: number;
    late_Pays: number;
    banned: boolean;
    fidelity: number;
  
}