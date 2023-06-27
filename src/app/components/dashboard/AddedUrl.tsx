import React from 'react'



const AddedUrl = ({webUrl,key}:any) => {

    const clear = async ()=>{
        
    }

  return (
    <div className='flex col'>
       <div>{webUrl}</div> 
       <button onClick = {clear}>Delete</button >
    </div>
  )
}

export default AddedUrl