interface LeagueTable {
    pos: number;
    teamName: string;
    teamId: number;
    pl: number;
    w: number;
    d: number;
    l: number;
    f: number;
    a: number;
    pts: number;
}
interface Matches {
    round: number;
    date: string;
    time: string;
    matches: {
        home: {
            name: string;
            id: number;
        };
        away: {
            name: string;
            id: number;
        };
        game: {
            score: string | null;
            id: number;
        };
    }[];
}
export interface League {
    leagueTable: LeagueTable[];
    RoundMatches: Matches[];
}
export declare const parseLeague: (doc?: Document) => League;
export {};
