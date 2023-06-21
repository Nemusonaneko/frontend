import { TagImportValues } from "@/types";
import { useMutation } from "react-query";

async function getTags(values: TagImportValues) {
  try {
    if (!values.site) throw new Error("No site");
    if (!values.url) throw new Error("No URL");
    let result;
    if (values.site === "Danbooru") {
      let id = values.url.split("posts/")[1];
      const queryIndex = id.indexOf("?");
      if (queryIndex !== -1) {
        id = id.slice(0, queryIndex);
      }
      const response = await fetch(
        `https://danbooru.donmai.us/posts/${id}.json`
      )
        .then((x: any) => x.json())
        .then((x: any) => x.tag_string);
      result = response.split(" ").join(", ");
    } else {
      throw new Error("Site not supported");
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useGetTags() {
  return useMutation((values: TagImportValues) => getTags(values));
}
