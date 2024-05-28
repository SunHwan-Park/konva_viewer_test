import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";

import { VIEWER_HEIGHT, VIEWER_WIDTH } from "../const";

import useZoomController from "../hooks/useZoomController";
import useImageSelector from "../hooks/useImageSelector";

type RectType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const KonvaViewer4 = () => {
  const { image, imageWidth, imageHeight, Selector } = useImageSelector();

  const viewerWidth = VIEWER_WIDTH * 2;
  const viewerHeight = VIEWER_HEIGHT * 1.5;

  const { scale, Controller } = useZoomController({
    imageWidth,
    imageHeight,
    viewerWidth,
    viewerHeight,
  });

  const stageRef = useRef<any>(null);

  const stageWidth = imageWidth * scale;
  const stageHeight = imageHeight * scale;

  const [rects, setRects] = useState<RectType[]>([]);
  const [newDrawingRect, setNewDrawingRect] = useState<null | RectType>(null);

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (newDrawingRect) {
        setRects([...rects, newDrawingRect]);
        setNewDrawingRect(null);
      }
    },
    [rects, newDrawingRect]
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  useEffect(() => {
    setRects([]);
    setNewDrawingRect(null);
  }, [image]);

  return (
    <div>
      <h3>
        <a href="/">Back</a>
      </h3>

      <div style={{ display: "flex", gap: 64 }}>
        <div>
          <h1>KonvaViewer Drawing(Based on Viewer 4)</h1>

          <hr />

          {Selector}

          <hr />

          {Controller}
        </div>

        <div
          id="scroll-container"
          style={{
            width: viewerWidth,
            height: viewerHeight,
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
              marginLeft: Math.max(0, (viewerWidth - stageWidth) / 2),
              marginTop: Math.max(0, (viewerHeight - stageHeight) / 2),
            }}
          >
            <Stage
              ref={stageRef}
              width={viewerWidth}
              height={viewerHeight}
              scale={{ x: scale, y: scale }}
              onMouseDown={(e) => {
                if (!newDrawingRect) {
                  console.log(e.evt);
                  const { layerX, layerY } = e.evt as any;
                  setNewDrawingRect({
                    x: Math.round(layerX / scale),
                    y: Math.round(layerY / scale),
                    width: 1,
                    height: 1,
                  });
                }
              }}
              onMouseMove={(e) => {
                if (newDrawingRect) {
                  const { layerX, layerY } = e.evt as any;
                  const currentX = Math.round(layerX / scale);
                  const currentY = Math.round(layerY / scale);
                  const newWidth = currentX - newDrawingRect.x;
                  const newHeight = currentY - newDrawingRect.y;
                  setNewDrawingRect({
                    x: newDrawingRect.x,
                    y: newDrawingRect.y,
                    width: newWidth,
                    height: newHeight,
                  });
                }
              }}
            >
              <Layer imageSmoothingEnabled={false} listening={false}>
                <Image image={image} width={imageWidth} height={imageHeight} />
              </Layer>
              <Layer listening={false}>
                {rects.length > 0 &&
                  rects.map((rect) => (
                    <Rect
                      x={rect.x}
                      y={rect.y}
                      width={rect.width}
                      height={rect.height}
                      fill="rgba(0, 0, 100, 0.3)"
                      stroke="red"
                      strokeWidth={1 / scale}
                    />
                  ))}
                {newDrawingRect && (
                  <Rect
                    x={newDrawingRect.x}
                    y={newDrawingRect.y}
                    width={newDrawingRect.width}
                    height={newDrawingRect.height}
                    stroke="red"
                    strokeWidth={1 / scale}
                  />
                )}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KonvaViewer4;
