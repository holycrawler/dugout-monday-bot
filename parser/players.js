const ATTRIBUTE_NAMES = [
    ["reflexes", "tackling", "creativity", "shooting", "teamWork"],
    ["oneOnOnes", "marking", "passing", "dribbling", "speed"],
    ["handling", "heading", "longShots", "positioning", "strength"],
    ["communication", "crossing", "firstTouch", "aggression", "influence"],
    ["eccentricity"],
].flat(1);
export const parsePlayerTables = (doc = document) => {
    const playerTables = [
        ...doc.querySelectorAll("table.forumline"),
    ];
    const isOwnTeam = doc.querySelector("div#top_positions").childElementCount > 0 ? 1 : 0;
    return playerTables
        .map((table) => {
        return [
            ...table.querySelectorAll("tr[class*='matches_row']"),
        ].map((tr) => {
            const cells = tr.cells;
            const playerPosEl = cells[0 + isOwnTeam];
            const playerInfoEl = cells[1 + isOwnTeam];
            const playerNameEl = cells[2 + isOwnTeam];
            const playerAgeEl = cells[3 + isOwnTeam];
            const playerNatEl = cells[4 + isOwnTeam];
            const playerRatEl = cells[5 + isOwnTeam];
            const playerLinkEl = playerNameEl.querySelector("a");
            const playerName = playerLinkEl.textContent.trim();
            const playerID = Number(playerLinkEl.href.match(/playerID\/(\d+)/)[1]);
            const NT = playerPosEl
                .firstElementChild.className.replace("_icon", "")
                .toUpperCase();
            const onLoan = playerLinkEl
                .textContent.trim()
                .match(/^([^\(\)]+) \([^\(\)]*\)$/);
            const loanedOut = !playerInfoEl.firstElementChild;
            const transferListed = !!cells[2 + isOwnTeam].querySelector(".pl_tra");
            const bidStarted = !!cells[2 + isOwnTeam].querySelector(".pl_bid");
            const injured = !!cells[2 + isOwnTeam].querySelector(".pl_injured");
            const redCard = !!cells[2 + isOwnTeam].querySelector(".pl_cardr");
            const attributesObject = {};
            if (!loanedOut) {
                const playerAttributs = [
                    ...playerInfoEl.querySelectorAll("td[class]"),
                ]
                    .map((td) => Number(td.textContent))
                    .filter((attr) => attr);
                ATTRIBUTE_NAMES.forEach((ATTRIBUTE, i) => (attributesObject[ATTRIBUTE] = playerAttributs[i]));
            }
            return {
                position: playerPosEl.textContent.trim(),
                nationalTeam: NT === "DEF" ? null : NT,
                name: onLoan ? onLoan[1] : playerName,
                transferListed,
                bidStarted,
                injured,
                redCard,
                onLoan: onLoan ? !loanedOut : false,
                loanedOut,
                id: playerID,
                age: Number(playerAgeEl.textContent.trim()),
                country: {
                    name: playerNatEl.firstElementChild.title,
                    code: playerNatEl.firstElementChild.src.match(/(?<=flags_small\/new\/)\w+(?=\.png)/)[0],
                },
                rating: Number(playerRatEl.textContent.trim()),
                attributes: loanedOut ? null : attributesObject,
            };
        });
    })
        .flat(1);
};
//# sourceMappingURL=players.js.map