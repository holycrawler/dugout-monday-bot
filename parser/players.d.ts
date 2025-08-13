declare const ATTRIBUTE_NAMES: string[];
interface PlayersAttributes {
    [key: (typeof ATTRIBUTE_NAMES)[number]]: number;
}
export interface Player {
    position: string;
    nationalTeam: string | null;
    name: string;
    transferListed: boolean;
    bidStarted: boolean;
    injured: boolean;
    redCard: boolean;
    onLoan: boolean;
    loanedOut: boolean;
    id: number;
    age: number;
    country: {
        name: string;
        code: string;
    };
    rating: number;
    attributes: PlayersAttributes | null;
}
export declare const parsePlayerTables: (doc?: Document) => Player[];
export {};
