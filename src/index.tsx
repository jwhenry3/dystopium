import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { startMap } from "./server/map/map";
import { MapWorker } from "./server/map/map.worker";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

startMap("example").then((map: MapWorker) => {
  map.addCharacter("test", 100, 100);
  // let dir = 1;
  // let dir2 = 1;
  // let tick = 0;
  // setInterval(() => {
  //   map.moveCharacter("test", [1 * dir, 1 * dir2]);
  //   dir = dir * -1;
  //   if (tick % 10 === 2) {
  //     dir2 = dir2 * -1;
  //   }
  //   tick++;
  // }, 2000);
});
