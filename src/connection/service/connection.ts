import { DisconnectReason, WASocket } from "@adiwajshing/baileys";
import { Boom } from '@hapi/boom'
import { IStarter, Launcher } from ".";
import env from "../../config/env";
import * as fs from 'fs'
import { DisconnectReasons } from "../error";
import { Alerts } from "../alerts";
import axios from 'axios'

export const eventListener = (client: WASocket, starter: IStarter, launcher: Launcher) => {
  client.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if(connection === 'close') {
          const error = lastDisconnect!.error as Boom
          const statusCode =  error?.output?.statusCode;
          lastDisconnect!.error as Boom
          const shouldReconnectArray = DisconnectReasons
          const shouldReconnect = shouldReconnectArray.includes(statusCode)
          if (shouldReconnect) {
              return launcher.buildProps();
          }
          if (statusCode == DisconnectReason.loggedOut) {
              fs.unlinkSync(env.SESSION_PATH)
              return launcher.buildProps();
          }
          Alerts.unexpectedClose(error, shouldReconnect)
          process.exit()
      } else if(connection === 'open') {
          Alerts.connectionSuccessful()
          client.sendMessage('120363046412489809@g.us', {
            text: "producer is ready"
          })
      }
  });

  client.ev.on('creds.update', ((authCreds) => {
      starter.saveCreds!();
  }));    
  
  client.ev.on('messages.upsert', async message => {
    if(message.messages[0].key.remoteJid == "120363046412489809@g.us"){
        if (message.messages[0].message?.conversation == ".ping"){
            client.sendMessage("120363046412489809@g.us", {text: "pong"})
        } else {
            axios.post('http://localhost:3333/teste', {}, {
                params: { message, jid: message.messages[0].key.remoteJid, timestamp: message.messages[0].messageTimestamp }
            })
        }
    }
  })
  return client;
}