import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

import FileUpload from "../util/components/FileUpload";
import Image from "../util/components/Image";
import { ImageInterface } from "../interfaces";

const Collage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const parentRef = useRef<HTMLDivElement>();

  const [leftBound, setLeftBound] = useState<number>(0);
  const [rightBound, setRightBound] = useState<number>(0);
  const [bottomBound, setBottomBound] = useState<number>(0);
  const [topBound, setTopBound] = useState<number>(0);

  useEffect(() => {
    const rect = parentRef.current.getBoundingClientRect();
    setLeftBound(rect.left);
    setRightBound(rect.right);
    setBottomBound(rect.bottom);
    setTopBound(rect.top);
  }, []);

  //  const [finalImages, setFinalImages] = useState<ImageInterface[]>([]); // for when we need to store image data in the end
  const [images, setImages] = useState<ImageInterface[]>([
    {
      uuid: -1,
      url:
        "https://wepushbuttons.com.au/wp-content/uploads/2012/03/twitter-logo-small.jpg",
      xPos: 1,
      yPos: 1,
      rot: 1,
      width: 300,
      height: 300,
    } as ImageInterface,
    {
      uuid: -1,
      url:
        "https://www.splashtop.com/wp-content/uploads/Mac-lab-computer-with-Splashtop-Remote-Access.jpg",
      xPos: 1,
      yPos: 1,
      rot: 1,
      width: 640,
      height: 425,
    } as ImageInterface,
  ]);

  return (
    <Box>
      <FileUpload />
      <br />

      <div
        style={{
          display: "relative",
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
          />
        ))}
      </div>
    </Box>
  );
};

export default Collage;
