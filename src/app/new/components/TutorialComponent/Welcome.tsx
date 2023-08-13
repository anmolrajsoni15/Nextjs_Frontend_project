import { setCookie } from 'cookies-next';
import React from 'react'

interface Props {
    onWelcome: () => void,
    onQuit: () => void,
}

const Welcome: React.FC<Props> = ({onWelcome, onQuit}) => {

    const dones = () => {
        
    }

  return (
    <div className="fixed z-[2000] top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
      <div className="p-6 bg-[#232323] rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Welcome to the Dashboard!</h2>
        <p>Click the &quot;Get Started&quot; button to begin the tutorial.</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={onWelcome}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Welcome