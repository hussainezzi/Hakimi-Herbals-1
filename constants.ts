import { Product } from './types';

export const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyhUkh643bfOt5u2KfyMF6cyp83sk7Gtkossi7TNCYdBo-P-La7ud4nc7DIxxPrc1OMsw/exec"; // User needs to replace this
export const OWNER_PHONE_NUMBER = "+923333699250"; // Replace with actual owner number

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cool Water Essence",
    price: 450,
    description: "A refreshing herbal essence that revitalizes the skin and provides a cooling sensation.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398425/76460601-9caa-4318-b791-f7668c33095e_bgxiot.jpg",
    category: "Featured"
  },
  {
    id: 2,
    name: "Premium Cold Cream",
    price: 320,
    description: "Rich, moisturizing cold cream designed to protect and nourish skin during harsh weather.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398423/82cab0bb-4d3d-4608-a285-22cc8bb3f30c_edprsf.jpg",
    category: "Featured"
  },
  {
    id: 3,
    name: "Herbal Hair Oil",
    price: 550,
    description: "Traditional blend of 21 herbs to stop hair fall and promote lush growth.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398422/f1278a57-7b78-4864-82d8-b5d35c584c2a_getbl8.jpg",
    category: "Hair Care"
  },
  {
    id: 4,
    name: "Saffron Face Gel",
    price: 600,
    description: "Brightening gel with pure Kashmiri Saffron for a radiant glow.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398424/b868df97-b7a4-42d2-a981-8c381beca96b_sdphjz.jpg",
    category: "Skin Care"
  },
  {
    id: 5,
    name: "Mint & Tulsi Face Wash",
    price: 250,
    description: "Gentle cleanser that removes impurities without stripping natural oils.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398424/208b68c0-10f8-48cf-b91e-a7193653dd49_ky5ezi.jpg",
    category: "Skin Care"
  },
  {
    id: 6,
    name: "Rose Water Mist",
    price: 180,
    description: "Pure steam-distilled rose water toner for instant freshness.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398423/08142bdb-6f32-47cf-bbf1-b2ff25fb4e96_mwmiku.jpg",
    category: "Essentials"
  },
  {
    id: 7,
    name: "Strawberry Lip Balm",
    price: 150,
    description: "Hydrating lip care with natural strawberry extracts for soft, protected lips.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1764863342/b15d9f4b-1573-4108-947a-c184625bf17e_tqmh11.jpg",
    category: "Essentials"
  },
  {
    id: 8,
    name: "Pure Ginger Oil",
    price: 450,
    description: "Therapeutic ginger oil, excellent for joint pain relief and scalp stimulation.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1764863340/6a8f77c0-3c24-4fc9-a579-6e6bddad69fd_vdkdue.jpg",
    category: "Oils"
  }
];