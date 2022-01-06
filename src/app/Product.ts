export interface Product{
    imgs: string[],
    price: {
        base: number,
        modifiers: {
            reason: string,
            sign: string,
            quantity: number,
            apply: string
        },
        fidelity: number
    }
    condition: string;
    pDisabled: boolean;
    maintaince: string;
}