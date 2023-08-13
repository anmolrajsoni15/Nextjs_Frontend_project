"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderComp from "./HeaderComp";
import SuggestedQuestionCont from "./SuggestedQuestionCont";
import LayoutEffect from "src/app/components/LayoutEffect";
import { clearMessage, updateSampleQuestions } from "src/app/Redux/features/blocSlice";
import NewButton from "src/app/components/common/NewButtton";
import { updateBloc } from "src/app/services/apiServices";
import { getCookie } from "cookies-next";
import { showNotification } from "src/app/Notifications/NotificationManager";
import { RootState } from "src/app/Redux/store";

interface Props {
  blocDetails: any;
  isModified: boolean;
  setIsModified: any;
}

const InterfaceContainer: React.FC<Props> = ({ blocDetails, isModified, setIsModified }) => {
  const dispatch = useDispatch();

  const { loading, message } = useSelector(
    (state: RootState) => state.newBlocState
  );

  const [blocName, setBlocName] = useState("");
  const [subheading, setSubheading] = useState("");
  const [theme, setTheme] = useState(true);
  const [photo, setPhoto] = useState("/images/logo.png");
  const [binaryPhoto, setBinaryPhoto] = useState("");
  const [questionList, setQuestionList] = useState<any>([""]);

  React.useEffect(() => {
    setBlocName(blocDetails.name);
    setSubheading(blocDetails.subHeading);
    setTheme(blocDetails.isDark);
    if (blocDetails.photo !== "ByteArray" || blocDetails.photo !== "") {
      setPhoto(blocDetails.photo);
    }
    if (blocDetails?.sampleQuestions?.length > 0) {
      setQuestionList(blocDetails.sampleQuestions);
      dispatch(updateSampleQuestions(blocDetails.sampleQuestions));
    } else {
      dispatch(updateSampleQuestions([""]));
    }
  }, [blocDetails]);

  const token = getCookie("jwt");

  const handleUpdate = () => {
    const updatedBlocDetails = {
      // ...blocDetails,
      name: blocName,
      subHeading: subheading,
      isDark: theme,
      photo: photo,
      sampleQuestions: questionList,
    };
    setIsModified(false);
    dispatch(updateBloc(token, blocDetails.blocId, updatedBlocDetails));
  };

  useEffect(() => {
    if (message === "success") {
      showNotification("success", "Bloc Updated Successfully!");
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }

    if (message === "error") {
      showNotification("error", "Something went wrong!");
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [message]);

  return (
    <LayoutEffect
      className="duration-300 delay-50"
      isInviewState={{
        trueState: "opacity-1",
        falseState: "opacity-0",
      }}
    >
      <div className="w-full flex flex-col items-start justify-center gap-8">
        <HeaderComp
          blocName={blocName}
          setBlocName={setBlocName}
          subheading={subheading}
          setSubheading={setSubheading}
          theme={theme}
          setTheme={setTheme}
          photo={photo}
          setPhoto={setPhoto}
          isModified={isModified}
          setIsModified={setIsModified}
        />
        <SuggestedQuestionCont
          questionList={questionList}
          setQuestionList={setQuestionList}
          setIsModified={setIsModified}
        />
        <NewButton text={'Save Changes'} loading={loading} classProperty={`${loading ? "opacity-[0.7] cursor-not-allowed" : "opacity-[1] cursor-pointer "} px-[52px] my-[50px]`} buttonFunction={handleUpdate} />

      </div>
    </LayoutEffect>
  );
};

export default InterfaceContainer;
