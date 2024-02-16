import NotificationAPI from "notificationapi-js-client-sdk";
import "notificationapi-js-client-sdk/dist/styles.css";
import { PopupPosition } from "notificationapi-js-client-sdk/lib/interfaces";
import { memo, useEffect } from "react";

const NotificationAPIContainer = memo(({ userId }) => {
  useEffect(() => {
    const notificationapi = new NotificationAPI({
      clientId: "CLIENT_ID",
      userId: userId,
    });
    notificationapi.showUserPreferences({
      root: "CONTAINER_DIV_ID",
      popupPosition: PopupPosition.BottomLeft,
    });
  }, [userId]);

  return <div id="CONTAINER_DIV_ID"></div>;
});
export default NotificationAPIContainer;
