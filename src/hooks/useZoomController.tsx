import { useState } from "react";
import ZoomController from "../components/ZoomController";

const useZoomController = ({
  imageWidth,
  imageHeight,
  viewerWidth,
  viewerHeight,
}: {
  imageWidth: number;
  imageHeight: number;
  viewerWidth?: number;
  viewerHeight?: number;
}) => {
  const [scale, setScale] = useState(1);

  const Controller = (() => {
    return (
      <ZoomController
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        viewerWidth={viewerWidth}
        viewerHeight={viewerHeight}
        scale={scale}
        setScale={setScale}
      />
    );
  })();

  return { scale, Controller };
};

export default useZoomController;
