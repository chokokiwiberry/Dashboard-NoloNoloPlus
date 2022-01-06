import { Listing } from "./Listing";

export interface Bundle{
    id: string,
    products: Listing[],
    price: {
        base: number,
        modifiers: [{
            reason: string,
            sign: string,
            quantity: number,
            apply: string,
        }]
        fidelity: number
    }
}