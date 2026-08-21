/**
 * Sends intake lead to the API endpoint (/api/leads)
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
    console.error('Failed to submit lead:', error);
    return { success: false, error: error.message };
  }
};
