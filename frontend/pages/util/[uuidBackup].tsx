import { Box } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import FileUpload from "../util/components/FileUpload";
import Image from "../util/components/ImageBackup";
import { ImageInterface, ServerSideImageInterface } from "../interfaces";
import { prerenderAuthorizationCheck } from "../util/logic";

const Collage = ({ images }) => {
  const router = useRouter();
  const { collageUUID } = router.query;

  prerenderAuthorizationCheck(router);

  const canvasRef = useRef<HTMLDivElement>();

  const [leftBound, setLeftBound] = useState<number>(0);
  const [rightBound, setRightBound] = useState<number>(0);
  const [bottomBound, setBottomBound] = useState<number>(0);
  const [topBound, setTopBound] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    setLeftBound(rect.left);
    setRightBound(rect.right);
    setBottomBound(rect.bottom);
    setTopBound(rect.top);
    setScreenWidth(screen.width);
    setScreenHeight(screen.height);
  }, []);

  console.log("screen width", screenWidth);
  console.log("screen height", screenHeight);

  return (
    <Box>
      <FileUpload />
      <br />

      <div
        style={{
          display: "relative",
          position: "relative",
          border: "1px solid black",
          width: "90vw",
          height: "90vh",
          margin: "auto",
        }}
        ref={canvasRef}
      >
        {images.map((image: ImageInterface) => (
          <Image
            key={image.uuid}
            {...image}
            width={image.width * screenWidth}
            height={image.height * screenHeight}
            topBound={topBound}
            bottomBound={bottomBound}
            rightBound={rightBound}
            leftBound={leftBound}
            screenHeight={screenHeight}
            screenWidth={screenWidth}
          />
        ))}
      </div>
    </Box>
  );
};

export async function getServerSideProps(context) {
  // fetch images for this collage
  let images: ImageInterface[];

  await fetch(`http://localhost:8080/images/getAll/${context.params.uuid}`, {
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
