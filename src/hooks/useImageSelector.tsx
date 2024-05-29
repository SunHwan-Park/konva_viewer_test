import { useMemo, useState } from "react";

import square1024 from "../sampleImages/1024x1024.jpg";
import square6400 from "../sampleImages/6400x6400.jpg";
import square10000 from "../sampleImages/10000x10000.jpg";
import square12000 from "../sampleImages/12000x12000.jpg";
import square16000 from "../sampleImages/16000x16000.jpg";
import square20000 from "../sampleImages/20000x20000.jpg";
import square22000 from "../sampleImages/22000x22000.jpg";
import square23000 from "../sampleImages/23000x23000.jpg";
import square24000 from "../sampleImages/24000x24000.jpg";
import square25000 from "../sampleImages/25000x25000.jpg";
import square26000 from "../sampleImages/26000x26000.jpg";

import useImage from "use-image";

const IMAGE_LIST = [
  square1024,
  square6400,
  square10000,
  square12000,
  square16000,
  square20000,
  square22000,
  square23000,
  square24000,
  square25000,
  square26000,
];

const useImageSelector = () => {
  const [index, setIndex] = useState(0);
  const [image] = useImage(IMAGE_LIST[index]);
  const imageWidth = image?.width ?? 0;
  const imageHeight = image?.height ?? 0;

  const imageName = useMemo(() => {
    const srcArr = image?.src.split("/") || [];
    const name = srcArr[srcArr?.length - 1] || "";
    return name?.split(".")[0] || "";
  }, [image]);

  const onClickButton = (isPositive: boolean) => {
    const newIndex = Math.max(
      0,
      Math.min(IMAGE_LIST.length - 1, index + (isPositive ? 1 : -1))
    );
    setIndex(newIndex);
  };

  const Selector = (() => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <p>Image Selector</p>
        <button onClick={() => onClickButton(false)}>{"<"}</button>
        <p>{imageName}</p>
        <button onClick={() => onClickButton(true)}>{">"}</button>
      </div>
    );
  })();
  return {
    image,
    imageWidth,
    imageHeight,
    Selector,
  };
};

export default useImageSelector;
