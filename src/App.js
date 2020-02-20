import React from "react";
import TopBar from "./components/TopBar";
import ImageContainer from "./components/ImagesContainer";
import axios from "axios";
function App() {
  const [localImage, getLocalImage] = React.useState(null);
  const [prevlocalImage, setprevLocalImage] = React.useState(null);
  const [url, fetchURL] = React.useState("");
  const [deviceWidth, setDeviceType] = React.useState(0);
  const [boundryBorders, setboundryBorders] = React.useState(false);
  const [regionNames, setregionNames] = React.useState(false);
  const [itemsLeft, setItemsLeft] = React.useState([
    //{ id: '1', x: 0, y: 10, width: 50, height: 25 }
  ]);
  const [itemsRight, setItemsRight] = React.useState([]);
  const [output, getOutput] = React.useState(null);
  React.useEffect(() => {
    if (localImage) {
      setprevLocalImage(localImage);
    }
  }, [localImage]);

  function handleSubmit(e) {
    e.preventDefault();
    if (url && prevlocalImage && deviceWidth && itemsRight.length !== 0) {
      // axios
      //   .post("http://localhost:8080/screenshot", {
      //     viewport_width: deviceWidth,
      //     mockups: {
      //       inputPath: prevlocalImage.name,

      //       componentRegion: itemsLeft
      //     },
      //     screenshot: {
      //       inputPath: url,
      //       componentRegion: itemsRight
      //     },
      //     outputConfig: {
      //       boundryBorders: true,
      //       regionNames: true
      //     }
      //   })
      //   .then(function(response) {
      //     getOutput(response);
      //   })
      //   .catch(function(error) {
      //     alert(error);
      //   });
      console.log({
        viewport_width: deviceWidth,
        mockups: {
          inputPath: prevlocalImage.name,

          componentRegion: itemsLeft
        },
        screenshot: {
          inputPath: url,
          componentRegion: itemsRight
        },
        outputConfig: {
          boundryBorders: boundryBorders,
          regionNames: regionNames
        }
      });
    } else {
      if (deviceWidth <= 0) {
        alert("Select device width");
      } else if (!prevlocalImage) {
        alert("Select image");
      } else if (url === "") {
        alert("Enter url");
      } else if (itemsRight.length === 0) {
        alert("You have not created any box");
      }
    }
  }

  return (
    <React.Fragment>
      <TopBar
        deviceType={deviceWidth}
        setDeviceType={setDeviceType}
        handleSubmit={handleSubmit}
        regionNames={regionNames}
        setregionNames={setregionNames}
        boundryBorders={boundryBorders}
        setboundryBorders={setboundryBorders}
      />
      <ImageContainer
        ImageUrl={url}
        prev={prevlocalImage}
        getLocalImage={getLocalImage}
        fetchURL={fetchURL}
        deviceWidth={deviceWidth}
        setDeviceType={setDeviceType}
        itemsLeft={itemsLeft}
        itemsRight={itemsRight}
        setItemsLeft={setItemsLeft}
        setItemsRight={setItemsRight}
      />
    </React.Fragment>
  );
}

export default App;
