import { useMemo, useState } from "react";

import sample1024px from "../sampleImages/about1024px.png";
import sample10000px from "../sampleImages/about10000px.jpg";
import sample15000px from "../sampleImages/about15000px.jpg";
import sample20000px from "../sampleImages/about20000px.jpg";
import sample30000px from "../sampleImages/about30000px.jpg";
import useImage from "use-image";

const IMAGE_LIST = [
  sample1024px,
  sample10000px,
  sample15000px,
  sample20000px,
  sample30000px,
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
