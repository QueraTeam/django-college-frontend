/* Import statements */
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
/* App is the entry point to the React code.*/
import App from "./App";
// import serviceWorker from "./serviceWorker";
/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading ~~~</div>}>
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
// serviceWorker();
