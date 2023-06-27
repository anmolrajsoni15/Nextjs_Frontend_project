// import React from 'react'
// import UploadFileCard from './UploadFileCard'
// import AddUrl from './AddUrl'
// import IntegrationOption from './IntegrationOption'
// import { cookies } from 'next/headers'

// const getIntegrations = async (): Promise<any> => {
//     const token = cookies().get('jwt')?.value
  
//     console.log(token)
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/integrations`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-cache"
     
//     })
//     if (!res.ok) {
//       throw Error('Failed to fetch data')
//     }
    
//     return res.json()
//   }

// async function AddMore() {

//     const integrations = await getIntegrations()
//     console.log('integration info', integrations)

//     return (
//         <section className='py-8 space-y-10'>
//             <h2 className='text-3xl font-semibold'>Data Source </h2>
//             <article className=' flex flex-col items-center'>

//             </article>
//             <h2 className='text-3xl font-semibold'>Add more data source </h2>
//             <article className=' space-y-6 flex flex-col '>
//                 <div className='self-center'>
//                     <UploadFileCard />
//                 </div>
//                 <hr />
//                 <div className=''>
//                     <AddUrl />
//                 </div>
//                 {/* <hr />
//                 <div>
//                     <IntegrationOption />
//                 </div> */}

//             </article>

//         </section>
//     )
// }

// export default AddMore