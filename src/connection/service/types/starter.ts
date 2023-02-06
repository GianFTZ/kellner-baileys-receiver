import { AuthenticationState } from "@adiwajshing/baileys";

export interface IStarter {
  state?: AuthenticationState;
  saveCreds?: () => Promise<void>;
}
