"use client";
import axios from 'axios';
import React from 'react'
import Markdown from 'react-markdown';
import Head from 'next/head';
import Loading from '@/app/loading';

const page = ({ params }) => {
  const { id } = params;

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/blogs/' + id);
        if (response.status == 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id])

  const styles = {
    h1: 'text-5xl font-bold text-gray-900 mb-4',
    h2: 'text-4xl font-semibold text-gray-900 mb-2',
    h3: 'text-3xl font-semibold text-gray-900 mb-2',
    p: 'text-gray-700 mb-2',
    a: 'text-primary-500 hover:text-primary-400',
  }
  return (
    <>
      <Head>
        <title>{data.blogTitle}</title>
        <meta name="description" content={data.blog_description} />
        <meta name="keywords" content={data.tags} />
      </Head>
      {!data.blogImage && (
        <Loading />
      )}
      {data.blogImage && (
        <div className="bg-noise flex flex-col">
          <section className="relative">
            <div className="absolute inset-0  bg-gray-900"></div>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-12 md:py-32 bg-cover bg-center" style={{ backgroundImage: `url(${data.blogImage})` }}>
              <div className="mx-auto w-full py-20">
                <h2 className="text-3xl md:text-6xl font-bold text-center bg-gray-950/50 p-4 rounded-md text-white w-full leading-tight mb-5">
                  {data.blogTitle}
                  <br />
                  <span className='text-sm md:text-[25px] text-center text-white'>Created By {data.createdBy} <br /> on {new Date(data.createdAt).toLocaleDateString()}</span>
                </h2>
              </div>
            </div>
          </section>
          <section className="container mx-auto px-6 md:px-12 bg-gray-900">
            <div className="mx-auto max-w-md py-20 text-lg text-white">
              <div className={styles}>
                <Markdown>{data.blogContent}</Markdown>
              </div>
            </div>
          </section>
        </div>

      )
      }
    </>
  )
}

export default page