"use client";
import Image from 'next/image';
import React from 'react';

const Share = ({ title, description, url }) => {
    const handleShare = (type) => {
        let shareUrl = '';
        const encodedTitle = encodeURIComponent(title);
        const encodedDescription = encodeURIComponent(description);
        const encodedUrl = encodeURIComponent(url);

        switch (type) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'reddit':
                shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}%20${encodedDescription}%20${encodedUrl}`;
                break;
            default:
                break;
        }

        window.open(shareUrl, '_blank');
    };

    
    const handleCopy = (e) => {
        navigator.clipboard.writeText(location.href);
        e.target.innerText = "Copied!";
    };
    
    return (
        <div className="flex flex-row space-x-2 py-2 border border-gray-700 rounded-md justify-center items-center">
            <h6 className='text-white font-semibold px-3 hidden md:block'>Share with Friends: </h6>
            <button onClick={(e) => handleCopy(e)} className="bg-gray-300 hover:bg-gray-100 px-2 py-1 rounded-md text-gray-900">
               Copy Url
            </button>
            <button onClick={() => handleShare('whatsapp')} >
                <Image src="https://www.svgrepo.com/show/358411/whatsapp-alt.svg" alt="whatsapp" className='filter invert'  width={40} height={40} />
            </button>
            <button onClick={() => handleShare('facebook')} >
                <Image src="https://www.svgrepo.com/show/503338/facebook.svg" alt="facebook" className='filter invert'  width={40} height={40} />
            </button>
            <button onClick={() => handleShare('reddit')} >
                <Image src="https://www.svgrepo.com/show/473769/reddit.svg" alt="reddit" className='filter invert'  width={40} height={40} />
            </button>
            <button onClick={() => handleShare('twitter')} >
                <Image src="https://www.svgrepo.com/show/494287/twitter-round.svg" alt="twitter" className='filter invert'  width={40} height={40} />
            </button>
        </div>
    );
};

export default Share;
