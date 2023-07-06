'use client'

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createPortal } from 'react-dom';

interface NotificationProps {
  message: string;
  duration: number;
}

const Notification = ({ message, duration }: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
      hideNotification();
    };
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 rounded-lg bg-gray-800 text-white">
      {message}
    </div>
  );
};

let notificationContainer: HTMLDivElement | null = null;

// const createNotificationContainer = () => {
//   try {
//     notificationContainer = document.createElement("div");
//     const appElement = document.getElementById("app");
//     if (appElement) {
//       appElement.appendChild(notificationContainer);
//     } else {
//       const newAppElement = document.createElement("div");
//       newAppElement.id = "app";
//       document.body.appendChild(newAppElement);
//       newAppElement.appendChild(notificationContainer);
//     }
//   } catch (error) {
//     console.error("Error creating notification container:", error);
//   }
// };


const createNotificationContainer = () => {
  try {
    notificationContainer = document.createElement("div");
    const containerElement = document.getElementById("my-container");
    if (containerElement) {
      containerElement.appendChild(notificationContainer);
    } else {
      console.error("Error creating notification container: my-container element not found");
    }
  } catch (error) {
    console.error("Error creating notification container:", error);
  }
};





const removeNotificationContainer = () => {
  try {
    if (notificationContainer) {
      const containerElement = document.getElementById("my-container");
      if (containerElement) {
        containerElement.removeChild(notificationContainer);
      } else {
        console.error("Error removing notification container: my-container element not found");
      }
      notificationContainer = null;
    }
  } catch (error) {
    console.error("Error removing notification container:", error);
  }
};


const getNotificationContainer = () => {
  try {
    if (!notificationContainer || !document.body.contains(notificationContainer)) {
      createNotificationContainer();
    }
  } catch (error) {
    console.error("Error getting notification container:", error);
  }

  return notificationContainer || document.createElement("div");
};

export const showNotification = (message: string, duration: number) => {
  try {
    hideNotification();
    const container = getNotificationContainer();
    if (container) {
      ReactDOM.render(
        createPortal(
          <Notification
            message={message}
            duration={duration}
            key={new Date().getTime()}
          />,
          container
        ),
        container
      );
    }
  } catch (error) {
    console.error("Error rendering notification:", error);
  }
};



export const hideNotification = () => {
  try {
    if (notificationContainer) {
      ReactDOM.unmountComponentAtNode(notificationContainer);
      removeNotificationContainer();
    }
  } catch (error) {
    console.error("Error hiding notification:", error);
  }
};
