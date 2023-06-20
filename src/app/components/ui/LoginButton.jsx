"use client";
import Image from "next/image";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "src/app/Firebase/firebaseConfig";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { createUser, loginUser } from "../../Redux/Actions/userAction";

// import Cookies from 'js-cookie'


const LoginButton = ({ text }) => {

    const router = useRouter()

    const provider = new GoogleAuthProvider()

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            console.log('it is happening')
            var user = result.user


            var userDetail = JSON.stringify({
                'userId': user.uid,
                'name': user.displayName,
                'email': user.email,
                'credits': 50,
                'photo': user.photoURL,
            })

            var credentials ={
                'username': user.email,
                'password': user.uid
            }

            // const token = jwt.sign({ email: user.email, uid: user.uid }, "hi");

            // setCookie('jwt', token);

            // const asyncLocalStorage = {
            //     setItem: async function (key, token) {
            //         await null;
            //         return localStorage.setItem("jwt", token);
            //     },
            //     getItem: async function (key) {
            //         await null;
            //         return localStorage.getItem('jwt');
            //     }
            // };

            // asyncLocalStorage.setItem("jwt", token)


            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: userDetail,
            })

            if (res.status == 200) {
                const result = await res.json()
                console.log(result)

                try {

                    const formData = new FormData();
                    formData.append('username', credentials.username);
                    formData.append('password', credentials.password);


                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
                        method: 'POST',
                        body: formData,
                    })

                    if (!res.ok) {
                        console.log('Network Response for Login was not ok!')
                    }

                    if (res.ok) {

                        const response = await res.json()
                        console.log('login response: ', response)
                        setCookie('jwt',response.access_token)
                        setCookie('user', user.email);
                        router.push('/onboarding');
                    }
                }

                catch (error) {
                    console.log(error)
                }
            }
            if (res.status == 400) {
                console.log('Network Request for get user was 400!')
                // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
                //     method: 'GET',
                //     headers: {
                //         headers: { 'Authorization': `Bearer ${token}` }
                //     }
                // }
                // )
                // if (!res.ok) {
                //     throw new Error('Network Response for get user was not ok!')
                // }

                // if (res.ok) {
                //     const result = await res.json()

                try {

                    const formData = new FormData();
                    formData.append('username', credentials.username);
                    formData.append('password', credentials.password);

                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
                        method: 'POST',
                        body: formData,
                        // headers: {
                        //     "Content-Type": "application/x-www-form-urlencoded",
                        //   },
                    })

                    if (!res.ok) {
                        console.log('Network Response for Login was not ok!')
                    }

                    if (res.ok) {
                        const response = await res.json()
                        console.log('login response: ', response)
                        setCookie('user', user.email);
                        setCookie('jwt',response.access_token)
                        router.push('/dashboard');
                    }
                }

                catch (error) {
                    console.log(error)
                }

                // }

            }
            else if (!res.ok) {
                throw new Error('Network Response for add user was not ok!')
            }

        }
        catch (error) {
            console.log(error, 'err')
        }
    }
    return (
        <div className="flex justify-center font-medium text-sm" onClick={handleLogin}>
            <div className=" my-4 border rounded-full sm:py-2 py-2 w-fit sm:px-6 px-4 flex flex-row items-center 
                bg-[#28A1FF] border-gray-600 hover:border-[#85BCE5] cursor-pointer"
            >
                <div className="h-6 w-6 sm:w-8 sm:h-8 relative">
                    <Image src="landing_images/google.svg"
                        alt="Google Logo"
                        className='object-cover'
                        fill
                    />
                </div>
                <div className="sm:w-4 w-2">  </div>
                <div className="sm:font-medium text-base " >{text}</div>
            </div>
        </div>
    )
}

export default LoginButton