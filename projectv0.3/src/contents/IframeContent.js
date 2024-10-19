import React from 'react';

function IframeContent({ src }) {
  return (
    <div>
      <iframe
        title="Embedded Content"
        src={src}
        width="100%"
        height="800px"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

export default IframeContent;
