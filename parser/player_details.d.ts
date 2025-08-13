declare const ATTRIBUTE_NAMES: string[];
interface PlayerAttributes {
    [key: (typeof ATTRIBUTE_NAMES)[number]]: number;
}
interface CoachReport {
    coach: string;
    numberOfReports: number;
    jpt: number | null;
    average: number;
}
interface ScoutReport {
    scout: string;
    numberOfReports: number;
    average: number;
}
interface TalentReport {
    average: number | null;
    coachesReports: CoachReport[] | null;
    scoutReports: ScoutReport[] | null;
}
type Position = "GK" | "DC" | "DL" | "DR" | "MC" | "ML" | "MR" | "FC" | "FL" | "FR";
interface Club {
    id: number;
    name: string;
    country: {
        code: string;
        name: string;
    };
}
export interface PlayerDetails {
    id: number;
    name: string;
    age: number;
    country: {
        code: string;
        name: string;
    };
    club: Club | null;
    attributes: PlayerAttributes;
    condition: number;
    moral: string;
    weeksAtClub: number;
    prefFoot: string;
    form: string;
    formHistory: number[];
    talentReport: TalentReport;
    experience: number;
    position: Position;
    contract: number | null;
    wage: number | null;
    estimatedValue: number;
    personalities: string[];
}
export declare const parsePlayer: (doc?: Document) => PlayerDetails | null;
export {};
