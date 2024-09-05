import React from 'react'
import Head from "next/head";


const CustomHead = ({title, description, keywords, image, fullUrl, contentType, author}) => {
  return (
    <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(',') : keywords} />
    
    {/* Open Graph Meta Tags */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}
    {fullUrl && <meta property="og:url" content={fullUrl} />}
    {contentType && <meta property="og:type" content={contentType} /> }
    {author && <meta name="author" content={author} />}
    
    {/* Twitter Meta Tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:url" content={fullUrl} />
  </Head>
  )
}

export default CustomHead
