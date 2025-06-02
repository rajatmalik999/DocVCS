export const safeJSONParse = (data, fallback = null) => {
  try {
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback;
  }
}; 