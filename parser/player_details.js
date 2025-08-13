const ATTRIBUTE_NAMES = [
    ["reflexes", "tackling", "creativity", "shooting", "teamWork"],
    ["oneOnOnes", "marking", "passing", "dribbling", "speed"],
    ["handling", "heading", "longShots", "positioning", "strength"],
    ["communication", "crossing", "firstTouch", "aggression", "influence"],
    ["eccentricity"],
].flat(1);
const POSITION_COORDS = {
    "69px10px": "GK",
    "69px40px": "DC",
    "20px40px": "DL",
    "117px40px": "DR",
    "69px108px": "MC",
    "20px108px": "ML",
    "117px108px": "MR",
    "69px185px": "FC",
    "20px185px": "FL",
    "117px185px": "FR",
};
const getPosition = (positionsEl) => {
    const mainPosition = positionsEl.querySelector("div[style*='club/positions-1.png']");
    const coords = `${mainPosition.style.top}${mainPosition.style.left}`;
    return POSITION_COORDS[coords];
};
const getNumberOfStars = (starEl) => {
    const starEls = starEl.querySelectorAll(":scope > li.fa-star") || [];
    const starHalfEls = starEl.querySelectorAll(":scope > li.fa-star-half-o") || [];
    const starCount = starEls.length;
    const starHalfCount = starHalfEls.length;
    const totalStars = starCount + starHalfCount / 2;
    return totalStars;
};
const getCoachReports = (tableEl) => {
    if (!tableEl)
        return null;
    return [
        ...tableEl.querySelectorAll("tr[class*=row]"),
    ].map((e) => {
        const [coachNameEl, jptEl, starEl] = e.cells;
        const stars = getNumberOfStars(starEl);
        const [, coachName, reportsString] = coachNameEl
            .textContent.trim()
            .match(/^(.*?)\s*\((\d+)\s*[^\)]+\)$/);
        const numberOfReports = Number(reportsString);
        const jpt = jptEl.textContent.trim() === "n/a"
            ? null
            : Number(jptEl.textContent.trim());
        return {
            coach: coachName,
            numberOfReports,
            jpt,
            average: stars,
        };
    });
};
const getScoutReports = (scoutReportTable) => {
    if (!scoutReportTable)
        return null;
    return [
        ...scoutReportTable.querySelectorAll("tr[class*=row]"),
    ].map((e) => {
        const [scoutEl, starEl] = e.cells;
        const stars = getNumberOfStars(starEl);
        const [, scoutType, reportsString] = scoutEl
            .textContent.trim()
            .match(/^(.*?)\s*\((\d+)\s*[^\)]+\)$/);
        const numberOfReports = Number(reportsString);
        return {
            scout: scoutType,
            numberOfReports,
            average: stars,
        };
    });
};
const parseTalentReport = (talentEl) => {
    const numberOfStars = getNumberOfStars(talentEl);
    if (numberOfStars === 0) {
        return {
            average: null,
            coachesReports: null,
            scoutReports: null,
        };
    }
    const [table1, table2] = [
        ...talentEl.querySelectorAll("#talentPanel table"),
    ];
    const isScout = table1?.querySelectorAll("tr:first-child>td").length === 2;
    const [scoutReportTable, coachReportTable] = isScout
        ? [table1, table2]
        : [table2, table1];
    return {
        average: numberOfStars,
        coachesReports: getCoachReports(coachReportTable),
        scoutReports: getScoutReports(scoutReportTable),
    };
};
export const parsePlayer = (doc = document) => {
    const mainDivEl = doc.querySelector("#main-1");
    if (!mainDivEl) {
        return null;
    }
    const [headerEl, , bioEl, basicEl, mainEl] = mainDivEl.parentNode.querySelectorAll(":scope > div");
    const [idEl, countryEl, nameEl] = headerEl.querySelectorAll(":scope .player_id_txt,img,.player_name");
    const [clubCountryEl, clubEl, , ageEl] = bioEl.querySelectorAll("td");
    const clubLinkEl = clubEl.firstElementChild;
    const [skillsEl, personalityEl, positionsEl, formEl, economicsEl] = mainEl.querySelectorAll(":scope > div");
    const [, conditionEl, , moralEl, , weeksAtClubEl, talentEl, , prefFootEl, , formValueEl, , expEl,] = basicEl
        .querySelector("table")
        .querySelectorAll(":scope>tbody > tr[class*=row] > td");
    const [, contractEl, , wageEl, , estimatedValueEl] = economicsEl
        .querySelector("table")
        .querySelectorAll(":scope>tbody>tr[class*=row]>td");
    const hasTeam = clubLinkEl.tagName.toLowerCase() === "a";
    const hasContract = contractEl.textContent.trim() !== "/";
    const contract = hasContract
        ? Number(contractEl.textContent.trim()) || 1
        : null;
    const wage = hasContract
        ? Number(wageEl.textContent.replace(/\D+/g, ""))
        : null;
    const name = nameEl.textContent;
    const club = hasTeam
        ? {
            id: Number(clubLinkEl.href.replace(/\D/g, "")),
            name: clubLinkEl.textContent,
            country: {
                code: clubCountryEl
                    .querySelector("img")
                    .src.match(/(?<=flags_small\/new\/)\w+(?=\.png)/)[0],
                name: clubCountryEl.querySelector("img").title,
            },
        }
        : null;
    const skillValueEls = skillsEl.querySelectorAll(".row1 td:nth-child(3n + 2), .row2 td:nth-child(3n + 2)");
    const attributes = {};
    for (let i = 0; i < ATTRIBUTE_NAMES.length; i++) {
        const attributeName = ATTRIBUTE_NAMES[i];
        attributes[attributeName] = Number(skillValueEls[i].textContent);
    }
    const talentReport = parseTalentReport(talentEl);
    const formHistoryString = doc.querySelector("img[src*=form_history]").src.match(/form_history=([\d-]+)/);
    const formHistory = formHistoryString
        ? formHistoryString[1].split("-").map(Number)
        : [];
    return {
        id: Number(idEl.textContent.replace(/\D+/g, "")),
        name,
        age: Number(ageEl.textContent.replace(/\D+/g, "")),
        country: {
            code: countryEl.src.match(/(?<=flags_round\/half\/)\w+(?=\.png)/)[0],
            name: countryEl.title,
        },
        club,
        attributes,
        talentReport,
        condition: Number(conditionEl.textContent.trim().replace("%", "")),
        moral: moralEl.textContent.trim(),
        weeksAtClub: Number(weeksAtClubEl.textContent.trim()),
        prefFoot: prefFootEl.textContent.trim(),
        form: formValueEl.textContent.trim(),
        formHistory,
        experience: Number(expEl.firstElementChild.title.replace(/\D+/g, "")),
        position: getPosition(positionsEl),
        contract,
        wage,
        estimatedValue: Number(estimatedValueEl.textContent.trim().replace(/\D+/g, "")),
        personalities: [...personalityEl.querySelectorAll(".row1, .row2")]
            .map((e) => e.textContent.trim())
            .filter((trait) => trait.includes(name.replace(/\s\S+$/, ""))),
    };
};
//# sourceMappingURL=player_details.js.map