import React from 'react';

const Page1 = () => {
  const pdfUrl = "https://rmuttcpethesis.com/ProjectC03/api/lesson_storage//Cyber-Security_0011.pdf";

  return (
    <div>
      <h1>PDF Viewer</h1>
      <iframe
        src={pdfUrl}
        width="100%"
        height="600px"
        title="PDF Viewer"
      />
    </div>
  );
};

export default Page1;
