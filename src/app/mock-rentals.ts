import { Rental } from "./Rental";

export const RENTALS: Rental[] = [
    {
       "id": "1",
       "customer_id": "2",
       "simpleHWman_id": "1",
       "products": [
          {
             "listing": "61e045a8bd8e57666714c413",
             "product": 0
          }
       ],
       "dateStart": "2021-05-02",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2021-06-02",
       "price": [{
         "base": 10,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
    },
    {
       "id": "2",
       "customer_id": "1",
       "simpleHWman_id": "2",
       "products": [
          {
             "listing": "61e0474843bbc2ab0d553633",
             "product": 0
          }
       ],
       "dateStart": "2021-11-05",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2022-05-02",
       "price": [{
         "base": 13,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
    },
    {
       "id": "3",
       "simpleHWman_id": "2",
       "customer_id": "1",
       "products": [
          {
             "listing": "61e048080589f874231c1a85",
             "product": 0
          }
       ],
       "dateStart": "2021-10-01",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2022-08-02",
       "price": [{
         "base": 12,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
    },
    {
       "id": "4",
       "simpleHWman_id": "1",
       "customer_id": "3",
       "products": [
          {
             "listing": "61e048080589f874231c1a85",
             "product": 1
          }
       ],
       "dateStart": "2021-05-02",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2021-09-02",
       "price": [{
         "base": 12,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
    },
    {
       "id": "5",
       "simpleHWman_id": "3",
       "customer_id": "2",
       "products": [
          {
             "listing": "61e048080589f874231c1a85",
             "product": 2
          }
       ],
       "dateStart": "2021-07-02",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2021-09-02",
       "price": [{
         "base": 10,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
    },
    {
       "id": "6",
       "simpleHWman_id": "2",
       "customer_id": "2",
       "products": [
          {
             "listing": "61e048080589f874231c1a85",
             "product": 2
          }
       ],
       "dateStart": "2021-05-02",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2021-08-02",
       "price": [{
         "base": 15,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
    },
    {
       "id": "7",
       "simpleHWman_id": "4",
       "customer_id": "2",
       "products": [
          {
             "listing": "61e1763538ee44ada3c955fb",
             "product": 0
          }
       ],
       "dateStart": "2021-04-02",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2021-05-02",
       "price": [{
         "base": 18,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
    },
    {
       "id": "8",
       "customer_id": "2",
       "simpleHWman_id": "1",
       "products": [
          {
             "listing": "61e1770138ee44ada3c95604",
             "product": 0
          }
       ],
       "dateStart": "2021-01-02",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2021-05-02",
       "price": [{
         "base": 15,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
    },
    {
      "id": "9",
      "customer_id": "2",
      "simpleHWman_id": "1",
       "products": [
          {
             "listing": "61e048080589f874231c1a85",
             "product": 0
          }
       ], 
       "dateStart": "2021-05-02",
       "rejected": false,
       "neverApproved": false,
       "dateEnd": "2021-06-02",
       "price": [{
         "base": 5,
         "fidelity": 20,
         "modifiers": [
             {
                 "reason": "perche si",
                 "sign": "+",
                 "quantity": 1,
                 "apply": "daily",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 10,
                 "apply": "onHoly",
                 "_id": "01"
             },
             {
                 "reason": "perche si",
                 "sign": "-",
                 "quantity": 5,
                 "apply": "onWeekend",
                 "_id": "01"
             },
             {
                 "reason": "totale schifoso",
                 "sign": "+%",
                 "quantity": 50,
                 "apply": "onTotal",
                 "_id": "01"
             }
         ]
       }],
       "notes": [
          {
             "note": "",
             "simpleHwMan_id": "0"
          }
       ],
       "neverShowedUp": false,
       "paid": false,
       "damagedProduct": false
       
    },
    {
    "id": "10",
    "customer_id": "2",
    "simpleHWman_id": "1",
     "products": [
        {
           "listing": "61e048080589f874231c1a85",
           "product": 1
        }
     ], 
     "dateStart": "2021-05-02",
     "rejected": false,
     "neverApproved": false,
     "dateEnd": "2021-06-02",
     "price": [{
      "base": 5,
      "fidelity": 20,
      "modifiers": [
          {
              "reason": "perche si",
              "sign": "+",
              "quantity": 1,
              "apply": "daily",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 10,
              "apply": "onHoly",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 5,
              "apply": "onWeekend",
              "_id": "01"
          },
          {
              "reason": "totale schifoso",
              "sign": "+%",
              "quantity": 50,
              "apply": "onTotal",
              "_id": "01"
          }
      ]
    }],
     "notes": [
        {
           "note": "",
           "simpleHwMan_id": "0"
        }
     ],
     "neverShowedUp": false,
     "paid": false,
     "damagedProduct": false
     
  },
  {"id": "11",
  "customer_id": "2",
  "simpleHWman_id": "1",
   "products": [
      {
         "listing": "61e048080589f874231c1a85",
         "product": 2
      }
   ], 
   "dateStart": "2021-02-02",
   "rejected": false,
   "neverApproved": false,
   "dateEnd": "2021-04-02",
   "price": [{
      "base": 20,
      "fidelity": 20,
      "modifiers": [
          {
              "reason": "perche si",
              "sign": "+",
              "quantity": 1,
              "apply": "daily",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 10,
              "apply": "onHoly",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 5,
              "apply": "onWeekend",
              "_id": "01"
          },
          {
              "reason": "totale schifoso",
              "sign": "+%",
              "quantity": 50,
              "apply": "onTotal",
              "_id": "01"
          }
      ]
    }],
   "notes": [
      {
         "note": "",
         "simpleHwMan_id": "0"
      }
   ],
   "neverShowedUp": false,
   "paid": false,
   "damagedProduct": false
   
},
{
   "id": "12",
  "customer_id": "2",
  "simpleHWman_id": "1",
   "products": [
      {
         "listing": "61f2f56e90c83cffb800bd8d",
         "product": 0
      }
   ], 
   "dateStart": "2021-05-02",
   "rejected": false,
   "neverApproved": false,
   "dateEnd": "2021-09-02",
   "price": [{
      "base": 12,
      "fidelity": 20,
      "modifiers": [
          {
              "reason": "perche si",
              "sign": "+",
              "quantity": 1,
              "apply": "daily",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 10,
              "apply": "onHoly",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 5,
              "apply": "onWeekend",
              "_id": "01"
          },
          {
              "reason": "totale schifoso",
              "sign": "+%",
              "quantity": 50,
              "apply": "onTotal",
              "_id": "01"
          }
      ]
    }],
   "notes": [
      {
         "note": "",
         "simpleHwMan_id": "0"
      }
   ],
   "neverShowedUp": false,
   "paid": false,
   "damagedProduct": false
   
   
},
{
   "id": "13",
  "customer_id": "2",
  "simpleHWman_id": "1",
   "products": [
      {
         "listing": "61f6ffb9a4f1662e206d5c04",
         "product": 0
      }
   ], 
   "dateStart": "2021-03-02",
   "rejected": false,
   "neverApproved": false,
   "dateEnd": "2021-05-02",
   "price": [{
      "base": 10,
      "fidelity": 20,
      "modifiers": [
          {
              "reason": "perche si",
              "sign": "+",
              "quantity": 1,
              "apply": "daily",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 10,
              "apply": "onHoly",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 5,
              "apply": "onWeekend",
              "_id": "01"
          },
          {
              "reason": "totale schifoso",
              "sign": "+%",
              "quantity": 50,
              "apply": "onTotal",
              "_id": "01"
          }
      ]
    }],
   "notes": [
      {
         "note": "",
         "simpleHwMan_id": "0"
      }
   ],
   "neverShowedUp": false,
   "paid": false,
   "damagedProduct": false
   
   
},

{
   "id": "14",
  "customer_id": "2",
  "simpleHWman_id": "1",
   "products": [
      {
         "listing": "61f7000ea4f1662e206d5c0f",
         "product": 0
      }
   ], 
   "dateStart": "2021-10-05",
   "rejected": false,
   "neverApproved": false,
   "dateEnd": "2022-10-03",
   "price": [{
      "base": 15,
      "fidelity": 20,
      "modifiers": [
          {
              "reason": "perche si",
              "sign": "+",
              "quantity": 1,
              "apply": "daily",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 10,
              "apply": "onHoly",
              "_id": "01"
          },
          {
              "reason": "perche si",
              "sign": "-",
              "quantity": 5,
              "apply": "onWeekend",
              "_id": "01"
          },
          {
              "reason": "totale schifoso",
              "sign": "+%",
              "quantity": 50,
              "apply": "onTotal",
              "_id": "01"
          }
      ]
    }],
   "notes": [
      {
         "note": "",
         "simpleHwMan_id": "0"
      }
   ],
   "neverShowedUp": false,
   "paid": false,
   "damagedProduct": false
   
   
},

 ]