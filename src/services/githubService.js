// Replace <username> with your GitHub username
const GITHUB_JSON_URL ="https://raw.githubusercontent.com/samanwitaghosh/property-hub-frontend/master/properties.json";

export const fetchProperties = async () => {
  try {
    const res = await fetch(GITHUB_JSON_URL);
    if (!res.ok) throw new Error("Failed to fetch properties");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return []; // Return empty array on error
  }
};