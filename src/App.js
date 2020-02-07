import React, { useState } from "react";
import TopBar from "./components/TopBar";
import ImageContainer from "./components/ImagesContainer";
function App() {
  const [localImage, getLocalImage] = useState(null);
  const [prevlocalImage, setprevLocalImage] = useState(null);
  const [url, fetchURL] = useState("");

  React.useEffect(() => {
    if (localImage) {
      setprevLocalImage(localImage);
    }
  }, [localImage]);

  return (
    <React.Fragment>
      <TopBar
        getLocalImage={getLocalImage}
        prev={prevlocalImage}
        fetchURL={fetchURL}
      />
      <ImageContainer ImageUrl={url} prev={prevlocalImage} />
    </React.Fragment>
  );
}

export default App;
