'use client'

import React, { useState } from 'react'
import LayoutEffect from '../../../../components/LayoutEffect'
import ConversationalCont from './ConversationalCont';
import TechnicalCont from './TechnicalCont';
import { useDispatch, useSelector } from 'react-redux';
import { updateBloc } from 'src/app/services/apiServices';
import { getCookie } from 'cookies-next';
import { showNotification } from 'src/app/Notifications/NotificationManager';
import { clearMessage } from 'src/app/Redux/features/blocSlice';
import { RootState } from 'src/app/Redux/store';
import NewButton from 'src/app/components/common/NewButtton';

interface Props{
    blocDetails: any,
    isModified: boolean,
    setIsModified: any
}

const GeneralContainer:React.FC<Props> = ({blocDetails, isModified, setIsModified}) => {
  const dispatch = useDispatch();

  const { loading, message } = useSelector(
    (state: RootState) => state.newBlocState
  );

    const [baseprompt, setBaseprompt] = useState("");
  const [initialmessage, setInitialmessage] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [openaimodel, setOpenaimodel] = useState("");
  const [ispublic, setIspublic] = useState(false);

    React.useEffect(() => {
        if(blocDetails){
            setBaseprompt(blocDetails.basePrompt);
      setInitialmessage(blocDetails.initialMessage);
      setSupportMessage(blocDetails.supportMessage);
      setOpenaimodel(blocDetails.openAiModel);
      setIspublic(blocDetails.isPublic);
        }
    }, [blocDetails])

    const token = getCookie("jwt");

    const handleUpdate = () => {
      const updatedBlocDetails = {
        basePrompt: baseprompt,
        initialMessage: initialmessage,
        supportMessage: supportMessage,
        openAiModel: openaimodel,
        isPublic: ispublic,
      };

      setIsModified(false);
      dispatch(updateBloc(token, blocDetails.blocId, updatedBlocDetails));
    };

    React.useEffect(() => {
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
        <div className='w-full flex flex-col items-start justify-center gap-8' >
          <ConversationalCont 
            initialmessage={initialmessage} 
            setInitialmessage={setInitialmessage}  
            supportMessage={supportMessage}
            setSupportMessage={setSupportMessage}
            setIsModified={setIsModified}
          />
          <TechnicalCont 
            ispublic={ispublic} 
            setIspublic={setIspublic} 
            openaimodel={openaimodel} 
            setOpenaimodel={setOpenaimodel} 
            baseprompt={baseprompt}
            setBaseprompt={setBaseprompt}
            setIsModified={setIsModified} 
          />
          <NewButton text={'Save Changes'} loading={loading} classProperty={`${loading ? "opacity-[0.7] cursor-not-allowed" : "opacity-[1] cursor-pointer "} px-[52px] my-[50px]`} buttonFunction={handleUpdate} />

        </div>

    </LayoutEffect>
  )
}

export default GeneralContainer