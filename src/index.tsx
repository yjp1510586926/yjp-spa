import React from "react";
import { createRoot } from "react-dom/client";
import Home from "@/home";

function helloWorld() {
    console.log(Home());
    return <div>hello world</div>
}
const root = createRoot(document.getElementById("app")!);
if (root) {
    root.render(helloWorld());
} else {
   throw new Error("root is null");
}