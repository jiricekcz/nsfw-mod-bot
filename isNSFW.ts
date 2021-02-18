import Discord from 'discord.js';
import path from "path";
import fs from "fs";

const banlist: Array<string> = JSON.parse(fs.readFileSync(path.join(__dirname, "./banlist.json")).toString());

export default async function isNSFW(msg: Discord.Message): Promise<boolean> {
    for (const b of banlist) {
        if (msg.content.includes(b)) return true;
    }
    return false;
}