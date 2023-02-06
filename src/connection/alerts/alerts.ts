export class Alerts {
  public static initializing() {
      console.log("✅ Making wa-socket connection");
  }
  public static connectionSuccessful() {
      console.log("✅ Connected successfully")
  }
  public static unexpectedClose(err: any, shouldReconnect: any) {
      console.log('❌ Connection closed due to ', err, ', reconnecting ', shouldReconnect)
  }
}