import React, { useState } from "react";
import TopBar from "./components/TopBar";
import ImageContainer from "./components/ImagesContainer";
import axios from "axios";
function App() {
  const [localImage, getLocalImage] = useState(null);
  const [prevlocalImage, setprevLocalImage] = useState(null);
  const [url, fetchURL] = useState("");
  const [deviceWidth, setDeviceType] = useState(0);
  //console.log(deviceWidth);
  React.useEffect(() => {
    if (localImage) {
      setprevLocalImage(localImage);
    }
  }, [localImage]);

  /*function handleSubmit(e) {
    e.preventDefault();

    if (url && prevlocalImage && imageWidth) {
      axios
        .post(
          "http://localhost:8080/screenshot",
          {
            url: url,
            viewport_width: deviceWidth,
            image_name: props.prev.name
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(function(response) {
          props.fetchURL(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      if (url === "") {
        alert("Enter url");
      }
      if (!props.prev) {
        alert("Select image");
      }
    }
  }*/
  return (
    <React.Fragment>
      <TopBar deviceType={deviceWidth} setDeviceType={setDeviceType} />
      <ImageContainer
        ImageUrl={url}
        prev={prevlocalImage}
        getLocalImage={getLocalImage}
        fetchURL={fetchURL}
        deviceWidth={deviceWidth}
      />
    </React.Fragment>
  );
}

export default App;
