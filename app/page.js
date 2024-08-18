"use client";
import React from "react";
import { useEffect } from "react";

export default function Home() {
  // useEffect(() =>{
  //   document.addEventListener('mousemove', (e) => {
     
  //   })
  // })
  const trackme = (e) =>{
    const cursor = document.querySelector('.cursor');
    cursor.style.display = 'block'
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
  }
  const leaveme = (e) =>{
    const cursor = document.querySelector('.cursor');
    cursor.style.display = 'none'
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
  }
  return (
    <main onMouseMove={trackme} onMouseLeave={leaveme} className="flex bg-black h-screen flex-col items-center justify-center p-24">
      <div id="sample">
        <h3 className="text-white font-bold text-3xl">I Like Black Color!</h3>
        <p className="text-gray-200 text-sm text-center">By Sarfaraz Unar</p>
        <div className="cursor"></div>
      </div>
    </main>
  );
}

