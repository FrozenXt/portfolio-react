import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";

// Then render <ProfessionalPortfolio />
//import Form from "./form.jsx"; // ← import your file

ReactDOM.createRoot(document.getElementById("root"))
  .render
  //<Form />  // ← render your form
  ();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
