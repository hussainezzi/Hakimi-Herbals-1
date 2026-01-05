
import { OrderData, Product } from '../types';
import { GOOGLE_SHEET_SCRIPT_URL } from '../constants';

/**
 * Submits order data to Google Sheets via Apps Script doPost
 * Uses 'no-cors' mode as Apps Script doesn't return CORS headers for POST easily,
 * but the data will still be recorded.
 */
export const submitOrderToSheet = async (orderData: OrderData): Promise<boolean> => {
  try {
    await fetch(GOOGLE_SHEET_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return true;
  } catch (error) {
    console.error("Failed to save to Google Sheets:", error);
    return false;
  }
};

/**
 * Fetches products from Google Sheets via Apps Script doGet
 */
export const fetchProductsFromSheet = async (): Promise<Product[]> => {
  try {
    // Note: Apps Script URL must be published as "Anyone"
    const response = await fetch(GOOGLE_SHEET_SCRIPT_URL);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    if (!Array.isArray(data)) {
      console.warn("Expected array of products, got:", data);
      return [];
    }

    // Transform/Validate data to match Product interface
    return data.map((item: any) => ({
      id: Number(item.id),
      name: String(item.name),
      price: Number(item.price),
      description: String(item.description),
      image: String(item.image),
      category: String(item.category)
    }));
  } catch (error) {
    console.error("Error fetching products from Apps Script:", error);
    throw error;
  }
};
