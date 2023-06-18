import React,{FC} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { DataSourceCardProps } from '../../lib/Types'

// interface dataSourcesProps {
//     imgURL: String;
//     linkURL: String;
//     linkText: String;
//     imgAlt: String;
//     title: String;
//     subtitle: String;
// }

const DataSourceCard:FC<DataSourceCardProps> = ({ imgURL, linkURL, linkText, imgAlt, title, subtitle }) => {
    return (
        <div className=' border-[1px] border-borderColor rounded-[20px] space-y-2 w-[24vw] px-4 py-4 mb-4'>
            <Image src={imgURL} width={30} height={30} alt={imgAlt} />
            <h3 className='text-2xl'>{title}</h3>
            <p className='text-xs'>{subtitle}</p>
            <div> <Link href={linkURL} >
                <Button className={''} text={linkText} />
            </Link>
            </div>
        </div>
    )
}

export default DataSourceCard