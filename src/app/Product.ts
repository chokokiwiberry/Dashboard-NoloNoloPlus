import { modifiers } from "./Modifiers";

export interface Product{
    imgs: string[],
    price: {
        base: number,
        modifiers: modifiers[],
        fidelity: number
    }
    condition: string;
    disabled: boolean;
    maintenance: {
        dateStart: string;
        dateEnd: string
    }
    _id: string
}