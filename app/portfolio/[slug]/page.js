import CustomHead from '@/app/components/CustomHead';
import GetPortfolio from '@/app/components/GetPortfolio';
import Share from '@/app/components/Share';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ params }) => {

    let data = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio?slug=${params.slug}`, {
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
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/portfolio/${params.slug}`;


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
                    <CustomHead title={data.portfolio.title} description={data.portfolio.short_description} keywords={data.portfolio.keywords} image={data.portfolio.image} fullUrl={fullUrl} />

                    <div className="bg-gray-900">
                        <div className="bg-gradient-to-br from-gray-950/55 via-primary-950 to-gray-900/60 w-full py-10">
                            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 p-5 md:p-10">
                                {/* Service Image */}
                                <div className="w-full md:w-1/2 flex justify-center">
                                    <Image
                                        src={data.portfolio.image}
                                        width={500}
                                        height={500}
                                        className="rounded-md object-cover"
                                        alt={`${data.portfolio.title} image`}
                                    />
                                </div>
                                {/* Portfolio Details */}
                                <div id="portfolio-details" className="w-full md:w-3/4 text-center md:text-left p-5 md:p-10">
                                    <h1 className="text-4xl merriweather font-bold text-white pb-4">
                                        {data.portfolio.title}
                                    </h1>
                                    <p className="raleway pb-4 text-gray-400">
                                        {data.portfolio.short_description}
                                    </p>
                                        <Link 
  href="https://api.whatsapp.com/send?phone=923282296963&text=Hello!%20I%20want%20to%20know%20more%20about%20your%20services." 
  className="bg-secondary-600 rounded-md text-white px-6 py-3 inline-block"
  target="_blank" 
  rel="noopener noreferrer"
>
  WhatsApp Us
</Link>
                                </div>
                            </div>
                            <section className="container mx-auto px-6 md:px-12">
                                {/* Portfolio Description */}
                                <div className="mx-auto max-w-2xl py-10 md:py-20 text-lg text-white leading-relaxed">
                                    <div id="blogcontent" dangerouslySetInnerHTML={{ __html: data.portfolio.description }}></div>
                                </div>
                                {/* Share Component */}
                                <Share
                                    title={`Explore Infotech's ${data.portfolio.title} service`}
                                    description={data.portfolio.description}
                                    url={fullUrl}
                                />
                            </section>
                            {/* Get Portfolio Component */}
                            <GetPortfolio portfolioText={data.portfolio.title} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default page

