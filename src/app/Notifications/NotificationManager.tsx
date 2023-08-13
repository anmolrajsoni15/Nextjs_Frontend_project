"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

interface NotificationProps {
  type: string;
  message: string;
}

const Notification = ({ type, message }: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      hideNotification();
    }, 3000);

    return () => {
      clearTimeout(timeout);
      hideNotification();
    };
  }, []);

  if (!visible) return null;

  if (type === "success") {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 shadow-cardShadow p-4 px-6 rounded-lg bg-[#292929] flex items-center justify-start gap-4 w-[600px] z-[999999]">
        <Image
          src="/icons/green_success.svg"
          alt="success"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-[#09BC8F] text-base font-spacegrotesk">
            {type}
          </div>
          <div className="text-[#F1F1F1] font-spacegrotesk font-medium text-base leading-5">
            {message}
          </div>
        </div>
        <Image
          className="absolute right-7"
          onClick={hideNotification}
          src="/icons/cross.svg"
          alt="close"
          width={20}
          height={20}
        />
      </div>
    );
  } else if (type === "error") {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 shadow-cardShadow p-4 px-6 rounded-lg bg-[#292929] flex items-center justify-start gap-4 w-[600px] z-[999999]">
        <Image
          src="/icons/red_warning.svg"
          alt="error"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-[#E8726C] text-base font-spacegrotesk">
            {type}
          </div>
          <div className="text-[#F1F1F1] font-spacegrotesk font-medium text-base leading-5">
            {message}
          </div>
        </div>
        <Image
          className="absolute right-7"
          onClick={hideNotification}
          src="/icons/cross.svg"
          alt="close"
          width={20}
          height={20}
        />
      </div>
    );
  } else if (type === "info") {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 px-6 rounded-lg bg-[#292929] shadow-cardShadow flex items-center justify-start gap-4 w-[600px] z-[999999]">
        <Image src="/icons/blue_info.svg" alt="info" width={40} height={40} />
        <div className="flex flex-col items-start justify-center">
          <div className="text-[#28A1FF] text-base font-spacegrotesk">
            {type}
          </div>
          <div className="text-[#F1F1F1] font-spacegrotesk font-medium text-base leading-5">
            {message}
          </div>
        </div>
        <Image
          className="absolute right-7"
          onClick={hideNotification}
          src="/icons/cross.svg"
          alt="close"
          width={20}
          height={20}
        />
      </div>
    );
  } else if (type === "warning") {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 px-6 shadow-cardShadow rounded-lg bg-[#292929] flex items-center justify-start gap-4 w-[600px] z-[999999]">
        <Image
          src="/icons/yellow_warning.svg"
          alt="warning"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-[#F6B05D] text-base font-spacegrotesk">
            {type}
          </div>
          <div className="text-[#F1F1F1] font-spacegrotesk font-medium text-base leading-5">
            {message}
          </div>
        </div>
        <Image
          className="absolute right-7"
          onClick={hideNotification}
          src="/icons/cross.svg"
          alt="close"
          width={20}
          height={20}
        />
      </div>
    );
  }

  return null;
};

let notificationContainer: HTMLDivElement | null = null;
let root: any = null;

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
      root = createRoot(notificationContainer);
    } else {
      console.error(
        "Error creating notification container: my-container element not found"
      );
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
        console.error(
          "Error removing notification container: my-container element not found"
        );
      }
      notificationContainer = null;
    }
  } catch (error) {
    console.error("Error removing notification container:", error);
  }
};

const getNotificationContainer = () => {
  try {
    if (
      !notificationContainer ||
      !document.body.contains(notificationContainer)
    ) {
      createNotificationContainer();
    }
  } catch (error) {
    console.error("Error getting notification container:", error);
  }

  return notificationContainer || document.createElement("div");
};

export const showNotification = (type: string, message: string) => {
  try {
    hideNotification();
    const container = getNotificationContainer();
    if (container) {
      // ReactDOM.render(
      //   createPortal(
      //     <Notification
      //       type={type}
      //       message={message}
      //       key={new Date().getTime()}
      //     />,
      //     container
      //   ),
      //   container
      // );
      root.render(
        <Notification
          type={type}
          message={message}
          key={new Date().getTime()}
        />
      );
    }
  } catch (error) {
    console.error("Error rendering notification:", error);
  }
};

export const hideNotification = () => {
  try {
    if (notificationContainer) {
      // ReactDOM.unmountComponentAtNode(notificationContainer);
      root.unmount();
      removeNotificationContainer();
    }
  } catch (error) {
    console.error("Error hiding notification:", error);
  }
};
