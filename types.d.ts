export interface Secret {
    deepaiAPIKey: string,
    discordToken: string;
}
export interface Settings {
    threshold: number;
    flagsForDeletion: number;
    flagsForBan: number;
}