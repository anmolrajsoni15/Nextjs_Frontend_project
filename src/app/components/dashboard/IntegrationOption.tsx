import React from 'react'
import IntegrationCard from './IntegrationCard'


const IntegrationOption = () => {

    const integrations = [
        {
            imgUrl: '/dashboard/gDrive.svg',
            title: 'Google Drive ',
            text: 'Streamline software projects, sprints, and bug tracking.',
            alt:"Google Drive"
        },
        {
            imgUrl: '/dashboard/notion.svg',
            title: 'Notion',
            text: 'Integrated with everything in Notion.',
            alt :"Notion"
        },
        {
            imgUrl: '/dashboard/slack.svg',
            title: 'Slack',
            text: 'All messages will be imported.',
            alt:'Slack'
        },
        {
            imgUrl: '/dashboard/figma.svg',
            title: 'Figma',
            text: 'Transform the way you work with Figma projects through a seamless integration!',
            alt:'Figma'
        },

    ]

    
  return (
    <div>
        <div className='flex justify-between w-[80vw] flex-wrap'>
                {integrations.map((item, index) => {
                    return   <IntegrationCard key={index}  imgUrl={item.imgUrl} title={item.title} text={item.text} imgAlt={item.alt} />
                })
                }
            </div>
    </div>
  )
}

export default IntegrationOption