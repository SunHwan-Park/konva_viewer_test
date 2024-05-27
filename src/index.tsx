import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./Main";
import KonvaViewer1 from "./KonvaViewer1";
import KonvaViewer2 from "./KonvaViewer2";
import KonvaViewer3 from "./KonvaViewer3";
import KonvaViewer4 from "./KonvaViewer4";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/konvaviewer1", element: <KonvaViewer1 /> },
  { path: "/konvaviewer2", element: <KonvaViewer2 /> },
  { path: "/konvaviewer3", element: <KonvaViewer3 /> },
  { path: "/konvaviewer4", element: <KonvaViewer4 /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div style={{ padding: 16 }}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
