import React, { useState } from "react";
import TopBar from "./components/TopBar";
import ImageContainer from "./components/ImagesContainer";
function App() {
  const [localImage, getLocalImage] = useState(null);
  const [prevlocalImage, setprevLocalImage] = useState(null);
  const [url, fetchURL] = useState("");
  //const [imageWidht, setImageWidth] = useState(1200);
  React.useEffect(() => {
    if (localImage) {
      setprevLocalImage(localImage);
    }
  }, [localImage]);

  return (
    <React.Fragment>
      <TopBar />
      <ImageContainer
        ImageUrl={url}
        prev={prevlocalImage}
        getLocalImage={getLocalImage}
        fetchURL={fetchURL}
      />
    </React.Fragment>
  );
}

export default App;
