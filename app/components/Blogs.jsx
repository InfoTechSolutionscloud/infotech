import Image from 'next/image'
import React from 'react'
import Buttonline from './Buttonline'

const Blogs = () => {

    const data = [
        {
            "title": "Unlocking the Power of AI",
            "description": "Explore the latest advancements in artificial intelligence and its potential to revolutionize industries.",
            "image": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
        },
        {
            "title": "The Future of Web Development",
            "description": "Stay up-to-date with the latest trends and technologies in web development, from PWA's to JavaScript frameworks.",
            "image": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
        },
        {
            "title": "The Art of Graphic Design",
            "description": "Discover the latest design trends, tips, and techniques to enhance your graphic design skills.",
            "image": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
        },
        {
            "title": "The Impact of Social Media",
            "description": "Understand the effects of social media on society, including its influence on mental health and relationships.",
            "image": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
        },
        {
            "title": "The World of Quantum Computing",
            "description": "Dive into the fascinating realm of quantum computing, including its applications and potential to solve complex problems.",
            "image": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
        },
        {
            "title": "The Evolution of Cybersecurity",
            "description": "Stay informed about the latest cybersecurity threats, technologies, and best practices to protect yourself online.",
            "image": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
        }
    ]


    return (
        <div>
            <section class="py-24 bg-gradient-to-tl from-gray-700/25 via-primary-900 to-gray-700/25">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl text-center py-2 pb-20 lg:text-4xl font-bold lato text-white">
                        Our Latest <span className="text-secondary-400">Blogs!</span>
                    </h3>
                    <div class="flex justify-center gap-4 flex-wrap ">
                        {data.map((item, index) =>{
                            return (

                            <div class="group w-1/4 border-2 border-primary-300 bg-white rounded-2xl">
                                <div class="flex items-center">
                                    <Image src={item.image} alt="blogs tailwind section" class="rounded-t-2xl w-full" width={200} height={200} />
                                </div>
                                <div class="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                                    <span class="text-primary-800 text-sm">Jan 01, 2023</span>
                                    <h4 class="text-lg text-gray-900 font-medium leading-tight mb-1">{item.title}</h4>
                                    <p class="text-gray-500 leading-tight mb-2">{item.description}</p>
                                    <a href="javascript:;" class="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</a>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Blogs
