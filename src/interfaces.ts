// import modules
import * as Discord from "discord.js";

export interface DiscordConfig {
    prefix: string;
    token: string;
}

export interface Command {
    name: string;
    format: string;
    description: string;
    execute(message: Discord.Message, args: string[]): void;
}

export interface Leader {
    name: string;
    avatarId: string;
    country: string;
}

export interface EmbedResponse {
    color: number;
    title: string;
    fields: { name: string; value: string; inline?: boolean; }[];
}