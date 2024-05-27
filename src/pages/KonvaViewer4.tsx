import React, { useRef } from "react";
import { Image, Layer, Stage } from "react-konva";

import { VIEWER_HEIGHT, VIEWER_WIDTH } from "../const";

import useZoomController from "../hooks/useZoomController";
import useImageSelector from "../hooks/useImageSelector";

const KonvaViewer4 = () => {
  const { image, imageWidth, imageHeight, Selector } = useImageSelector();

  const { scale, Controller } = useZoomController({
    imageWidth,
    imageHeight,
  });

  const stageRef = useRef<any>(null);

  const stageWidth = imageWidth * scale;
  const stageHeight = imageHeight * scale;

  return (
    <div>
      <h3>
        <a href="/">Back</a>
      </h3>

      <div style={{ display: "flex", gap: 64 }}>
        <div>
          <h1>KonvaViewer4: Emulate screen moving with transform</h1>

          <p style={{ whiteSpace: "pre-line" }}>
            {`
            canvas가 아닌 div element의 width/height를 조절해 native scroll 유도
            => canvas 크기 직접 늘리는 것 보다 훨씬 빠름

            scroll이 생기는 container에 scroll event listener를 달고, 이를 통해 Stage와 container의 위치를 조정
            => 스크롤 이동 효과 구현

            - 장점: 빠르다. native scroll 활용할 수 있다.
            - 단점: 방법에 대한 이해도가 필요. stage event 관련 좌표값 계산 확인 필요.

            Image size: ${imageWidth}x${imageHeight}

            Stage size: ${stageWidth}x${stageHeight}(Actual size: ${VIEWER_WIDTH}x${VIEWER_HEIGHT})
            `}
          </p>

          <hr />

          {Selector}

          <hr />

          {Controller}
        </div>

        <div
          id="scroll-container"
          style={{
            width: VIEWER_WIDTH,
            height: VIEWER_HEIGHT,
            overflow: "auto",
            backgroundColor: "gray",
          }}
          onScroll={(e) => {
            const dx = e.currentTarget.scrollLeft;
            const dy = e.currentTarget.scrollTop;
            if (stageRef.current) {
              stageRef.current.container().style.transform = `translate(${dx}px, ${dy}px)`;
              stageRef.current.x(-dx);
              stageRef.current.y(-dy);
            }
          }}
        >
          <div
            id="large-container"
            style={{
              width: stageWidth,
              height: stageHeight,
              overflow: "hidden",
            }}
          >
            <Stage
              ref={stageRef}
              width={VIEWER_WIDTH}
              height={VIEWER_HEIGHT}
              scale={{ x: scale, y: scale }}
            >
              <Layer imageSmoothingEnabled={false}>
                <Image image={image} width={imageWidth} height={imageHeight} />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KonvaViewer4;
