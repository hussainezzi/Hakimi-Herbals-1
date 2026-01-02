import { Product } from './types';

export const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyhUkh643bfOt5u2KfyMF6cyp83sk7Gtkossi7TNCYdBo-P-La7ud4nc7DIxxPrc1OMsw/exec"; // User needs to replace this
export const OWNER_PHONE_NUMBER = "+923333699205"; // Updated to user provided number

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 2,
    name: "Premium Cold Cream",
    price: 300,
    description: "Rich, moisturizing cold cream designed to protect and nourish skin during harsh weather.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398423/82cab0bb-4d3d-4608-a285-22cc8bb3f30c_edprsf.jpg",
    category: "Featured"
  },
  {
    id: 3,
    name: "Herbal Face Powder",
    price: 500,
    description: "Finely ground herbal powder for skin brightening, deep cleansing, and a natural glow.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398422/f1278a57-7b78-4864-82d8-b5d35c584c2a_getbl8.jpg",
    category: "Skin Care"
  },
  {
    id: 5,
    name: "Herbal Hair Tonic",
    price: 700,
    description: "Traditional blend of 21 herbs to stop hair fall and promote lush growth.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398424/208b68c0-10f8-48cf-b91e-a7193653dd49_ky5ezi.jpg",
    category: "Hair Care"
  },
  {
    id: 6,
    name: "Cool Water Body Spray",
    price: 500,
    description: "Pure steam-distilled rose water toner for instant freshness.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398423/08142bdb-6f32-47cf-bbf1-b2ff25fb4e96_mwmiku.jpg",
    category: "Essentials"
  },
  {
    id: 7,
    name: "Strawberry Lip Balm",
    price: 200,
    description: "Hydrating lip care with natural strawberry extracts for soft, protected lips.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1764863340/29f59061-76bf-4a6c-bbff-3f87cdc0fbe3_uqqxxp.jpg",
    category: "Essentials"
  },
  {
    id: 8,
    name: "Rahat Oil",
    price: 400,
    description: "Therapeutic ginger oil and olive oil, excellent for joint pain relief and scalp stimulation.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1765793996/9a78bc7d-3a6d-4235-8dcb-33a50bc0f9dc_wpumok.jpg",
    category: "Oils"
  }
];