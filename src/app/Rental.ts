import { Listing } from "./Listing";


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
    price:{
        base: number,
        modifiers:{
            reason: string,
            sign: string,
            quantity: number,
            apply: string
        },
        fidelity: number,
    }
    notes: [{
        note: string,
        simpleHwMan_id: string
    }]
  
    neverShowedUp: boolean;
    unPaid: boolean;
    damagedProduct: boolean;
    
}