export const parseMatch = (doc = document) => {
    const homeScoreEl = doc.querySelector("div#goals_home");
    const awayScoreEl = doc.querySelector("div#goals_away");
    const homeTeamEl = homeScoreEl.previousElementSibling;
    const awayTeamEl = awayScoreEl.nextElementSibling;
};
//# sourceMappingURL=match.js.map