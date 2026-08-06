/**
 * Sends intake lead directly to the API endpoint (/api/leads)
 * which appends it into public/contact_leads.xlsx sheet.
 */
export const submitLeadToApi = async (formData) => {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to submit lead to API:', error);
    return { success: false, error: error.message };
  }
};
