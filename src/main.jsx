import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/** Custom CSS */
import "./style/index.css";
import "./style/custom-animations.css";
import "./style/custom-width-height.css";

/** Bootstrap CSS */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Users from "./Users.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Users />
	</StrictMode>
);
