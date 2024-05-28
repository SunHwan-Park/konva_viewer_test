import React from "react";

const Main = () => {
  return (
    <div>
      <h1>Konva Viewer zoom / scroll test</h1>
      <a
        href="https://konvajs.org/docs/sandbox/Canvas_Scrolling.html"
        target="_blank"
        rel="noreferrer"
      >
        <h4 style={{ width: "fit-content" }}>Reference</h4>
      </a>
      <hr />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a href="/konvaviewer1">
          <h3>Konva Viewer 1: Just make large stage</h3>
        </a>
        <a href="/konvaviewer2">
          <h3>
            Konva Viewer 2: Make stage draggable (navigate with drag&drop) -
            구현 생략
          </h3>
        </a>
        <a href="/konvaviewer3">
          <h3>Konva Viewer 3: Emulate scrollbars - 구현 생략</h3>
        </a>
        <a href="/konvaviewer4">
          <h3>Konva Viewer 4: Emulate screen moving with transform</h3>
        </a>
        <a href="/konvaviewer-drawing">
          <h3>Konva Viewer - Drawing(Based on Viewer 4)</h3>
        </a>
      </div>
    </div>
  );
};

export default Main;
