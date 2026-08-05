import satori from "satori";
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

const titleStyle = {
  fontSize: 72,
  fontWeight: "bold",
  maxHeight: "84%",
  overflow: "hidden",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "8px",
  fontSize: 28,
};

const boldOverflowStyle = {
  overflow: "hidden",
  fontWeight: "bold",
};

const hiddenQuoteStyle = { color: "transparent" };

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

const createAuthorLine = (author) =>
  createNode("span", {
    children: [
      "by ",
      createNode("span", { style: hiddenQuoteStyle, children: '"' }),
      createNode("span", { style: boldOverflowStyle, children: author }),
    ],
  });

const createFooter = (author) =>
  createNode("div", {
    style: footerStyle,
    children: [
      createAuthorLine(author),
      createNode("span", {
        style: boldOverflowStyle,
        children: "tomerwave.com",
      }),
    ],
  });

const createMarkup = (post) =>
  createRoot([
    createNode("p", {
      style: titleStyle,
      children: post.data.title,
    }),
    createFooter(post.data.author),
  ]);

export default async (post) =>
  satori(createMarkup(post), {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: await loadGoogleFonts(post.data.title + post.data.author + "tomerwave.com" + "by"),
  });
