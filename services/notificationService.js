import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

let connection = null;

export const connectNotificationHub = (token, onReceiveNotification) => {
  connection = new HubConnectionBuilder()
    // .withUrl("https://ftapigatewayservice.azurewebsites.net/notificationHub", {
        .withUrl("https://b2c4-171-232-109-183.ngrok-free.app/notificationHub", {

      accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

    connection.on("ReceiveNotification", (title, message) => {
      console.log("🔥 Received notification via SignalR:", title, message);
    
      // Tạo object giống như từ API
      const fakeNotification = {
        notificationID: Date.now(), // ID giả
        title: title,
        content: message,
        notificationType: "General",
        isRead: false,
        createdDate: new Date().toISOString(),
      };
    
      onReceiveNotification(fakeNotification);
    });

  connection
    .start()
    .then(() => console.log("✅ [SignalR] Connected"))
    .catch(err => console.error("❌ [SignalR] Connection failed", err));
};

export const disconnectNotificationHub = async () => {
  if (connection && connection.state === "Connected") {
    await connection.stop();
    console.log("🔌 [SignalR] Disconnected");
  } else {
    console.log("🔌 [SignalR] Skip disconnect (not connected)");
  }
};

