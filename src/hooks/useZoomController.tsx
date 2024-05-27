import { useState } from "react";
import ZoomController from "../components/ZoomController";

const useZoomController = ({
  imageWidth,
  imageHeight,
}: {
  imageWidth: number;
  imageHeight: number;
}) => {
  const [scale, setScale] = useState(1);

  const Controller = (() => {
    return (
      <ZoomController
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        scale={scale}
        setScale={setScale}
      />
    );
  })();

  return { scale, Controller };
};

export default useZoomController;
