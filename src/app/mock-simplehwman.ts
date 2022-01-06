import { simpleHWman } from './simpleHWman'

export const simpleHWmen: simpleHWman[] = [
    {
        id: 1,
        username: 'Superman',
        password: 'Alieno',
        name: 'Clark',
        surname: 'Kent',
        role: 'funzionario',
        companies: [
            {
                id: '1',
                name: 'alpaca',
                password: 'alpaca'
            },
            {
                id: '2',
                name: 'mucca',
                password: 'mucca'
            }],
        rentals: ['1', '3']

    },
    {
        id: 2,
        username: 'Spiderman',
        password: 'Alieno',
        name: 'Peter',
        surname: 'Parker',
        role: 'funzionario',
        companies: [{
            id: '5',
            name: 'Pinco',
            password: 'Pallo'
        },
        {
            id: '6',
            name: 'Blu',
            password: 'Mare'
        }
        ],
        rentals: ['1', '3']


    },
    {
        id: 3,
        username: 'Batman',
        password: 'Alieno',
        name: 'Bruce',
        surname: 'Wayne',
        role: 'funzionario',
        companies: [
            {
                id: '5',
                name: 'fuxia',
                password: 'fuxia'
            }
            ,
            {
                id: '1',
                name: 'alpaca',
                password: 'alpaca'
            }
        ],
        rentals: ['1', '3']

    },
    {
        id: 4,
        username: 'Penguin',
        password: 'Alieno',
        name: 'Pingo',
        surname: 'Polo',
        role: 'funzionario',
        companies: [{
            id: '1',
            name: 'alpaca',
            password: 'alpaca'
        }, {
            id: '2',
            name: 'mucca', 
            password: 'mucca'
        }],
        rentals: ['1', '3']

    }

]

