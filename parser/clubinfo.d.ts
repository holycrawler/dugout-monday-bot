export interface ClubInfo {
    id: number;
    teamName: string;
    shortName: string;
    manager: {
        name: string;
        id: number;
    };
    country: {
        name: string;
        code: string;
    };
    lastActive: string;
    stadium: {
        name: string;
        capacity: number;
    };
    rating: number;
    league: {
        name: string;
        url: string;
    };
    trophies: string[];
    achievements: string[];
    premiumAccount: {
        active: boolean;
        viewedBy: number | null;
        fameRank: number | null;
    };
}
export declare const parseClubInfo: (doc?: Document) => ClubInfo;
