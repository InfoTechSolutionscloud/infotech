// app/not-found.tsx
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section class="bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-500">404</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Something's missing.</p>
            <p class="mb-4 text-lg font-light text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <Link href="/" class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 px-3 py-2 rounded-md focus:outline-none focus:ring-primary-900 my-4">Back to Homepage</Link>
        </div>   
    </div>
</section>
  );
}
