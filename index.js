// ----------------------------------------------------------------------------------
// NOTE: GitHub automatically disables scheduled workflows after 60 days of inactivity
// (no commits, issues, PRs, etc. in the repository).
// To keep this workflow active, ensure the repo has some activity at least once
// every 60 days — for example, make a small commit or merge a PR.
// ----------------------------------------------------------------------------------
// number of players on squad to avoid brawls
const MAX_PLAYERS_ON_SQUAD_TO_AVOID_BRAWLS = 38;
// ----------------------------------------------------------------------------------
//

import doFetchMyPlayers from "./fetchMyPlayers.js";
import movePlayer from "./movePlayer.js";
import doLogin from "./login.js";
import "dotenv/config";
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
const param = process.argv[2];
const payload = param === "toyouth" ? "movetoyouth=1" : "moveto1st=1";
//////////////////////////////////////////////////////////////
const credentials = JSON.parse(process.env.CREDENTIALS);
const loginDom = await doLogin(credentials);
const myPlayers = await doFetchMyPlayers(credentials, param);
const numberOfPlayers = myPlayers.length;
const youthPlayers = myPlayers.filter((player) => player.age <= 18);
const numberOfYouthPlayers = youthPlayers.length;
//////////////////////////////////////////////////////////////
// we checke if we re moving players to youth team
// if so we move just enough players to meet the 38 maximum
// otherwise we move all players to first team
const NUMBER_OF_PLAYERS_TO_MOVE =
  param === "toyouth"
    ? numberOfPlayers - MAX_PLAYERS_ON_SQUAD_TO_AVOID_BRAWLS
    : numberOfPlayers;
//////////////////////////////////////////////////////////////
// handles case when there are not enough youth players to move to meet the 38 maximum
if (param === "toyouth" && numberOfYouthPlayers < NUMBER_OF_PLAYERS_TO_MOVE) {
  console.error(
    `Not enough youth players to move. Found ${numberOfYouthPlayers} youths, but need ${NUMBER_OF_PLAYERS_TO_MOVE} to meet the 38 maximum.`
  );
  process.exit(1);
}
// handles case when there are no players to move (team is already below 38 players)
if (NUMBER_OF_PLAYERS_TO_MOVE <= 0) {
  console.error(
    `No players to move. Number of players to move is ${NUMBER_OF_PLAYERS_TO_MOVE}.`
  );
  process.exit(1);
}
//////////////////////////////////////////////////////////////
for (let i = 0; i < NUMBER_OF_PLAYERS_TO_MOVE; i++) {
  const player = youthPlayers[i];
  console.log("-----------------------------------------------------");
  await movePlayer(credentials, player, payload);
}
process.exit(0);
