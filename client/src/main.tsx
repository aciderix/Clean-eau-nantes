import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Please add a div with id 'root' to your HTML.");
}

// Render the application
createRoot(rootElement).render(<App />);
