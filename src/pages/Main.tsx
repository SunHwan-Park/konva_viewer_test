import React from "react";

const Main = () => {
  return (
    <div>
      <h1>Main page</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a href="/konvaviewer1">
          <h3>Konva Viewer 1: Just make large stage</h3>
        </a>
        <a href="/konvaviewer2">
          <h3>Konva Viewer 2</h3>
        </a>
        <a href="/konvaviewer3">
          <h3>Konva Viewer 3</h3>
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
