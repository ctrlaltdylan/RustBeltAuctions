import { axios } from "@pipedream/platform";
import { JSDOM } from "jsdom";

export default defineComponent({
  props: {
    htmlContent: {
      type: "string",
      label: "HTML Content",
    },
  },
  async run({ steps, $ }) {
    const dom = new JSDOM(this.htmlContent);
    const document = dom.window.document;
    const elements = document.querySelectorAll("[data-listingid]");
    const result = Array.from(elements).map((element) => {
      const imageUrl = element.querySelector("img")?.src;
      const listingId = element.getAttribute("data-listingid");
      return { imageUrl, listingId };
    });
    return result;
  },
});