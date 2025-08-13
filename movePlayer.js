import parseHtmlToDom from "./parseHtmlToDom.js";

const movePlayer = async ({ cookie }, playerdata, payload) => {
  const playerId = playerdata.id;
  const playerName = playerdata.name;
  try {
    const response = await fetch(
      `https://www.dugout-online.com/players/details/playerID/${playerId}`,
      {
        method: "POST",
        headers: {
          Cookie: cookie,
          "User-Agent": "Mozilla/5.0",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload,
      }
    );
    const text = await response.text();
    const dom = parseHtmlToDom(text);
    console.log(
      `${playerName} is now on: ${
        !!dom.querySelector("form[name=movetoyouthform]")
          ? "First Team"
          : "Youth Team"
      }`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to move player ${playerId}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Failed to move player ${playerId}: ${error.message}`);
    throw error;
  }
};
export default movePlayer;
