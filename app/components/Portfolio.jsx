import Image from 'next/image'
import React from 'react'
import Buttonline from './Buttonline'

const Portfolio = () => {
    return (
            <div id='portfolio' className="flex flex-col items-center justify-center py-20 bg-gradient-to-tr from-gray-700/25 via-primary-900 to-gray-700/25 overflow-hidden">
                <h3 className="text-3xl lg:text-4xl font-bold lato text-white">
                    Our <span className="text-secondary-400">Portfolio!</span>
                </h3>
                <p className="text-center text-sm text-white mb-10 mt-2 raleway">Some shots of our  <span className='bg-secondary-500 text-black p-2'>Previous Work!</span></p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="grid gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" width={250} height={300} alt="" />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" width={250} height={300} />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" width={250} height={300} />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" width={250} height={300} />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" width={250} height={300} alt="" />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" width={250} height={300} alt="" />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" width={250} height={300} alt="" />
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Portfolio
