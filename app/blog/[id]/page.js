"use client";
import axios from 'axios';
import React from 'react'
import Markdown from 'react-markdown';

const page = ({params}) => {
    const {id} = params;

    const [data, setData] = React.useState({});

    React.useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('/api/blogs/' + id);
                if(response.status == 200){
                    console.log(response.data);
                    setData(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    },[id])
    
    const styles = {
        h1: 'text-5xl font-bold text-gray-900 mb-4',
        h2: 'text-4xl font-semibold text-gray-900 mb-2',
        h3: 'text-3xl font-semibold text-gray-900 mb-2',
        p: 'text-gray-700 mb-2',
        a: 'text-primary-500 hover:text-primary-400',
    }
  return (
    <div className="bg-noise flex flex-col min-h-screen">
      <section className="relative">
        <div className="absolute inset-0  bg-gray-900"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="mx-auto max-w-md py-20">
            <h2 className="text-6xl font-bold text-white w-full leading-tight mb-5">
              {data.blogTitle}
            </h2>
          </div>
          <div className="bg-cover h-96 rounded-md" style={{backgroundImage: `url(${data.blogImage})`}}></div>
        </div>
      </section>
      <section className="container mx-auto px-6 md:px-12 bg-gray-900">
        <div className="mx-auto max-w-md py-20 text-lg text-white">
          <Markdown className={styles}>{data.blogContent}</Markdown>
        </div>
      </section>
    </div>
  )
}

export default page
