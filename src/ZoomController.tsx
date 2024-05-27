import React, { useCallback, useEffect } from "react";
import { MAX_SCALE, MIN_SCALE, VIEWER_HEIGHT, VIEWER_WIDTH } from "./const";

type Props = {
  imageWidth: number;
  imageHeight: number;
  scale: number;
  setScale: (value: number) => void;
};

const ZoomController: React.FC<Props> = ({
  imageWidth,
  imageHeight,
  scale,
  setScale,
}) => {
  const changeScale = useCallback(
    (value: number) => {
      const newScale =
        Math.round(Math.max(MIN_SCALE, Math.min(MAX_SCALE, value)) * 100) / 100;
      console.log(newScale);
      setScale(newScale);
    },
    [setScale]
  );

  const onClickButton = useCallback(
    (isPositive: boolean, isShiftKeyPushed: boolean) => {
      changeScale(
        scale + (isPositive ? 1 : -1) * (isShiftKeyPushed ? 0.1 : 0.01)
      );
    },
    [changeScale, scale]
  );

  const fitScale = useCallback(() => {
    const newScale =
      Math.min(VIEWER_WIDTH, VIEWER_HEIGHT) / Math.max(imageWidth, imageHeight);
    setScale(newScale);
  }, [imageHeight, imageWidth, setScale]);

  useEffect(() => {
    fitScale();
  }, [fitScale]);

  const keydownListener = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      switch (key) {
        case "=":
        case "+":
          onClickButton(true, e.shiftKey);
          break;
        case "-":
        case "_":
          onClickButton(false, e.shiftKey);
          break;
        case "f":
          fitScale();
          break;
        default:
          break;
      }
    },
    [fitScale, onClickButton]
  );

  useEffect(() => {
    document.addEventListener("keydown", keydownListener);
    return () => {
      document.removeEventListener("keydown", keydownListener);
    };
  }, [keydownListener]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <p>Zoom Controller</p>
      <button onClick={(e) => onClickButton(false, e.shiftKey)}>-</button>
      <p>{Math.round(scale * 100)}</p>
      <button onClick={(e) => onClickButton(true, e.shiftKey)}>+</button>
    </div>
  );
};

export default ZoomController;
