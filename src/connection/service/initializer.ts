import { useMultiFileAuthState } from "@adiwajshing/baileys";
import env from "../../config/env";

export async function initializer() {
  const { state, saveCreds } = await useMultiFileAuthState(env.SESSION_PATH)
  return { state, saveCreds }
}