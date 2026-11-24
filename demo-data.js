// Sample data for demo mode. Edit freely. _ago = days ago, _h = hour of day.
const DEMO_DATA = {
 "restaurant": [
  {
   "id": 1,
   "name": "Demo Restaurant",
   "tagline": "Authentic Cuisine & Pleasant Ambiance",
   "address": "House 12, Road 3, Rangpur",
   "phone": "01700-000000",
   "email": "contact@restaurant.com",
   "hours": "11:00 AM - 11:00 PM (Daily)",
   "wifi_name": "Demo_Dine_Guest",
   "wifi_pass": "guest123",
   "wifi_qr": "",
   "tax_percent": 5,
   "service_charge": 0,
   "currency": "৳",
   "color": "#15803d",
   "allow_orders": true,
   "allow_notes": true,
   "prep_time": "15-20 mins",
   "invoice_footer": "Thank you for dining with us! Please visit again."
  }
 ],
 "tables": [
  {
   "id": 1,
   "number": "1"
  },
  {
   "id": 2,
   "number": "2"
  },
  {
   "id": 3,
   "number": "3"
  },
  {
   "id": 4,
   "number": "4"
  },
  {
   "id": 5,
   "number": "5"
  },
  {
   "id": 6,
   "number": "6"
  },
  {
   "id": 7,
   "number": "7"
  },
  {
   "id": 8,
   "number": "8"
  }
 ],
 "menu_items": [
  {
   "id": 1,
   "name": "Kacchi Biryani",
   "category": "Rice",
   "description": "Mutton, basmati, potato, served with borhani",
   "price": 380,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
   "offer_price": 323,
   "variants": [
    {"name": "Full Plate", "price": 380, "offer_price": 323},
    {"name": "Half Plate", "price": 240, "offer_price": 210}
   ],
   "addons": [
    {"name": "Extra Boiled Egg", "price": 20},
    {"name": "Borhani (250ml)", "price": 50},
    {"name": "Extra Aloo", "price": 25}
   ]
  },
  {
   "id": 2,
   "name": "Beef Tehari",
   "category": "Rice",
   "description": "Mustard oil, green chili, boiled egg",
   "price": 220,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
   "offer_price": null,
   "variants": [
    {"name": "Full Plate", "price": 220},
    {"name": "Half Plate", "price": 140}
   ],
   "addons": [
    {"name": "Extra Boiled Egg", "price": 20},
    {"name": "Borhani (250ml)", "price": 50}
   ]
  },
  {
   "id": 3,
   "name": "Chicken Polao Roast",
   "category": "Rice",
   "description": "Fragrant polao with 2 pc roast",
   "price": 280,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=80",
   "offer_price": null,
   "variants": [
    {"name": "2 pc Roast", "price": 280},
    {"name": "1 pc Roast", "price": 170}
   ],
   "addons": [
    {"name": "Egg Korma", "price": 30},
    {"name": "Borhani (250ml)", "price": 50}
   ]
  },
  {
   "id": 4,
   "name": "Plain Rice",
   "category": "Rice",
   "description": null,
   "price": 40,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 5,
   "name": "Chicken Tikka",
   "category": "Grill",
   "description": "4 pieces, mint chutney",
   "price": 260,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
   "offer_price": 221,
   "variants": [
    {"name": "4 pcs", "price": 260, "offer_price": 221},
    {"name": "2 pcs", "price": 145}
   ],
   "addons": [
    {"name": "Butter Naan", "price": 35},
    {"name": "Mint Chutney", "price": 15}
   ]
  },
  {
   "id": 6,
   "name": "Beef Seekh Kebab",
   "category": "Grill",
   "description": "3 pieces, salad",
   "price": 240,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 7,
   "name": "Butter Naan",
   "category": "Grill",
   "description": null,
   "price": 35,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 8,
   "name": "Beef Bhuna",
   "category": "Curry",
   "description": "Slow cooked, thick gravy",
   "price": 260,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 9,
   "name": "Chicken Rezala",
   "category": "Curry",
   "description": "Creamy white gravy",
   "price": 240,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 10,
   "name": "Daal Fry",
   "category": "Curry",
   "description": "Tempered with garlic",
   "price": 90,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 11,
   "name": "Borhani",
   "category": "Drinks",
   "description": "Spiced yogurt drink",
   "price": 60,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 12,
   "name": "Lassi",
   "category": "Drinks",
   "description": "Sweet or salt",
   "price": 90,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 13,
   "name": "Mint Mojito",
   "category": "Drinks",
   "description": null,
   "price": 120,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
   "offer_price": 102
  },
  {
   "id": 14,
   "name": "Cold Coffee",
   "category": "Drinks",
   "description": null,
   "price": 140,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 15,
   "name": "Water 500ml",
   "category": "Drinks",
   "description": null,
   "price": 20,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 16,
   "name": "Firni",
   "category": "Dessert",
   "description": "Rice pudding",
   "price": 80,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  },
  {
   "id": 17,
   "name": "Rasmalai",
   "category": "Dessert",
   "description": "2 pieces",
   "price": 100,
   "available": true,
   "image_url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
   "offer_price": null
  }
 ],
 "invoices": [
  {
   "id": 1,
   "table_id": 3,
   "table_no": "3",
   "subtotal": 680,
   "discount": 20,
   "tax": 33,
   "total": 693,
   "_ago": 6,
   "_h": 18,
   "coupon": null
  },
  {
   "id": 2,
   "table_id": 2,
   "table_no": "2",
   "subtotal": 900,
   "discount": 50,
   "tax": 42,
   "total": 892,
   "_ago": 6,
   "_h": 12,
   "coupon": null
  },
  {
   "id": 3,
   "table_id": 7,
   "table_no": "7",
   "subtotal": 1535,
   "discount": 50,
   "tax": 74,
   "total": 1559,
   "_ago": 6,
   "_h": 14,
   "coupon": null
  },
  {
   "id": 4,
   "table_id": 2,
   "table_no": "2",
   "subtotal": 970,
   "discount": 20,
   "tax": 48,
   "total": 998,
   "_ago": 6,
   "_h": 20,
   "coupon": null
  },
  {
   "id": 5,
   "table_id": 7,
   "table_no": "7",
   "subtotal": 400,
   "discount": 0,
   "tax": 20,
   "total": 420,
   "_ago": 6,
   "_h": 21,
   "coupon": null
  },
  {
   "id": 6,
   "table_id": 8,
   "table_no": "8",
   "subtotal": 1080,
   "discount": 0,
   "tax": 54,
   "total": 1134,
   "_ago": 5,
   "_h": 19,
   "coupon": null
  },
  {
   "id": 7,
   "table_id": 7,
   "table_no": "7",
   "subtotal": 1130,
   "discount": 0,
   "tax": 56,
   "total": 1186,
   "_ago": 5,
   "_h": 13,
   "coupon": null
  },
  {
   "id": 8,
   "table_id": 5,
   "table_no": "5",
   "subtotal": 240,
   "discount": 20,
   "tax": 11,
   "total": 231,
   "_ago": 5,
   "_h": 17,
   "coupon": null
  },
  {
   "id": 9,
   "table_id": 1,
   "table_no": "1",
   "subtotal": 1400,
   "discount": 20,
   "tax": 69,
   "total": 1449,
   "_ago": 5,
   "_h": 18,
   "coupon": null
  },
  {
   "id": 10,
   "table_id": 8,
   "table_no": "8",
   "subtotal": 1730,
   "discount": 0,
   "tax": 86,
   "total": 1816,
   "_ago": 5,
   "_h": 18,
   "coupon": null
  },
  {
   "id": 11,
   "table_id": 3,
   "table_no": "3",
   "subtotal": 1640,
   "discount": 0,
   "tax": 82,
   "total": 1722,
   "_ago": 4,
   "_h": 14,
   "coupon": null
  },
  {
   "id": 12,
   "table_id": 7,
   "table_no": "7",
   "subtotal": 1960,
   "discount": 20,
   "tax": 97,
   "total": 2037,
   "_ago": 4,
   "_h": 18,
   "coupon": null
  },
  {
   "id": 13,
   "table_id": 7,
   "table_no": "7",
   "subtotal": 595,
   "discount": 0,
   "tax": 30,
   "total": 625,
   "_ago": 4,
   "_h": 13,
   "coupon": null
  },
  {
   "id": 14,
   "table_id": 6,
   "table_no": "6",
   "subtotal": 810,
   "discount": 20,
   "tax": 40,
   "total": 830,
   "_ago": 4,
   "_h": 14,
   "coupon": null
  },
  {
   "id": 15,
   "table_id": 6,
   "table_no": "6",
   "subtotal": 200,
   "discount": 0,
   "tax": 10,
   "total": 210,
   "_ago": 3,
   "_h": 13,
   "coupon": null
  },
  {
   "id": 16,
   "table_id": 3,
   "table_no": "3",
   "subtotal": 1040,
   "discount": 0,
   "tax": 52,
   "total": 1092,
   "_ago": 3,
   "_h": 14,
   "coupon": null
  },
  {
   "id": 17,
   "table_id": 1,
   "table_no": "1",
   "subtotal": 1560,
   "discount": 50,
   "tax": 76,
   "total": 1586,
   "_ago": 3,
   "_h": 20,
   "coupon": null
  },
  {
   "id": 18,
   "table_id": 6,
   "table_no": "6",
   "subtotal": 900,
   "discount": 0,
   "tax": 45,
   "total": 945,
   "_ago": 3,
   "_h": 20,
   "coupon": null
  },
  {
   "id": 19,
   "table_id": 8,
   "table_no": "8",
   "subtotal": 560,
   "discount": 50,
   "tax": 26,
   "total": 536,
   "_ago": 3,
   "_h": 17,
   "coupon": null
  },
  {
   "id": 20,
   "table_id": 6,
   "table_no": "6",
   "subtotal": 340,
   "discount": 0,
   "tax": 17,
   "total": 357,
   "_ago": 2,
   "_h": 15,
   "coupon": null
  },
  {
   "id": 21,
   "table_id": 8,
   "table_no": "8",
   "subtotal": 330,
   "discount": 0,
   "tax": 16,
   "total": 346,
   "_ago": 2,
   "_h": 18,
   "coupon": null
  },
  {
   "id": 22,
   "table_id": 4,
   "table_no": "4",
   "subtotal": 1190,
   "discount": 0,
   "tax": 60,
   "total": 1250,
   "_ago": 2,
   "_h": 14,
   "coupon": null
  },
  {
   "id": 23,
   "table_id": 3,
   "table_no": "3",
   "subtotal": 1130,
   "discount": 0,
   "tax": 56,
   "total": 1186,
   "_ago": 2,
   "_h": 20,
   "coupon": null
  },
  {
   "id": 24,
   "table_id": 3,
   "table_no": "3",
   "subtotal": 615,
   "discount": 0,
   "tax": 31,
   "total": 646,
   "_ago": 2,
   "_h": 16,
   "coupon": null
  },
  {
   "id": 25,
   "table_id": 4,
   "table_no": "4",
   "subtotal": 2210,
   "discount": 50,
   "tax": 108,
   "total": 2268,
   "_ago": 2,
   "_h": 18,
   "coupon": null
  },
  {
   "id": 26,
   "table_id": 3,
   "table_no": "3",
   "subtotal": 740,
   "discount": 20,
   "tax": 36,
   "total": 756,
   "_ago": 1,
   "_h": 21,
   "coupon": null
  },
  {
   "id": 27,
   "table_id": 2,
   "table_no": "2",
   "subtotal": 480,
   "discount": 0,
   "tax": 24,
   "total": 504,
   "_ago": 1,
   "_h": 16,
   "coupon": null
  },
  {
   "id": 28,
   "table_id": 1,
   "table_no": "1",
   "subtotal": 3480,
   "discount": 0,
   "tax": 174,
   "total": 3654,
   "_ago": 1,
   "_h": 16,
   "coupon": null
  },
  {
   "id": 29,
   "table_id": 8,
   "table_no": "8",
   "subtotal": 920,
   "discount": 0,
   "tax": 46,
   "total": 966,
   "_ago": 1,
   "_h": 18,
   "coupon": null
  },
  {
   "id": 30,
   "table_id": 8,
   "table_no": "8",
   "subtotal": 655,
   "discount": 0,
   "tax": 33,
   "total": 688,
   "_ago": 0,
   "_h": 9,
   "coupon": null
  },
  {
   "id": 31,
   "table_id": 5,
   "table_no": "5",
   "subtotal": 200,
   "discount": 0,
   "tax": 10,
   "total": 210,
   "_ago": 0,
   "_h": 9,
   "coupon": null
  },
  {
   "id": 32,
   "table_id": 7,
   "table_no": "7",
   "subtotal": 785,
   "discount": 0,
   "tax": 39,
   "total": 824,
   "_ago": 0,
   "_h": 10,
   "coupon": null
  }
 ],
 "orders": [
  {
   "id": "128b2f33-0c5c-4fd0-a6a3-a4506513270e",
   "no": 1,
   "table_id": 3,
   "status": "paid",
   "total": 680,
   "note": null,
   "invoice_id": 1,
   "_ago": 6,
   "_h": 18
  },
  {
   "id": "6cad4a26-8d11-4ece-9738-f7d93d9c1724",
   "no": 2,
   "table_id": 2,
   "status": "paid",
   "total": 900,
   "note": null,
   "invoice_id": 2,
   "_ago": 6,
   "_h": 12
  },
  {
   "id": "0becd7b0-3898-4190-b9eb-dacc0cb1e29c",
   "no": 3,
   "table_id": 7,
   "status": "paid",
   "total": 1535,
   "note": null,
   "invoice_id": 3,
   "_ago": 6,
   "_h": 14
  },
  {
   "id": "301850c5-a38f-4547-923a-736994e3bf91",
   "no": 4,
   "table_id": 2,
   "status": "paid",
   "total": 970,
   "note": null,
   "invoice_id": 4,
   "_ago": 6,
   "_h": 20
  },
  {
   "id": "95e761d1-7731-4f10-906b-f2efc6f87718",
   "no": 5,
   "table_id": 7,
   "status": "paid",
   "total": 400,
   "note": null,
   "invoice_id": 5,
   "_ago": 6,
   "_h": 21
  },
  {
   "id": "72e6cc3a-babc-4d20-97ee-05cde00902c7",
   "no": 6,
   "table_id": 8,
   "status": "paid",
   "total": 1080,
   "note": null,
   "invoice_id": 6,
   "_ago": 5,
   "_h": 19
  },
  {
   "id": "13deef86-ab10-41d0-b646-e1f40a097c97",
   "no": 7,
   "table_id": 7,
   "status": "paid",
   "total": 1130,
   "note": null,
   "invoice_id": 7,
   "_ago": 5,
   "_h": 13
  },
  {
   "id": "10a3d6b2-aa05-411a-b271-5945795e8229",
   "no": 8,
   "table_id": 5,
   "status": "paid",
   "total": 240,
   "note": null,
   "invoice_id": 8,
   "_ago": 5,
   "_h": 17
  },
  {
   "id": "2b0537e6-5aff-4229-b631-a992f0ce5835",
   "no": 9,
   "table_id": 1,
   "status": "paid",
   "total": 1400,
   "note": null,
   "invoice_id": 9,
   "_ago": 5,
   "_h": 18
  },
  {
   "id": "66d22876-72fd-4202-aa96-fb1a14a0f9e7",
   "no": 10,
   "table_id": 8,
   "status": "paid",
   "total": 1730,
   "note": null,
   "invoice_id": 10,
   "_ago": 5,
   "_h": 18
  },
  {
   "id": "3b618676-26bb-4dbd-ad1c-9af0153e7c2a",
   "no": 11,
   "table_id": 3,
   "status": "paid",
   "total": 1640,
   "note": null,
   "invoice_id": 11,
   "_ago": 4,
   "_h": 14
  },
  {
   "id": "90fbbd11-9c1c-4af7-9e87-66ed88daf401",
   "no": 12,
   "table_id": 7,
   "status": "paid",
   "total": 1960,
   "note": null,
   "invoice_id": 12,
   "_ago": 4,
   "_h": 18
  },
  {
   "id": "66836886-a260-4d0b-bb45-145c1a81682c",
   "no": 13,
   "table_id": 7,
   "status": "paid",
   "total": 595,
   "note": null,
   "invoice_id": 13,
   "_ago": 4,
   "_h": 13
  },
  {
   "id": "000f49c8-1a35-4ca0-8d75-985d99c94309",
   "no": 14,
   "table_id": 6,
   "status": "paid",
   "total": 810,
   "note": null,
   "invoice_id": 14,
   "_ago": 4,
   "_h": 14
  },
  {
   "id": "1f7296ab-7961-4d92-9d39-d0a89a2ef80f",
   "no": 15,
   "table_id": 6,
   "status": "paid",
   "total": 200,
   "note": null,
   "invoice_id": 15,
   "_ago": 3,
   "_h": 13
  },
  {
   "id": "bd87a865-57b6-4b7e-bfea-a1551a28f7b3",
   "no": 16,
   "table_id": 3,
   "status": "paid",
   "total": 1040,
   "note": null,
   "invoice_id": 16,
   "_ago": 3,
   "_h": 14
  },
  {
   "id": "fa7f0eab-4c4f-4b06-8732-2e25c215a82a",
   "no": 17,
   "table_id": 1,
   "status": "paid",
   "total": 1560,
   "note": null,
   "invoice_id": 17,
   "_ago": 3,
   "_h": 20
  },
  {
   "id": "cfbf3360-9cfc-4652-b919-4242a2eddbbd",
   "no": 18,
   "table_id": 6,
   "status": "paid",
   "total": 900,
   "note": null,
   "invoice_id": 18,
   "_ago": 3,
   "_h": 20
  },
  {
   "id": "fd56a926-076b-4e36-bb23-13f55b06258e",
   "no": 19,
   "table_id": 8,
   "status": "paid",
   "total": 560,
   "note": null,
   "invoice_id": 19,
   "_ago": 3,
   "_h": 17
  },
  {
   "id": "149e259b-5d58-4705-b979-d04af47aebdd",
   "no": 20,
   "table_id": 6,
   "status": "paid",
   "total": 340,
   "note": null,
   "invoice_id": 20,
   "_ago": 2,
   "_h": 15
  },
  {
   "id": "9c3a23cd-e67a-4b75-bc39-47249fc2d0a1",
   "no": 21,
   "table_id": 8,
   "status": "paid",
   "total": 330,
   "note": null,
   "invoice_id": 21,
   "_ago": 2,
   "_h": 18
  },
  {
   "id": "6f15b6ad-2db3-497f-a396-39be7a605a91",
   "no": 22,
   "table_id": 4,
   "status": "paid",
   "total": 1190,
   "note": null,
   "invoice_id": 22,
   "_ago": 2,
   "_h": 14
  },
  {
   "id": "26b1cffc-070d-4109-a085-9634fe3c9c8f",
   "no": 23,
   "table_id": 3,
   "status": "paid",
   "total": 1130,
   "note": null,
   "invoice_id": 23,
   "_ago": 2,
   "_h": 20
  },
  {
   "id": "f88c422b-cca2-492b-83a5-6cc1057a40b2",
   "no": 24,
   "table_id": 3,
   "status": "paid",
   "total": 615,
   "note": null,
   "invoice_id": 24,
   "_ago": 2,
   "_h": 16
  },
  {
   "id": "4265bb31-5374-4902-9620-bf0dc38084a0",
   "no": 25,
   "table_id": 4,
   "status": "paid",
   "total": 2210,
   "note": null,
   "invoice_id": 25,
   "_ago": 2,
   "_h": 18
  },
  {
   "id": "df703017-04c9-478d-82b3-359986048719",
   "no": 26,
   "table_id": 3,
   "status": "paid",
   "total": 740,
   "note": null,
   "invoice_id": 26,
   "_ago": 1,
   "_h": 21
  },
  {
   "id": "aead44b0-5373-40e5-8fcf-31ca8e752fdf",
   "no": 27,
   "table_id": 2,
   "status": "paid",
   "total": 480,
   "note": null,
   "invoice_id": 27,
   "_ago": 1,
   "_h": 16
  },
  {
   "id": "73c1cd2c-81f9-4b52-9905-d591c5b2e75a",
   "no": 28,
   "table_id": 1,
   "status": "paid",
   "total": 3480,
   "note": null,
   "invoice_id": 28,
   "_ago": 1,
   "_h": 16
  },
  {
   "id": "7a609683-ceaf-4915-8885-64e88216858f",
   "no": 29,
   "table_id": 8,
   "status": "paid",
   "total": 920,
   "note": null,
   "invoice_id": 29,
   "_ago": 1,
   "_h": 18
  },
  {
   "id": "3d9a8079-abd0-47fb-9292-618550e40d54",
   "no": 30,
   "table_id": 8,
   "status": "paid",
   "total": 655,
   "note": null,
   "invoice_id": 30,
   "_ago": 0,
   "_h": 9
  },
  {
   "id": "77bd891f-f7b1-43df-a323-1e1ee2015522",
   "no": 31,
   "table_id": 5,
   "status": "paid",
   "total": 200,
   "note": null,
   "invoice_id": 31,
   "_ago": 0,
   "_h": 9
  },
  {
   "id": "56d050cd-6760-4367-83fe-b17bfe7b8ae4",
   "no": 32,
   "table_id": 7,
   "status": "paid",
   "total": 785,
   "note": null,
   "invoice_id": 32,
   "_ago": 0,
   "_h": 10
  }
 ],
 "order_items": [
  {
   "id": 1,
   "order_id": "128b2f33-0c5c-4fd0-a6a3-a4506513270e",
   "name": "Plain Rice",
   "price": 40,
   "qty": 3
  },
  {
   "id": 2,
   "order_id": "128b2f33-0c5c-4fd0-a6a3-a4506513270e",
   "name": "Lassi",
   "price": 90,
   "qty": 1
  },
  {
   "id": 3,
   "order_id": "128b2f33-0c5c-4fd0-a6a3-a4506513270e",
   "name": "Daal Fry",
   "price": 90,
   "qty": 1
  },
  {
   "id": 4,
   "order_id": "128b2f33-0c5c-4fd0-a6a3-a4506513270e",
   "name": "Kacchi Biryani",
   "price": 380,
   "qty": 1
  },
  {
   "id": 5,
   "order_id": "6cad4a26-8d11-4ece-9738-f7d93d9c1724",
   "name": "Plain Rice",
   "price": 40,
   "qty": 3
  },
  {
   "id": 6,
   "order_id": "6cad4a26-8d11-4ece-9738-f7d93d9c1724",
   "name": "Beef Bhuna",
   "price": 260,
   "qty": 3
  },
  {
   "id": 7,
   "order_id": "0becd7b0-3898-4190-b9eb-dacc0cb1e29c",
   "name": "Chicken Tikka",
   "price": 260,
   "qty": 3
  },
  {
   "id": 8,
   "order_id": "0becd7b0-3898-4190-b9eb-dacc0cb1e29c",
   "name": "Daal Fry",
   "price": 90,
   "qty": 1
  },
  {
   "id": 9,
   "order_id": "0becd7b0-3898-4190-b9eb-dacc0cb1e29c",
   "name": "Butter Naan",
   "price": 35,
   "qty": 3
  },
  {
   "id": 10,
   "order_id": "0becd7b0-3898-4190-b9eb-dacc0cb1e29c",
   "name": "Chicken Polao Roast",
   "price": 280,
   "qty": 2
  },
  {
   "id": 11,
   "order_id": "301850c5-a38f-4547-923a-736994e3bf91",
   "name": "Plain Rice",
   "price": 40,
   "qty": 1
  },
  {
   "id": 12,
   "order_id": "301850c5-a38f-4547-923a-736994e3bf91",
   "name": "Chicken Polao Roast",
   "price": 280,
   "qty": 3
  },
  {
   "id": 13,
   "order_id": "301850c5-a38f-4547-923a-736994e3bf91",
   "name": "Daal Fry",
   "price": 90,
   "qty": 1
  },
  {
   "id": 14,
   "order_id": "95e761d1-7731-4f10-906b-f2efc6f87718",
   "name": "Lassi",
   "price": 90,
   "qty": 1
  },
  {
   "id": 15,
   "order_id": "95e761d1-7731-4f10-906b-f2efc6f87718",
   "name": "Daal Fry",
   "price": 90,
   "qty": 3
  },
  {
   "id": 16,
   "order_id": "95e761d1-7731-4f10-906b-f2efc6f87718",
   "name": "Plain Rice",
   "price": 40,
   "qty": 1
  },
  {
   "id": 17,
   "order_id": "72e6cc3a-babc-4d20-97ee-05cde00902c7",
   "name": "Chicken Polao Roast",
   "price": 280,
   "qty": 2
  },
  {
   "id": 18,
   "order_id": "72e6cc3a-babc-4d20-97ee-05cde00902c7",
   "name": "Plain Rice",
   "price": 40,
   "qty": 1
  },
  {
   "id": 19,
   "order_id": "72e6cc3a-babc-4d20-97ee-05cde00902c7",
   "name": "Chicken Rezala",
   "price": 240,
   "qty": 2
  },
  {
   "id": 20,
   "order_id": "13deef86-ab10-41d0-b646-e1f40a097c97",
   "name": "Borhani",
   "price": 60,
   "qty": 3
  },
  {
   "id": 21,
   "order_id": "13deef86-ab10-41d0-b646-e1f40a097c97",
   "name": "Rasmalai",
   "price": 100,
   "qty": 2
  },
  {
   "id": 22,
   "order_id": "13deef86-ab10-41d0-b646-e1f40a097c97",
   "name": "Lassi",
   "price": 90,
   "qty": 3
  },
  {
   "id": 23,
   "order_id": "13deef86-ab10-41d0-b646-e1f40a097c97",
   "name": "Beef Seekh Kebab",
   "price": 240,
   "qty": 2
  },
  {
   "id": 24,
   "order_id": "10a3d6b2-aa05-411a-b271-5945795e8229",
   "name": "Daal Fry",
   "price": 90,
   "qty": 2
  },
  {
   "id": 25,
   "order_id": "10a3d6b2-aa05-411a-b271-5945795e8229",
   "name": "Water 500ml",
   "price": 20,
   "qty": 3
  },
  {
   "id": 26,
   "order_id": "2b0537e6-5aff-4229-b631-a992f0ce5835",
   "name": "Plain Rice",
   "price": 40,
   "qty": 2
  },
  {
   "id": 27,
   "order_id": "2b0537e6-5aff-4229-b631-a992f0ce5835",
   "name": "Firni",
   "price": 80,
   "qty": 1
  },
  {
   "id": 28,
   "order_id": "2b0537e6-5aff-4229-b631-a992f0ce5835",
   "name": "Kacchi Biryani",
   "price": 380,
   "qty": 3
  },
  {
   "id": 29,
   "order_id": "2b0537e6-5aff-4229-b631-a992f0ce5835",
   "name": "Rasmalai",
   "price": 100,
   "qty": 1
  },
  {
   "id": 30,
   "order_id": "66d22876-72fd-4202-aa96-fb1a14a0f9e7",
   "name": "Chicken Rezala",
   "price": 240,
   "qty": 3
  },
  {
   "id": 31,
   "order_id": "66d22876-72fd-4202-aa96-fb1a14a0f9e7",
   "name": "Chicken Tikka",
   "price": 260,
   "qty": 2
  },
  {
   "id": 32,
   "order_id": "66d22876-72fd-4202-aa96-fb1a14a0f9e7",
   "name": "Cold Coffee",
   "price": 140,
   "qty": 3
  },
  {
   "id": 33,
   "order_id": "66d22876-72fd-4202-aa96-fb1a14a0f9e7",
   "name": "Butter Naan",
   "price": 35,
   "qty": 2
  },
  {
   "id": 34,
   "order_id": "3b618676-26bb-4dbd-ad1c-9af0153e7c2a",
   "name": "Beef Bhuna",
   "price": 260,
   "qty": 3
  },
  {
   "id": 35,
   "order_id": "3b618676-26bb-4dbd-ad1c-9af0153e7c2a",
   "name": "Kacchi Biryani",
   "price": 380,
   "qty": 1
  },
  {
   "id": 36,
   "order_id": "3b618676-26bb-4dbd-ad1c-9af0153e7c2a",
   "name": "Rasmalai",
   "price": 100,
   "qty": 2
  },
  {
   "id": 37,
   "order_id": "3b618676-26bb-4dbd-ad1c-9af0153e7c2a",
   "name": "Cold Coffee",
   "price": 140,
   "qty": 2
  },
  {
   "id": 38,
   "order_id": "90fbbd11-9c1c-4af7-9e87-66ed88daf401",
   "name": "Chicken Tikka",
   "price": 260,
   "qty": 3
  },
  {
   "id": 39,
   "order_id": "90fbbd11-9c1c-4af7-9e87-66ed88daf401",
   "name": "Beef Tehari",
   "price": 220,
   "qty": 3
  },
  {
   "id": 40,
   "order_id": "90fbbd11-9c1c-4af7-9e87-66ed88daf401",
   "name": "Beef Bhuna",
   "price": 260,
   "qty": 2
  },
  {
   "id": 41,
   "order_id": "66836886-a260-4d0b-bb45-145c1a81682c",
   "name": "Butter Naan",
   "price": 35,
   "qty": 1
  },
  {
   "id": 42,
   "order_id": "66836886-a260-4d0b-bb45-145c1a81682c",
   "name": "Chicken Polao Roast",
   "price": 280,
   "qty": 2
  },
  {
   "id": 43,
   "order_id": "000f49c8-1a35-4ca0-8d75-985d99c94309",
   "name": "Chicken Tikka",
   "price": 260,
   "qty": 1
  },
  {
   "id": 44,
   "order_id": "000f49c8-1a35-4ca0-8d75-985d99c94309",
   "name": "Plain Rice",
   "price": 40,
   "qty": 1
  },
  {
   "id": 45,
   "order_id": "000f49c8-1a35-4ca0-8d75-985d99c94309",
   "name": "Beef Seekh Kebab",
   "price": 240,
   "qty": 1
  },
  {
   "id": 46,
   "order_id": "000f49c8-1a35-4ca0-8d75-985d99c94309",
   "name": "Daal Fry",
   "price": 90,
   "qty": 3
  },
  {
   "id": 47,
   "order_id": "1f7296ab-7961-4d92-9d39-d0a89a2ef80f",
   "name": "Firni",
   "price": 80,
   "qty": 2
  },
  {
   "id": 48,
   "order_id": "1f7296ab-7961-4d92-9d39-d0a89a2ef80f",
   "name": "Water 500ml",
   "price": 20,
   "qty": 2
  },
  {
   "id": 49,
   "order_id": "bd87a865-57b6-4b7e-bfea-a1551a28f7b3",
   "name": "Firni",
   "price": 80,
   "qty": 1
  },
  {
   "id": 50,
   "order_id": "bd87a865-57b6-4b7e-bfea-a1551a28f7b3",
   "name": "Beef Seekh Kebab",
   "price": 240,
   "qty": 1
  },
  {
   "id": 51,
   "order_id": "bd87a865-57b6-4b7e-bfea-a1551a28f7b3",
   "name": "Chicken Rezala",
   "price": 240,
   "qty": 3
  },
  {
   "id": 52,
   "order_id": "fa7f0eab-4c4f-4b06-8732-2e25c215a82a",
   "name": "Chicken Polao Roast",
   "price": 280,
   "qty": 1
  },
  {
   "id": 53,
   "order_id": "fa7f0eab-4c4f-4b06-8732-2e25c215a82a",
   "name": "Chicken Rezala",
   "price": 240,
   "qty": 2
  },
  {
   "id": 54,
   "order_id": "fa7f0eab-4c4f-4b06-8732-2e25c215a82a",
   "name": "Firni",
   "price": 80,
   "qty": 1
  },
  {
   "id": 55,
   "order_id": "fa7f0eab-4c4f-4b06-8732-2e25c215a82a",
   "name": "Beef Seekh Kebab",
   "price": 240,
   "qty": 3
  },
  {
   "id": 56,
   "order_id": "cfbf3360-9cfc-4652-b919-4242a2eddbbd",
   "name": "Beef Bhuna",
   "price": 260,
   "qty": 3
  },
  {
   "id": 57,
   "order_id": "cfbf3360-9cfc-4652-b919-4242a2eddbbd",
   "name": "Mint Mojito",
   "price": 120,
   "qty": 1
  },
  {
   "id": 58,
   "order_id": "fd56a926-076b-4e36-bb23-13f55b06258e",
   "name": "Chicken Rezala",
   "price": 240,
   "qty": 2
  },
  {
   "id": 59,
   "order_id": "fd56a926-076b-4e36-bb23-13f55b06258e",
   "name": "Firni",
   "price": 80,
   "qty": 1
  },
  {
   "id": 60,
   "order_id": "149e259b-5d58-4705-b979-d04af47aebdd",
   "name": "Plain Rice",
   "price": 40,
   "qty": 2
  },
  {
   "id": 61,
   "order_id": "149e259b-5d58-4705-b979-d04af47aebdd",
   "name": "Beef Bhuna",
   "price": 260,
   "qty": 1
  },
  {
   "id": 62,
   "order_id": "9c3a23cd-e67a-4b75-bc39-47249fc2d0a1",
   "name": "Firni",
   "price": 80,
   "qty": 3
  },
  {
   "id": 63,
   "order_id": "9c3a23cd-e67a-4b75-bc39-47249fc2d0a1",
   "name": "Lassi",
   "price": 90,
   "qty": 1
  },
  {
   "id": 64,
   "order_id": "6f15b6ad-2db3-497f-a396-39be7a605a91",
   "name": "Borhani",
   "price": 60,
   "qty": 2
  },
  {
   "id": 65,
   "order_id": "6f15b6ad-2db3-497f-a396-39be7a605a91",
   "name": "Chicken Polao Roast",
   "price": 280,
   "qty": 2
  },
  {
   "id": 66,
   "order_id": "6f15b6ad-2db3-497f-a396-39be7a605a91",
   "name": "Mint Mojito",
   "price": 120,
   "qty": 2
  },
  {
   "id": 67,
   "order_id": "6f15b6ad-2db3-497f-a396-39be7a605a91",
   "name": "Lassi",
   "price": 90,
   "qty": 3
  },
  {
   "id": 68,
   "order_id": "26b1cffc-070d-4109-a085-9634fe3c9c8f",
   "name": "Water 500ml",
   "price": 20,
   "qty": 3
  },
  {
   "id": 69,
   "order_id": "26b1cffc-070d-4109-a085-9634fe3c9c8f",
   "name": "Chicken Tikka",
   "price": 260,
   "qty": 2
  },
  {
   "id": 70,
   "order_id": "26b1cffc-070d-4109-a085-9634fe3c9c8f",
   "name": "Daal Fry",
   "price": 90,
   "qty": 3
  },
  {
   "id": 71,
   "order_id": "26b1cffc-070d-4109-a085-9634fe3c9c8f",
   "name": "Cold Coffee",
   "price": 140,
   "qty": 2
  },
  {
   "id": 72,
   "order_id": "f88c422b-cca2-492b-83a5-6cc1057a40b2",
   "name": "Plain Rice",
   "price": 40,
   "qty": 1
  },
  {
   "id": 73,
   "order_id": "f88c422b-cca2-492b-83a5-6cc1057a40b2",
   "name": "Chicken Tikka",
   "price": 260,
   "qty": 1
  },
  {
   "id": 74,
   "order_id": "f88c422b-cca2-492b-83a5-6cc1057a40b2",
   "name": "Butter Naan",
   "price": 35,
   "qty": 1
  },
  {
   "id": 75,
   "order_id": "f88c422b-cca2-492b-83a5-6cc1057a40b2",
   "name": "Cold Coffee",
   "price": 140,
   "qty": 2
  },
  {
   "id": 76,
   "order_id": "4265bb31-5374-4902-9620-bf0dc38084a0",
   "name": "Cold Coffee",
   "price": 140,
   "qty": 2
  },
  {
   "id": 77,
   "order_id": "4265bb31-5374-4902-9620-bf0dc38084a0",
   "name": "Chicken Tikka",
   "price": 260,
   "qty": 2
  },
  {
   "id": 78,
   "order_id": "4265bb31-5374-4902-9620-bf0dc38084a0",
   "name": "Kacchi Biryani",
   "price": 380,
   "qty": 3
  },
  {
   "id": 79,
   "order_id": "4265bb31-5374-4902-9620-bf0dc38084a0",
   "name": "Lassi",
   "price": 90,
   "qty": 3
  },
  {
   "id": 80,
   "order_id": "df703017-04c9-478d-82b3-359986048719",
   "name": "Beef Seekh Kebab",
   "price": 240,
   "qty": 1
  },
  {
   "id": 81,
   "order_id": "df703017-04c9-478d-82b3-359986048719",
   "name": "Kacchi Biryani",
   "price": 380,
   "qty": 1
  },
  {
   "id": 82,
   "order_id": "df703017-04c9-478d-82b3-359986048719",
   "name": "Mint Mojito",
   "price": 120,
   "qty": 1
  },
  {
   "id": 83,
   "order_id": "aead44b0-5373-40e5-8fcf-31ca8e752fdf",
   "name": "Rasmalai",
   "price": 100,
   "qty": 1
  },
  {
   "id": 84,
   "order_id": "aead44b0-5373-40e5-8fcf-31ca8e752fdf",
   "name": "Firni",
   "price": 80,
   "qty": 3
  },
  {
   "id": 85,
   "order_id": "aead44b0-5373-40e5-8fcf-31ca8e752fdf",
   "name": "Mint Mojito",
   "price": 120,
   "qty": 1
  },
  {
   "id": 86,
   "order_id": "aead44b0-5373-40e5-8fcf-31ca8e752fdf",
   "name": "Water 500ml",
   "price": 20,
   "qty": 1
  },
  {
   "id": 87,
   "order_id": "73c1cd2c-81f9-4b52-9905-d591c5b2e75a",
   "name": "Kacchi Biryani",
   "price": 380,
   "qty": 3
  },
  {
   "id": 88,
   "order_id": "73c1cd2c-81f9-4b52-9905-d591c5b2e75a",
   "name": "Chicken Polao Roast",
   "price": 280,
   "qty": 3
  },
  {
   "id": 89,
   "order_id": "73c1cd2c-81f9-4b52-9905-d591c5b2e75a",
   "name": "Beef Bhuna",
   "price": 260,
   "qty": 3
  },
  {
   "id": 90,
   "order_id": "73c1cd2c-81f9-4b52-9905-d591c5b2e75a",
   "name": "Beef Seekh Kebab",
   "price": 240,
   "qty": 3
  },
  {
   "id": 91,
   "order_id": "7a609683-ceaf-4915-8885-64e88216858f",
   "name": "Beef Bhuna",
   "price": 260,
   "qty": 1
  },
  {
   "id": 92,
   "order_id": "7a609683-ceaf-4915-8885-64e88216858f",
   "name": "Chicken Rezala",
   "price": 240,
   "qty": 2
  },
  {
   "id": 93,
   "order_id": "7a609683-ceaf-4915-8885-64e88216858f",
   "name": "Water 500ml",
   "price": 20,
   "qty": 1
  },
  {
   "id": 94,
   "order_id": "7a609683-ceaf-4915-8885-64e88216858f",
   "name": "Firni",
   "price": 80,
   "qty": 2
  },
  {
   "id": 95,
   "order_id": "3d9a8079-abd0-47fb-9292-618550e40d54",
   "name": "Chicken Polao Roast",
   "price": 280,
   "qty": 2
  },
  {
   "id": 96,
   "order_id": "3d9a8079-abd0-47fb-9292-618550e40d54",
   "name": "Butter Naan",
   "price": 35,
   "qty": 1
  },
  {
   "id": 97,
   "order_id": "3d9a8079-abd0-47fb-9292-618550e40d54",
   "name": "Borhani",
   "price": 60,
   "qty": 1
  },
  {
   "id": 98,
   "order_id": "77bd891f-f7b1-43df-a323-1e1ee2015522",
   "name": "Plain Rice",
   "price": 40,
   "qty": 2
  },
  {
   "id": 99,
   "order_id": "77bd891f-f7b1-43df-a323-1e1ee2015522",
   "name": "Mint Mojito",
   "price": 120,
   "qty": 1
  },
  {
   "id": 100,
   "order_id": "56d050cd-6760-4367-83fe-b17bfe7b8ae4",
   "name": "Butter Naan",
   "price": 35,
   "qty": 1
  },
  {
   "id": 101,
   "order_id": "56d050cd-6760-4367-83fe-b17bfe7b8ae4",
   "name": "Lassi",
   "price": 90,
   "qty": 3
  },
  {
   "id": 102,
   "order_id": "56d050cd-6760-4367-83fe-b17bfe7b8ae4",
   "name": "Beef Seekh Kebab",
   "price": 240,
   "qty": 2
  }
 ],
 "coupons": [
  {
   "id": 1,
   "code": "WELCOME10",
   "type": "percent",
   "value": 10,
   "min_order": 0,
   "active": true
  },
  {
   "id": 2,
   "code": "FLAT50",
   "type": "flat",
   "value": 50,
   "min_order": 300,
   "active": true
  },
  {
   "id": 3,
   "code": "EID20",
   "type": "percent",
   "value": 20,
   "min_order": 500,
   "active": false
  }
 ],
 "waiter_calls": []
};
