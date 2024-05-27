import React from "react";
import { Image, Layer, Stage } from "react-konva";

import { VIEWER_HEIGHT, VIEWER_WIDTH } from "../const";

import useZoomController from "../hooks/useZoomController";
import useImageSelector from "../hooks/useImageSelector";

const KonvaViewer1 = () => {
  const { image, imageWidth, imageHeight, Selector } = useImageSelector();

  const { scale, Controller } = useZoomController({
    imageWidth,
    imageHeight,
  });

  const stageWidth = imageWidth * scale;
  const stageHeight = imageHeight * scale;

  return (
    <div>
      <h3>
        <a href="/">Back</a>
      </h3>

      <div style={{ display: "flex", gap: 64 }}>
        <div>
          <h1>KonvaViewer1: Just make large stage</h1>

          <p style={{ whiteSpace: "pre-line" }}>
            {`
            가장 심플하지만 가장 느린 방법.(현재 Neuro-T Viewer 방식)
            캔버스 크기를 scale에 맞게 확장 시키기 때문에 느리다.
            대신 native scrollbars를 활용할 수 있기 때문에 구현이 간단하다.

            - 장점: Simple implementation
            - 단점: Slow

            Image size: ${imageWidth}x${imageHeight}

            Stage size: ${stageWidth}x${stageHeight}
            `}
          </p>

          <hr />

          {Selector}

          <hr />

          {Controller}
        </div>

        <div
          style={{
            width: VIEWER_WIDTH,
            height: VIEWER_HEIGHT,
            overflow: "auto",
            backgroundColor: "gray",
          }}
        >
          <Stage width={stageWidth} height={stageHeight}>
            <Layer imageSmoothingEnabled={false}>
              <Image image={image} width={stageWidth} height={stageHeight} />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default KonvaViewer1;
