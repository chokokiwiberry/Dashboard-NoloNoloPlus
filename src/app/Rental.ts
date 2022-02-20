import { Listing } from "./Listing";
import { modifiers } from "./Modifiers";
import { notes } from "./Notes";
import { price } from "./Price";


export interface Rental{
    id?: string;
    customer_id: string;
    simpleHWman_id: string;
    products: [{
        listing: string,
        product: number,
    }]
    dateStart: string;
    rejected: boolean;
    dateEnd: string;
    price: price[],
    notes: notes[], 
    neverShowedUp: boolean;
    paid: string;
    paySession: any;
    damagedProduct: boolean;
    fidelityUsed: number;
    companies: string[];
    
}