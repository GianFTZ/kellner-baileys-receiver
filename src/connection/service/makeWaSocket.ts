import makeWASocket, { AuthenticationState } from "@adiwajshing/baileys";
import P from 'pino'

export const makeWaSocket = (state: AuthenticationState)=>{
  return makeWASocket({
      markOnlineOnConnect: true,
      printQRInTerminal: true,
      browser: ['Teste BOT', "Safari", "3.0"],
      logger: P({ level: "fatal" }),
      auth: state,
      emitOwnEvents: true
  });
}