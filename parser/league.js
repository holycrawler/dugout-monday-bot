const parceLeagueTable = (doc = document) => {
    const parcedTable = [];
    const leagueTable = doc.querySelector("table#myTable");
    for (let i = 1; i < leagueTable.rows.length; i++) {
        const rows = leagueTable.querySelectorAll("tr");
        const cells = rows[i].querySelectorAll("td");
        parcedTable.push({
            pos: Number(cells[0].textContent.trim()),
            teamName: cells[1].textContent.trim(),
            teamId: Number(cells[1].firstElementChild.href.match(/clubid\/(\d+)/)[1]),
            pl: Number(cells[3].textContent.trim()),
            w: Number(cells[4].textContent.trim()),
            d: Number(cells[5].textContent.trim()),
            l: Number(cells[6].textContent.trim()),
            f: Number(cells[7].textContent.trim()),
            a: Number(cells[8].textContent.trim()),
            pts: Number(cells[9].textContent.trim()),
        });
    }
    return parcedTable;
};
const parseMatchTablehead = (doc = document) => {
    const tableHeads = [...doc.querySelectorAll("div.cup_title")].map((th) => th.textContent.trim());
    return tableHeads.map((e) => {
        const match = e.match(/Round (\d+) matches\s?\((\S+)\s?(\S+)\s?\s?\)/);
        const roundNumber = match[1];
        const matchDateTime = match[2];
        const matchTime = match[3];
        return {
            round: Number(roundNumber),
            date: matchDateTime,
            time: matchTime,
        };
    });
};
const parseMatches = (doc = document) => {
    const [...gamesTables] = doc.querySelectorAll("div.cup_title + div>table");
    const tableHeads = parseMatchTablehead(doc);
    return gamesTables.map((table, index) => {
        const parsedTable = [...table.querySelectorAll("tr")].map((e) => {
            const anchors = e.querySelectorAll("a");
            const score = anchors[1].textContent.trim();
            const parsedLine = {
                home: {
                    name: anchors[0].textContent.trim(),
                    id: Number(anchors[0].href.match(/clubid\/(\d+)/)[1]),
                },
                away: {
                    name: anchors[2].textContent.trim(),
                    id: Number(anchors[2].href.match(/clubid\/(\d+)/)[1]),
                },
                game: {
                    score: score === "vs." ? null : score,
                    id: Number(anchors[1].href.match(/gameid\/(\d+)/)[1]),
                },
            };
            return parsedLine;
        });
        return { ...tableHeads[index], matches: parsedTable };
    });
};
export const parseLeague = (doc = document) => {
    return {
        leagueTable: parceLeagueTable(doc),
        RoundMatches: parseMatches(doc),
    };
};
//# sourceMappingURL=league.js.map