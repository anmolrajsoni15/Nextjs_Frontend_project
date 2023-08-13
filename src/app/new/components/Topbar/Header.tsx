import Image from 'next/image';
import React from 'react'
import BackButton from './BackButton';
import ShareButton from './ShareButton';
import TokenCard from './TokenCard';

interface Props {
    position: string;
    url: string;
    tokens: number;
}

const Header:React.FC<Props> = ({
    position,
    url,
    tokens
}) => {
  return (
    <div className="w-full py-8 px-12 flex items-center justify-between">
        <BackButton url={url} />
        <div className="flex items-center justify-center gap-10">
            {
                position === "outside" ? (
                    <ShareButton />
                ) : null
            }
            <TokenCard tokens={tokens} />
        </div>
    </div>
  )
}

export default Header