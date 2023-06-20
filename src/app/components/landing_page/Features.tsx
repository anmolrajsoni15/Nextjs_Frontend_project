import React from 'react'
import FeatureDetails from './FeatureDetails'

interface Props {
    featuresData: Array<{
        icon: string;
        title: string;
        desc: string;
    }>
}

const Features: React.FC<Props> = ({featuresData}) => {
  return (
    <div className="w-[85%] grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:mb-16 md:gap-x-0 lg:gap-y-10 lg:gap-x-7">
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className={` w-full `}
        >
          <FeatureDetails
            icon={feature.icon}
            title={feature.title}
            desc={feature.desc}
          />
        </div>
      ))}
    </div>
  )
}

export default Features