import CustomHead from '@/app/components/CustomHead';
import GetService from '@/app/components/GetService';
import Share from '@/app/components/Share';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ params }) => {

    let data = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service?slug=${params.slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      const jsonData = await res.json();
      data = jsonData;
    }
    if(res.status == 404){
      return <NotFound />
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }

  if (!data) {
    return <Loading />;
  }
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/services/${params.slug}`;


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
            {data && (
                <>
                    <CustomHead title={data.service.title} description={data.service.short_description} keywords={data.service.keywords} image={data.service.image} fullUrl={fullUrl} />

                    <div className="bg-gray-900">
                        <div className="bg-gradient-to-br from-gray-950/55 via-primary-950 to-gray-900/60 w-full py-10">
                            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 p-5 md:p-10">
                                {/* Service Image */}
                                <div className="w-full md:w-1/2 flex justify-center">
                                    <Image
                                        src={data.service.image}
                                        width={500}
                                        height={500}
                                        className="rounded-md object-cover"
                                        alt={`${data.service.title} image`}
                                    />
                                </div>
                                {/* Service Details */}
                                <div id="service-details" className="w-full md:w-3/4 text-center md:text-left p-5 md:p-10">
                                    <h1 className="text-4xl merriweather font-bold text-white pb-4">
                                        {data.service.title}
                                    </h1>
                                    <p className="raleway pb-4 text-gray-400">
                                        {data.service.short_description}
                                    </p>
                                    <Link href="#serviceform" className="bg-secondary-600 rounded-md text-white px-6 py-3 inline-block">
                                        Get a Quote
                                    </Link>
                                </div>
                            </div>
                            <section className="container mx-auto px-6 md:px-12">
                                {/* Service Description */}
                                <div className="mx-auto max-w-2xl py-10 md:py-20 text-lg text-white leading-relaxed">
                                    <div id="blogcontent" dangerouslySetInnerHTML={{ __html: data.service.description }}></div>
                                </div>
                                {/* Share Component */}
                                <Share
                                    title={`Explore Infotech's ${data.service.title} service`}
                                    description={data.service.description}
                                    url={fullUrl}
                                />
                            </section>
                            {/* Get Service Component */}
                            <GetService serviceText={data.service.title} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default page
