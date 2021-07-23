import { useState, useRef, useEffect } from "react";
import { UpdateImageFuncInterface } from "../../interfaces";
import { io } from "socket.io-client";

import { ImageInterface } from "../interfaces";

const Image: React.FC<ImageInterface> = ({
  id,
  uuid, // if negative, then this is a new image and register it as such
  url,
  xPos,
  yPos,
  rot,
  width,
  height,
  zIndex,
  leftBound,
  rightBound,
  topBound,
  bottomBound,
  screenWidth,
  screenHeight,
  updated,
  setUpdated,
}) => {
  // websockets client
  const socket = io("http://localhost:5001");
  socket.on("connect", () => {});
  socket.on("disconnect", () => {});

  const draggableRef = useRef<HTMLDivElement>(undefined);
  let prevX, prevY;

  const [myZIndex, setMyZIndex] = useState<number>(Math.max(1, zIndex));
  const values = {
    curXPos: xPos,
    curYPos: yPos,
    curRot: rot,
    curWidth: width,
    curHeight: height,
  };

  const valueRef = useRef(values);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  // let imageUpdated: boolean = false;
  const [imageUpdated, setImageUpdated] = useState(false);

  // southwest
  const swOnMouseDown = (e) => {
    setImageUpdated(true);
    setIsResizing(true);
    prevX = e.clientX;
    prevY = e.clientY;

    window.addEventListener("mousemove", swOnMouseMove);
    window.addEventListener("mouseup", swOnMouseUp);

    function swOnMouseMove(e) {
      if (draggableRef !== null) {
        const rect = draggableRef.current.getBoundingClientRect();

        if (rect.left > leftBound) {
          draggableRef.current.style.width =
            Math.min(rect.width + (prevX - e.clientX), rightBound - leftBound) +
            "px";
          draggableRef.current.style.height =
            Math.min(
              rect.height - (prevY - e.clientY),
              bottomBound - topBound
            ) + "px";
          draggableRef.current.style.left =
            rect.left - (prevX - e.clientX) + "px";
          prevX = e.clientX;
          prevY = e.clientY;
        }
      }
    }

    function swOnMouseUp(e) {
      window.removeEventListener("mousemove", swOnMouseMove);
      window.removeEventListener("mouseup", swOnMouseUp);
      setIsResizing(false);
    }
  };

  // southeast
  const seOnMouseDown = (e) => {
    setImageUpdated(true);
    setIsResizing(true);
    prevX = e.clientX;
    prevY = e.clientY;

    window.addEventListener("mousemove", seOnMouseMove);
    window.addEventListener("mouseup", seOnMouseUp);
    function seOnMouseMove(e) {
      if (draggableRef !== null) {
        const rect = draggableRef.current.getBoundingClientRect();
        if (rect.left != rightBound - rect.width) {
          draggableRef.current.style.width =
            Math.min(rect.width - (prevX - e.clientX), rightBound - leftBound) +
            "px";
          draggableRef.current.style.height =
            Math.min(
              rect.height - (prevY - e.clientY),
              bottomBound - topBound
            ) + "px";
          prevX = e.clientX;
          prevY = e.clientY;
        }
      }
    }

    function seOnMouseUp(e) {
      window.removeEventListener("mousemove", seOnMouseMove);
      window.removeEventListener("mouseup", seOnMouseUp);
      setIsResizing(false);
    }
  };

  // northeast
  const neOnMouseDown = (e) => {
    setImageUpdated(true);
    setIsResizing(true);
    prevX = e.clientX;
    prevY = e.clientY;

    window.addEventListener("mousemove", neOnMouseMove);
    window.addEventListener("mouseup", neOnMouseUp);
    function neOnMouseMove(e) {
      if (draggableRef !== null) {
        const rect = draggableRef.current.getBoundingClientRect();
        if (rect.left != rightBound - rect.width) {
          draggableRef.current.style.width =
            Math.min(rect.width - (prevX - e.clientX), rightBound - leftBound) +
            "px";
          draggableRef.current.style.height =
            Math.min(
              rect.height + (prevY - e.clientY),
              bottomBound - topBound
            ) + "px";
          draggableRef.current.style.top =
            rect.top - (prevY - e.clientY) + "px";
          prevX = e.clientX;
          prevY = e.clientY;
        }
      }
    }

    function neOnMouseUp(e) {
      window.removeEventListener("mousemove", neOnMouseMove);
      window.removeEventListener("mouseup", neOnMouseUp);
      setIsResizing(false);
    }
  };

  // northwest
  const nwOnMouseDown = (e) => {
    setImageUpdated(true);
    setIsResizing(true);
    prevX = e.clientX;
    prevY = e.clientY;

    window.addEventListener("mousemove", nwOnMouseMove);
    window.addEventListener("mouseup", nwOnMouseUp);
    function nwOnMouseMove(e) {
      if (draggableRef !== null) {
        const rect = draggableRef.current.getBoundingClientRect();
        if (rect.left != leftBound) {
          draggableRef.current.style.width =
            Math.min(rect.width + (prevX - e.clientX), rightBound - leftBound) +
            "px";
          draggableRef.current.style.height =
            Math.min(
              rect.height + (prevY - e.clientY),
              bottomBound - topBound
            ) + "px";
          draggableRef.current.style.top =
            rect.top - (prevY - e.clientY) + "px";
          draggableRef.current.style.left =
            rect.left - (prevX - e.clientX) + "px";
          prevX = e.clientX;
          prevY = e.clientY;
        }
      }
    }

    function nwOnMouseUp(e) {
      window.removeEventListener("mousemove", nwOnMouseMove);
      window.removeEventListener("mouseup", nwOnMouseUp);
      setIsResizing(false);
    }
  };

  // dragging
  const dragOnMouseDown = (e) => {
    setImageUpdated(true);
    if (!isResizing) {
      window.addEventListener("mousemove", dragMouseMove);
      window.addEventListener("mouseup", dragMouseUp);

      prevX = e.clientX;
      prevY = e.clientY;

      function dragMouseMove(e) {
        let newX = e.clientX - prevX;
        let newY = e.clientY - prevY;

        const rect = draggableRef.current.getBoundingClientRect();

        let leftMargin = Math.max(rect.x + newX, leftBound);
        let topMargin = Math.max(rect.y + newY, topBound);

        leftMargin = Math.min(leftMargin, rightBound - rect.width);
        topMargin = Math.min(topMargin, bottomBound - rect.height);

        draggableRef.current.style.left = leftMargin + "px";
        draggableRef.current.style.top = topMargin + "px";

        prevX = e.clientX;
        prevY = e.clientY;
      }

      function dragMouseUp(e) {
        window.removeEventListener("mousemove", dragMouseMove);
        window.removeEventListener("mouseup", dragMouseUp);
      }
    }
  };

  const updateImage = ({
    id,
    width,
    height,
    x,
    y,
    rot,
    zIndex,
  }: UpdateImageFuncInterface) => {
    const updatedImage = {
      imageID: id,
      width,
      height,
      posX: x,
      posY: y,
      rot,
      zindex: zIndex,
    };
    socket.emit("PUT/image", updatedImage);
    setUpdated(true);
    setTimeout(() => {
      setUpdated(false);
      setImageUpdated(false);
    }, 1000);
  };

  // calling websockets everytime
  /*
  // const intervalLength: number = 1000;
  const intervalLength: number = 1;
  const putInterval = setInterval(() => {
    if (imageUpdated) {
      const rect = draggableRef.current.getBoundingClientRect();
      const input: UpdateImageFuncInterface = {
        id,
        width: rect.width / screenWidth,
        height: rect.height / screenHeight,
        x: rect.left / screenWidth,
        y: rect.top / screenHeight,
        rot,
        zIndex: myZIndex,
      };
      updateImage(input);
      imageUpdated = false;
    }
  }, intervalLength);
     */

  useEffect(() => {
    if (imageUpdated) {
      const rect = draggableRef.current.getBoundingClientRect();
      const input: UpdateImageFuncInterface = {
        id,
        width: rect.width / screenWidth,
        height: rect.height / screenHeight,
        x: rect.left / screenWidth,
        y: rect.top / screenHeight,
        rot,
        zIndex: myZIndex,
      };
      updateImage(input);
      //imageUpdated = false;
    }
  }, [imageUpdated]);

  let styles;
  if (valueRef.current.curWidth == -1 || valueRef.current.curWidth == -1) {
    styles = {
      position: "absolute",
      left: `${Math.max(valueRef.current.curXPos * screenWidth, leftBound)}px`,
      top: `${Math.max(topBound, valueRef.current.curYPos * screenHeight)}px`,
    };
  } else {
    styles = {
      position: "absolute",
      width: `${valueRef.current.curWidth * screenWidth}px`,
      height: `${valueRef.current.curHeight * screenHeight}px`,
      left: `${Math.max(valueRef.current.curXPos * screenWidth, leftBound)}px`,
      top: `${Math.max(topBound, valueRef.current.curYPos * screenHeight)}px`,
    };
  }
  styles.zIndex = myZIndex;

  const [presignedUrl, setPresignedUrl] = useState<string>("");
  useEffect(() => {
    fetch("http://localhost:8080/images/getPresignedUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPresignedUrl(data["url"]);
      });
  }, []);

  const incrementZIndex = () => {
    setMyZIndex(myZIndex + 1);
    setImageUpdated(true);
  };
  const decrementZIndex = () => {
    setMyZIndex(Math.max(1, myZIndex - 1));
    setImageUpdated(true);
  };

  return (
    <div
      ref={draggableRef}
      className="outerDivStyle"
      onMouseDown={dragOnMouseDown}
      style={styles}
    >
      <div className="innerDivStyle " style={{ position: "absolute" }} />
      <img src={presignedUrl} className="imageStyle" />
      <div className="resizer ne" onMouseDown={neOnMouseDown}></div>
      <div className="resizer sw" onMouseDown={swOnMouseDown}></div>
      <div className="resizer se" onMouseDown={seOnMouseDown}></div>
      <div className="resizer nw" onMouseDown={nwOnMouseDown}></div>
      <div className="zIndexBtn zIndexBtnLeft" onClick={incrementZIndex}>
        +
      </div>
      <div className="zIndexBtn zIndexBtnRight" onClick={decrementZIndex}>
        -
      </div>
    </div>
  );
};

export default Image;
