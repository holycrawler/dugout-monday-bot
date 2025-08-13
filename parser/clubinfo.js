export const parseClubInfo = (doc = document) => {
    const flagEl = doc.querySelector("img[src*='images/flags_round']");
    const lastActiveEl = doc.querySelectorAll("td.maninfo:last-child")[2];
    const quickFactsTableEl = doc.querySelector("div#content_main > div:last-child table");
    const [teamNameEl, shortNameEl, StadiumEl, ratingEl, managerEl, , leagueEl, idEl, viewdByEl, fameRankEl,] = quickFactsTableEl.querySelectorAll("td[class*=matches_row]:nth-child(2)");
    const pa = quickFactsTableEl.querySelectorAll("img").length === 1;
    const stadium = StadiumEl.textContent.match(/(.*)\(([0-9]*\/[0-9]*)\)/);
    const leagueLinkEl = leagueEl.firstElementChild;
    const managerId = Number(managerEl.firstElementChild.href.match(/toid\/(\d+)/)[1]);
    const trophiesEl = doc.querySelectorAll("img[src*='images/club/cups']");
    const achivementsEl = doc.querySelectorAll("img[src*='images/trophies']");
    const trophies = Array.from(trophiesEl).map((el) => el.getAttribute("title"));
    const achivements = Array.from(achivementsEl).map((el) => el.getAttribute("title"));
    return {
        id: Number(idEl.textContent.replace(/\D+/g, "")),
        teamName: teamNameEl.textContent.trim(),
        shortName: shortNameEl.textContent.trim(),
        manager: {
            name: managerEl.textContent.trim(),
            id: managerId,
        },
        country: {
            name: flagEl.getAttribute("title"),
            code: flagEl.src.match(/(?<=flags_round\/)\w+(?=\.png)/)[0],
        },
        lastActive: lastActiveEl.textContent.trim(),
        stadium: {
            name: stadium[1].trim(),
            capacity: Number(stadium[2]),
        },
        rating: Number(ratingEl.textContent.replace(/\D+/g, "")),
        league: {
            name: leagueLinkEl.textContent,
            url: leagueLinkEl.href,
        },
        trophies: trophies,
        achievements: achivements,
        premiumAccount: {
            active: pa,
            viewedBy: pa ? Number(viewdByEl.textContent.replace(/\D+/g, "")) : null,
            fameRank: pa ? Number(fameRankEl.textContent.replace(/\D+/g, "")) : null,
        },
    };
};
//# sourceMappingURL=clubinfo.js.map