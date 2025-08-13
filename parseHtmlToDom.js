import { JSDOM } from "jsdom";

const parseHtmlToDom = (html) => {
  const dom = new JSDOM(html);
  return dom.window.document;
};
export default parseHtmlToDom;
