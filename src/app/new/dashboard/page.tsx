'use client'

import React, { useEffect } from 'react'
import Sidebar from "../components/Sidebar";
import MainLoading from '../components/MainLoading'
import Loading from '../components/LoadingContainer/Loading'
import Container from "../components/Container";
import { getCookie } from 'cookies-next';
import { getUser } from '../../services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { refreshBloc } from 'src/app/Redux/features/blocSlice';

const NewDashboard = () => {
  const dispatch = useDispatch();
    // const [user, setUser] = React.useState<any>({});
    const {user, loading} = useSelector((state: RootState) => state.user);

    const token = getCookie('jwt');
    useEffect(() => {
        async function fetchData() {
            dispatch(getUser(token));
            // setUser(res);
        }
        fetchData();
        dispatch(refreshBloc());

    }, [])
  return (
    <div>
    {
      loading ? <Loading /> : (
        <main className='w-full h-full flex' id='my-container'>
        <Sidebar userData={user} />
        <Container userData={user} />
    </main>
      )
    }
    </div>
  )
}

export default NewDashboard