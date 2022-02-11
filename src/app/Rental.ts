import { Listing } from "./Listing";
import { modifiers } from "./Modifiers";


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
    neverApproved: boolean;
    dateEnd: string;
    price:[{
        base: number,
        fidelity: number,
        modifiers:modifiers[],
        
    }],
    notes: [{
        note: string,
        simpleHwMan_id: string
    }]
  
    neverShowedUp: boolean;
    paid: boolean;
    damagedProduct: boolean;
    
}