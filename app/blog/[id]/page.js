"use client";

import useSWR from "swr";
import React from "react";
import Head from "next/head";
import Loading from "@/app/loading";
import public_fetcher from "@/app/lib/fetcher";

const Page = ({ params }) => {
  const { data, error, isLoading } = useSWR(`/api/blogs/${params.id}`, public_fetcher);

  const styles = {
    h1: "text-5xl font-bold text-gray-900 mb-4",
    h2: "text-4xl font-semibold text-gray-900 mb-2",
    h3: "text-3xl font-semibold text-gray-900 mb-2",
    p: "text-gray-700 mb-2",
    a: "text-primary-500 hover:text-primary-400",
  };

  // Function to replace HTML elements with custom styled ones
  const options = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const tagName = domNode.tagName.toLowerCase();
        const className = styles[tagName];

        if (className) {
          // Return the element with its children and className
          return React.createElement(
            tagName,
            { className },
            domNode.children.length > 0
              ? Array.from(domNode.childNodes).map((child, index) => {
                  // Recursively parse each child node
                  return typeof child === "string"
                    ? child
                    : parse(child.outerHTML || "", options);
                })
              : domNode.textContent
          );
        }
      }
    },
  };

  return (
    <>
      {error && (
        <p className="text-3xl text-white text-center py-10">{error.response.data.message}</p>
      )}
      {isLoading && <Loading />}
      {data && (
        <>
          <Head>
            <title>{data.data.blogTitle}</title>
            <meta name="description" content={data.data.blog_description} />
            <meta name="keywords" content={data.data.tags} />
          </Head>
          <div className="bg-noise flex flex-col">
            <section className="relative">
              <div className="absolute inset-0 bg-gray-900"></div>
              <div
                className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-12 md:py-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${data.data.blogImage})` }}
              >
                <div className="mx-auto w-full py-20">
                  <h2 className="text-3xl md:text-6xl font-bold text-center bg-gray-950/50 p-4 rounded-md text-white w-full leading-tight mb-5">
                    {data.data.blogTitle}
                    <br />
                    <span className="text-sm md:text-[25px] text-center text-white">
                      {new Date(data.data.createdAt).toLocaleDateString()}
                    </span>
                  </h2>
                </div>
              </div>
            </section>
            <section className="container mx-auto px-6 md:px-12 bg-gray-900">
              <div className="mx-auto max-w-md py-20 text-lg text-white">
                <div id="blogcontent" dangerouslySetInnerHTML={{__html: data.data.blogContent}}></div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
