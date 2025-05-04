const apiKey = 'AIzaSyCteXoahY6qcc3Fv8X-Jojz561l-9Ren2I';
const fetchUrl = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${apiKey}`;

export const fetchCruxData = async (url:string) => {
  try {
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const result = await response.json();
    return { url, data: result.record || null };
  } catch (err) {
    return { url, data: null, error: true };
  }
};
