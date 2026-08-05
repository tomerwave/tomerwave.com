import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../load-google-font";

const rootStyle = {
  background: "#fefbfb",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const shadowStyle = {
  position: "absolute",
  top: "-1px",
  right: "-1px",
  border: "4px solid #000",
  background: "#ecebeb",
  opacity: "0.9",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  margin: "2.5rem",
  width: "88%",
  height: "80%",
};

const frameStyle = {
  border: "4px solid #000",
  background: "#fefbfb",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  margin: "2rem",
  width: "88%",
  height: "80%",
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "20px",
  width: "90%",
  height: "90%",
};

const bodyStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  maxHeight: "90%",
  overflow: "hidden",
  textAlign: "center",
};

const titleStyle = { fontSize: 72, fontWeight: "bold" };
const descriptionStyle = { fontSize: 28 };

const footerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  marginBottom: "8px",
  fontSize: 28,
};

const hostnameStyle = {
  overflow: "hidden",
  fontWeight: "bold",
};

const createNode = (type, props) => ({ type, props });

const createRoot = (children) =>
  createNode("div", {
    style: rootStyle,
    children: [createNode("div", { style: shadowStyle }), createFrame(children)],
  });

const createFrame = (children) =>
  createNode("div", {
    style: frameStyle,
    children: createNode("div", { style: contentStyle, children }),
  });

const createBody = () =>
  createNode("div", {
    style: bodyStyle,
    children: [
      createNode("p", { style: titleStyle, children: SITE.title }),
      createNode("p", { style: descriptionStyle, children: SITE.desc }),
    ],
  });

const createFooter = () =>
  createNode("div", {
    style: footerStyle,
    children: createNode("span", {
      style: hostnameStyle,
      children: new URL(SITE.website).hostname,
    }),
  });

const createMarkup = () => createRoot([createBody(), createFooter()]);

export default async () =>
  satori(createMarkup(), {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: await loadGoogleFonts(SITE.title + SITE.desc + SITE.website),
  });
