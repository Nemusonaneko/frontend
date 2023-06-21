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
      console.log(id);
      const response = await fetch(
        `https://danbooru.donmai.us/posts/${id}.json`
      )
        .then((x: any) => x.json())
        .then((x: any) => x.tag_string);
      result = response.split(" ").join(", ");
    } else if (values.site === "Gelbooru") {
      const id = values.url.split("id=")[1];
      const response = await fetch(
        `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=1&id=${id}`
      )
        .then((x) => x.json())
        .then((x) => x.post[0].tags);
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
