import React from "react";
import Share from "@/app/components/Share";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import { metadata as baseMeta } from '../../layout'


export const metadata = {
    ...baseMeta,
    title: "",
    description: "",
    openGraph: {
      ...baseMeta.openGraph,
      title: "",
      description: "",
      images: [],
      url: ``,
    },
    alternates: {
      canonical: ``,
    },
  };

const Page = async ({ params }) => {
  let data = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const jsonData = await res.json();
      data = jsonData.data;
      metadata.title = data.blogTitle + " - InfoTech";
      metadata.description = data.blog_description;
      metadata.openGraph.title = data.blogTitle + " - InfoTech";
      metadata.openGraph.description = data.blog_description;
      metadata.openGraph.images[0].url = data.blogImage;
      metadata.openGraph.url = `${process.env.NEXT_PUBLIC_API_URL}/blog/${params.id}`;
      metadata.alternates.canonical = `${process.env.NEXT_PUBLIC_API_URL}/blog/${params.id}`;
    }
    if(res.status == 404){
      return <NotFound />
    }
  } catch (error) {
    console.error('Error fetching data:', error.status);
  }

  if (!data) {
    return <Loading />;
  }
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog/${params.id}`;
  return (
    <>

      <div className="bg-noise flex flex-col">
        <section className="relative">
          <div className="absolute inset-0 bg-gray-900"></div>
          <div
            className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-12 md:py-32 bg-cover bg-center"
            style={{ backgroundImage: `url(${data.blogImage})` }}
          >
            <div className="mx-auto w-full py-20">
              <h2 className="text-3xl md:text-6xl font-bold text-center bg-gray-950/50 p-4 rounded-md text-white w-full leading-tight mb-5">
                {data.blogTitle}
                <br />
                <span className="text-sm md:text-[15px] text-center text-white">
                  {new Date(data.createdAt).toLocaleDateString()}
                </span>
              </h2>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-6 md:px-12 bg-gray-900">
          <div className="mx-auto w-full  py-5 md:py-20 px-2 md:px-10 text-lg text-white">
            <div id="blogcontent" dangerouslySetInnerHTML={{ __html: data.blogContent }}></div>
          </div>
          <Share title={`Read Best Blog ${data.blogTitle}`} description={data.blog_description} url={typeof window !== "undefined" ? window.location.href : ""} />
        </section>
      </div>
    </>
  );
};

export default Page;
