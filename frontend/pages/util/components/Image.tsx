import { useState, useRef } from "react";
import { MutableRefObject, Fragment } from "react";

import { ImageInterface } from "../interfaces";

const Image: React.FC<ImageInterface> = ({
  uuid, // if negative, then this is a new image and register it as such
  url,
  xPos,
  yPos,
  rot,
  width,
  height,
  leftBound,
  rightBound,
  topBound,
  bottomBound,
}) => {
  const draggableRef = useRef<HTMLDivElement>(undefined);
  let prevX, prevY;

  const values = {
    curXPos: xPos,
    curYPos: yPos,
    curRot: rot,
    curWidth: width,
    curHeight: height,
  };

  const valueRef = useRef(values);

  // everything is dealt as percents to deal with various screen sizes
  const handleData = (draggableRef: MutableRefObject<undefined>) => {
    if (draggableRef.current !== undefined) {
      const x =
        draggableRef.current.getBoundingClientRect().left / screen.width;
      const y =
        draggableRef.current.getBoundingClientRect().top / screen.height;
      const height =
        draggableRef.current.getBoundingClientRect().height / screen.height;
      const width =
        draggableRef.current.getBoundingClientRect().width / screen.width;
      const rot = 0;
      // make api call here
    }
  };

  const [isResizing, setIsResizing] = useState<boolean>(false);

  // southwest
  const swOnMouseDown = (e) => {
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

  return (
    <div
      ref={draggableRef}
      className="outerDivStyle"
      onMouseDown={dragOnMouseDown}
      style={{
        width: valueRef.current.curWidth,
        height: valueRef.current.curHeight,
      }}
    >
      <div className="innerDivStyle"></div>
      <img src={url} className="imageStyle" />
      <div className="resizer ne" onMouseDown={neOnMouseDown}></div>
      <div className="resizer sw" onMouseDown={swOnMouseDown}></div>
      <div className="resizer se" onMouseDown={seOnMouseDown}></div>
      <div className="resizer nw" onMouseDown={nwOnMouseDown}></div>
    </div>
  );
};

export default Image;
