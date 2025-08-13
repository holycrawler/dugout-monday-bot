import parseHtmlToDom from "./parseHtmlToDom.js";
import { parsePlayerTables } from "./parser/players.js";

const doFetchMyPlayers = async ({ cookie }, param) => {
  console.log(`Fetching players...`);
  const url =
    param === "toyouth"
      ? "https://www.dugout-online.com/players/none/clubid/0"
      : "https://www.dugout-online.com/players/none/view/youth/clubid/0";
  try {
    const response = await fetch(url, {
      headers: {
        Cookie: cookie,
        "User-Agent": "Mozilla/5.0",
      },
    });
    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`);
    }
    const html = await response.text();
    const dom = parseHtmlToDom(html);
    return parsePlayerTables(dom);
  } catch (error) {
    console.error(`GET request failed: ${error.message}`);
    throw error;
  }
};

export default doFetchMyPlayers;
