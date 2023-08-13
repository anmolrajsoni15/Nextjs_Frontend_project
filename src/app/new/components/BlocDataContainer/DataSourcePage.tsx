'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { getCookie } from 'cookies-next';
import { getAllIntegrationOfBloc } from '../../../services/apiServices';
import DataSources from '../DataSources';
import LayoutEffect from 'src/app/components/LayoutEffect';
import NewButton from '../../../components/common/NewButtton';
import { useRouter } from 'next/navigation';
import Modal from "react-modal";
import MainPage from '../AddMoreData/MainPage'

interface Props {
    blocId: string
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    border: "1.75px solid rgba(0, 0, 0, 0.83)",
    borderRadius: "10px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
    transition: "opacity 0.3s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 0.3s ease-in-out",
  },
};

const DataSourcePage:React.FC<Props> = ({blocId}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const allIntegrations = useSelector(
        (state: RootState) => state.newBlocState.allIntegrations
    );

    const [websites, setWebsites] = useState<any>([]);
  const [files, setFiles] = useState<any>([]);
  const [others, setOthers] = useState<any>([]);

  const userToken = getCookie("jwt");

  useEffect(() => {
    if (allIntegrations.length > 0) {
      setWebsites([]);
      setFiles([]);
      setOthers([]);
      allIntegrations.length > 0 &&
        allIntegrations?.forEach((item: any) => {
          if (item.type === "website") {
            setWebsites((prev: any) => [...prev, item]);
          }
          if (item.type === "file") {
            setFiles((prev: any) => [...prev, item]);
          } else if(item.type !== "website" && item.type !== "file"){
            setOthers((prev: any) => [...prev, item]);
          }
        });
    }
  }, [allIntegrations]);

  useEffect(() => {
    dispatch(getAllIntegrationOfBloc(blocId, userToken));
    const interval = setInterval(() => {
      dispatch(getAllIntegrationOfBloc(blocId, userToken));
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const buttonFunction = () => {
    // router.push(`/new/dashboard`);
    openModal();
  }

  return (
    <LayoutEffect
        className="duration-300 delay-50"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
        <div className='w-full flex flex-col items-start justify-center gap-28'>
            <DataSources website={websites} file={files} other={others} />
            <NewButton text={'Add More Data'} loading={false} classProperty='px-[52px]' buttonFunction={buttonFunction} />
            <Modal
            isOpen={modalIsOpen}
            //   onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Bloc Name"
            ariaHideApp={false}
            onAfterOpen={() => {
              customStyles.content.opacity = 1;
              customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.8)";
            }}
            onAfterClose={() => {
              customStyles.content.opacity = 0;
              customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
            }}
          >
            <MainPage blocId={blocId} closeModal={closeModal} />
          </Modal>
        </div>
    </LayoutEffect>
  )
}

export default DataSourcePage