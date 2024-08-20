import Link from 'next/link'
import React from 'react'

const Buttonline = ({ title, link}) => {
    return (
        <div className="relative group">
            <hr className="border-b border-gray-400" />
            <Link href={link} className={`bg-secondary-800 border border-transparent group-hover:bg-primary-600 absolute -bottom-[20px] left-[45%] group-hover:shadow-2xl group-hover:shadow-primary-400 text-white rounded-full py-2 px-4`}>{title}</Link>
        </div>
    )
}

export default Buttonline
