import Discord from "discord.js";
import path from "path";
import fs from "fs";
import types from "./types.d";
import isNsfw from "./isNSFW";
import { shouldDelete, shouldBan, update} from "./flagsManager";



const SECTERS: types.Secret = JSON.parse(fs.readFileSync(path.join(__dirname, "./secret.json")).toString());
const EXCLUDE_CHANNELS: Array<string> = JSON.parse(fs.readFileSync(path.join(__dirname, "./excludeChannels.json")).toString());
const client = new Discord.Client();

client.on("message", async msg => {
    if (msg.author.bot || !await isNsfw(msg) || EXCLUDE_CHANNELS.includes(msg.channel.id)) return;
    if (!msg.guild) return;
    const member = msg.guild.member(msg.author);
    if (!member) return;
    update(msg);
    if (shouldDelete(msg) && msg.deletable && !msg.deleted) msg.delete({
        reason: "This message has been deleted because the amount of flagged messages by this user has exceeded the quota."
    }); 
    if (shouldBan(msg) && member.bannable) member.ban({
        reason: "This user has been banned because the amount of flagged messages by them has exceeded the quota."
    }); 
    console.log("Message has been flagged.");
});

// Client login
client.login(SECTERS.discordToken);




