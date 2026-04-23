import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export default App;