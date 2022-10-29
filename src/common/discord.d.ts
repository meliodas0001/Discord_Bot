declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, any>;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      clientId: string;
      guildId: string;
      TwitchID: string;
      TwitchSecret: string;
      BearerToken: string;
      DATABASE_URL: string;
    }
  }
}

export {};
