import Discord from 'discord.js';
import path from "path";
import fs from "fs";
import types from "./types";


const settings: types.Settings = JSON.parse(fs.readFileSync(path.join(__dirname, "./settings.json")).toString());
const flags: any = {};
export function update(msg: Discord.Message): void {
    if (!flags[msg.author.id]) flags[msg.author.id] = 0;
    flags[msg.author.id]++;
}
export function shouldDelete(msg: Discord.Message): boolean {
    return flags[msg.author.id] >= settings.flagsForDeletion;
}
export function shouldBan(msg: Discord.Message): boolean {
    return flags[msg.author.id] >= settings.flagsForBan;
}