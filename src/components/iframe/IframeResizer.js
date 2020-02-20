import React, { useRef, useState } from "react";
import IframeResizer from "iframe-resizer-react";

export default () => {
  const iframeRef = useRef(null);
  const [messageData, setMessageData] = useState();

  const onResized = data => setMessageData(data);

  const onMessage = data => {
    setMessageData(data);
    iframeRef.current.sendMessage("Hello back from the parent page");
  };

  return (
    <>
      <IframeResizer
        forwardRef={iframeRef}
        heightCalculationMethod="lowestElement"
        inPageLinks
        log
        onMessage={onMessage}
        onResized={onResized}
        id={1}
        src="https://www.youtube.com/embed/qWPVTGV6uoM"
        style={{ width: "1px", minWidth: "100%" }}
      />
      {console.log(messageData)} />
    </>
  );
};
