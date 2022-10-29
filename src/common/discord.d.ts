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
    }
  }
}

export {};
