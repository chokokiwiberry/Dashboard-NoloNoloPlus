import { Listing } from "./Listing";
import { modifiers } from "./Modifiers";

export interface Bundle{
    id: string,
    products: Listing[],
    price: {
        base: number,
        modifiers: modifiers[],
        expiresOn: string,
    }
}