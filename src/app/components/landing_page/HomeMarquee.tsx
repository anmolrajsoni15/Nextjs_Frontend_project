import React from 'react'
import Marquee from "react-fast-marquee"
import Image from 'next/image'

const HomeMarquee = () => {
  return (
    <Marquee gradient={true} gradientColor={[24, 24, 24]} gradientWidth={200} >
        <div className='flex items-center justify-center gap-12'>

        <Image src="/companies/saasden.svg" alt="saasden" width={193} height={44} />
        <Image src="/companies/stackwalls.svg" alt="stackwalls" width={193} height={50} />
        <Image src="/companies/MediaGroww.svg" alt="MediaGroww" width={202} height={36} />
        <Image src="/companies/mewt.svg" alt="mewt" width={146} height={44} />
        <Image src="/companies/Dehradun.svg" alt="Dehradun" width={146} height={45} />
        <Image src="/companies/truemaths.svg" alt="Dehradun" width={226} height={52} />
        </div>
    </Marquee>
  )
}

export default HomeMarquee