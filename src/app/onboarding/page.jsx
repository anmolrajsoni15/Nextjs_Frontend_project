'use client'

import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import LoginStepper from "./components/LoginStepper";
import Who from "./components/Who";
import Where from "./components/Where";
import How from "./components/How";
import Logo from "./components/Logo";
import Success from "./components/Success";
import "./globals.css";
import { getCookie } from "cookies-next";
import { getUser } from "../services/apiServices";
import { useDispatch } from "react-redux";

function OnboardingPage() {
  const dispatch = useDispatch();

  const [cnt, setCnt] = useState(0);
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);

  const token = getCookie("jwt");
  useEffect(() => {
    if(token){
      dispatch(getUser(token));
    }
  }, [token]);

  useEffect(() => {
    setShouldRenderComponent(true);
  }, [cnt]);

  const incrementCnt = () => {
    if (cnt >= 3) {
      setCnt(0);
    } else {
      setCnt((prevCnt) => prevCnt + 1);
    }
    setShouldRenderComponent(false);
  };

  const renderComponent = () => {
    switch (cnt) {
      case 0:
        return <Who incrementCnt={incrementCnt} />;
      case 1:
        return <How incrementCnt={incrementCnt} />;
      case 2:
        return <Where incrementCnt={incrementCnt} />;
      default:
        return <Success incrementCnt={incrementCnt} />;
    }
  };

  return (
    <main className="flex flex-col items-center w-full justify-center gap-4 p-6 py-8 ">
          <Logo />
      <LoginStepper activeStep={cnt} />
      <CSSTransition
        in={shouldRenderComponent}
        classNames="fade"
        timeout={300}
        unmountOnExit
        appear
      >
        {renderComponent()}
      </CSSTransition>

    </main>
  );
}

export default OnboardingPage;
