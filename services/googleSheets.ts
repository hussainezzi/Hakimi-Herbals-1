import { OrderData } from '../types';
import { GOOGLE_SHEET_SCRIPT_URL } from '../constants';

export const submitOrderToSheet = async (orderData: OrderData): Promise<boolean> => {
  if ((GOOGLE_SHEET_SCRIPT_URL as string) === "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE") {
    console.warn("Google Sheet Script URL is not configured.");
    return true; // Simulate success if not configured
  }

  try {
    await fetch(GOOGLE_SHEET_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for client-side calls to Google Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    // Since mode is no-cors, we get an opaque response, assume success if no network error
    return true;
  } catch (error) {
    console.error("Failed to save to Google Sheets", error);
    return false;
  }
};