import { createRoot } from "react-dom/client";
import Home from "@/home";

function helloWorld() {
	console.log(Home());
	return <div>hello world</div>;
}
const appElement = document.getElementById("app");
if (!appElement) {
	throw new Error("Failed to find the app element");
}
const root = createRoot(appElement);
root.render(helloWorld());
