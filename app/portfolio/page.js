import React from 'react';
import Portfolio from '../components/Portfolio';
import CustomHead from '../components/CustomHead';

const page = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/portfolio`;

  // Function to handle PDF download
  const handleDownload = () => {
    const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL}/path-to-your-pdf-file.pdf`; // Replace with the actual path to your PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Portfolio.pdf'; // The name of the downloaded file
    link.click();
  };

  return (
    <>
      <CustomHead
        title={"Portfolio - Infotech"}
        description={
          "Explore our portfolio to see how we have helped numerous businesses achieve their goals with our web development, digital marketing, IT consulting, software development, and other technology solutions."
        }
        keywords={
          "portfolio, web development company, digital marketing agency, IT consulting services, software development company, technology solutions, innovative solutions, real results"
        }
        fullUrl={fullUrl}
      />
      <div className="bg-black">
        <Portfolio
          titleSimple={"Here are our "}
          hititle={"Portfolio!"}
          tagline={"Find the best that accelerate your "}
          hitagline={"Business!"}
          animate={false}
        />
        {/* PDF Download Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
