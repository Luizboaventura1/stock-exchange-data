export default async function getAPIData() {
  const URL = "https://brapi.dev/api/quote/list";
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Check if the URL is correct");
    }

    const data = await response.json();

    return data;
  } catch (e) {
    if (e instanceof TypeError && e.message.includes("fetch")) {
      throw new Error("Error in connection or external API URL");
    }
    throw e;
  }
}
