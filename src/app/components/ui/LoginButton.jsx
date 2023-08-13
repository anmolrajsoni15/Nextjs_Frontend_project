"use client";
import Image from "next/image";
import React from "react";
import Modal from "react-modal";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "src/app/Firebase/firebaseConfig";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%) scale(0.5)",
    border: "none",
    borderRadius: "8px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
    zIndex: "1000",
    transition: "transform 0.5s ease-in-out",
    opacity: 1,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 0.3s ease-in-out",
  },
};

const LoginButton = ({ text }) => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      var user = result.user;

      var userDetail = JSON.stringify({
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        credits: 50,
        photo: user.photoURL,
      });

      var credentials = {
        username: user.email,
        password: user.uid,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: userDetail,
      });

      if (res.status == 200) {
        const result = await res.json();
        console.log(result);

        try {
          const formData = new FormData();
          formData.append("username", credentials.username);
          formData.append("password", credentials.password);

          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            console.log("Network Response for Login was not ok!");
          }

          if (res.ok) {
            const response = await res.json();
            console.log("login response: ", response);
            setCookie("jwt", response.access_token);
            setCookie("user", user.email);
            router.push("/onboarding");
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (res.status == 400) {
        console.log("Network Request for get user was 400!");

        try {
          const formData = new FormData();
          formData.append("username", credentials.username);
          formData.append("password", credentials.password);

          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            console.log("Network Response for Login was not ok!");
          }

          if (res.ok) {
            const response = await res.json();
            console.log("login response: ", response);
            setCookie("user", user.email);
            setCookie("jwt", response.access_token);
            router.push("/new/dashboard");
          }
        } catch (error) {
          console.log(error);
        }

        // }
      } else if (!res.ok) {
        throw new Error("Network Response for add user was not ok!");
      }
    } catch (error) {
      console.log(error, "err");
    }
  };
  return (
    <>
      <div
        className="hidden lg:flex justify-center font-medium text-sm mt-5 cursor-pointer"
        onClick={handleLogin}
      >
        <div className="flex items-center justify-evenly gap-3 bg-[#1C1C1C] hover:border-[#FFFFFF99] rounded-md border-2 border-[#ffffff1a] px-[18px] py-[17px]">
          <div className="h-5 w-5 sm:w-6 sm:h-6 relative">
            <Image
              src="landing_images/google.svg"
              alt="Google Logo"
              className="object-cover"
              fill
            />
          </div>
          <div className="sm:font-medium text-lg font-spacegrotesk ">{text}</div>
        </div>
      </div>
      <div
        className="flex lg:hidden justify-center font-medium text-sm mt-5 cursor-pointer"
        onClick={openModal}
      >
        <div className="flex items-center justify-evenly w-56 md:w-52 h-12 bg-[#1C1C1C] hover:border-[#FFFFFF99] rounded-md border-2 border-[#ffffff1a] font-spacegrotesk text-base md:text-lg leading-6">
          <div className="h-5 w-5 sm:w-5 sm:h-5 relative">
            <Image
              src="landing_images/google.svg"
              alt="Google Logo"
              className="object-cover"
              fill
            />
          </div>
          <div className="sm:font-medium text-base ">{text}</div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        onAfterOpen={() => {
          // customStyles.content.opacity = 1;
          customStyles.content.transform = "translate(-50%, -50%) scale(1)";
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.8)";
        }}
        onAfterClose={() => {
          // customStyles.content.opacity = 0;
          customStyles.content.transform = "translate(-50%, -50%) scale(0.5)";
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
        }}
        contentLabel="Bloc Name"
      >
        <div className=" bg-[tomato] text-white w-[90vw] md:w-[60vw] p-6 flex flex-col items-center justify-center gap-5">
          <Image
            src="/images/laptop.gif"
            width={150}
            height={150}
            alt="laptop"
          />
          <div className="font-spacegrotesk font-bold text-2xl text-center max-w-[90%]">
            Use laptop or PC to Continue with Google
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginButton;