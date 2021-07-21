import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

import FileUpload from "../util/components/FileUpload";
import Image from "../util/components/Image";
import { ImageInterface, ServerSideImageInterface } from "../interfaces";

const Collage = ({ images }) => {
  const router = useRouter();
  const { uuid } = router.query;

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

  return (
    <Box>
      <FileUpload collageUUID={uuid} />
      <br />

      <div
        style={{
          //          display: "relative",
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
