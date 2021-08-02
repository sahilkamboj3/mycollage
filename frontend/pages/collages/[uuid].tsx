import {
  Box,
  Button,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import FileUpload from "../util/components/FileUpload";
import Image from "../util/components/Image";
import { ImageInterface, ServerSideImageInterface } from "../interfaces";
import { getUserUUID, prerenderAuthorizationCheck } from "../util/logic";
import { Alert } from "@material-ui/lab";
import { green, lightGreen } from "@material-ui/core/colors";
import { JAVA_BACKEND_SERVER } from "../../config";

const Collage = ({ images }) => {
  const router = useRouter();
  prerenderAuthorizationCheck(router);
  const { uuid } = router.query;
  const collageUUID = uuid;

  const [collageName, setCollageName] = useState<string>("");

  useEffect(() => {
    axios
      //.get(`http://localhost:8080/collage/collageName/${collageUUID}`)
      .get(`${JAVA_BACKEND_SERVER}/collage/collageName/${collageUUID}`)
      .then((res) => {
        setCollageName(res["data"]["collageName"]);
      });
  }, []);

  const parentRef = useRef<HTMLDivElement>();

  const [leftBound, setLeftBound] = useState<number>(0);
  const [rightBound, setRightBound] = useState<number>(0);
  const [bottomBound, setBottomBound] = useState<number>(0);
  const [topBound, setTopBound] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [screenHeight, setScreenHeight] = useState<number>();

  useEffect(() => {
    const rect = parentRef.current.getBoundingClientRect();
    setLeftBound(rect.left);
    setRightBound(rect.right);
    setBottomBound(rect.bottom);
    setTopBound(rect.top);
    setScreenWidth(screen.width);
    setScreenHeight(screen.height);
  }, []);

  // file upload logic
  const [isFileError, setIsFileError] = useState<boolean>(false);
  const [file, setFile] = useState(null);

  const imageTypes = ["png", "jpg", "jpeg"];

  const handleImageChange = (e) => {
    const fileName = e.target.files[0].name;
    const periodIdx = fileName.lastIndexOf(".");

    if (!imageTypes.includes(fileName.slice(periodIdx + 1).toLowerCase())) {
      setIsFileError(true);
      setFile(null);
      return;
    }
    setIsFileError(false);
    setFile(e.target.files[0]);
  };

  const submitImage = async () => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const userUUID: string = await getUserUUID();

      await axios.post(
        `http://localhost:8080/images/create/${userUUID}/${collageUUID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFile(null);
    }
  };

  const [updated, setUpdated] = useState(false);
  const greenTheme = createMuiTheme({
    palette: { primary: lightGreen, secondary: green },
  });

  /*
  useEffect(() => {
    if (updated) {
      
    }
  }, [updated]);
     */

  //      <FileUpload collageUUID={uuid} />
  return (
    <div className="wrapper collage">
      <MuiThemeProvider theme={greenTheme}>
        <Button
          disabled={!updated}
          variant="contained"
          color="primary"
          style={{ position: "absolute", right: "5vw" }}
        >
          Updated
        </Button>
      </MuiThemeProvider>
      <div className="collageContent">
        <h1>{collageName}</h1>
        <Button variant="contained" component="label">
          {file !== null && !isFileError
            ? file.name
            : isFileError
            ? "Invalid filetype"
            : "Choose Image"}
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        <Button
          disabled={isFileError || file == null}
          onClick={submitImage}
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
      </div>
      <Box>
        <br />
        <div
          style={{
            border: "1px solid black",
            width: "90vw",
            height: "90vh",
            margin: "auto",
          }}
          ref={parentRef}
        >
          {images.map((image) => (
            <Image
              key={image.uuid}
              {...image}
              topBound={topBound}
              bottomBound={bottomBound}
              rightBound={rightBound}
              leftBound={leftBound}
              screenWidth={screenWidth}
              screenHeight={screenHeight}
              updated={updated}
              setUpdated={setUpdated}
            />
          ))}
        </div>
      </Box>
    </div>
  );
};

export async function getServerSideProps(context) {
  // fetch images for this collage
  let images: ImageInterface[];

  //await fetch(`http://localhost:8080/images/getAll/${context.params.uuid}`, {
  await fetch(`${JAVA_BACKEND_SERVER}/images/getAll/${context.params.uuid}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      images = data.map((image: ServerSideImageInterface) => {
        return {
          id: image.imageID,
          uuid: image.imageUUID,
          collageUUID: image.projectUUID,
          url: image.imageURL,
          xPos: image.posX,
          yPos: image.posY,
          rot: image.rot,
          width: image.width,
          height: image.height,
          zIndex: image.zindex,
        } as ImageInterface;
      });
    });

  return {
    props: {
      images,
    },
  };
}

export default Collage;
