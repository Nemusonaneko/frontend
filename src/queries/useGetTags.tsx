import { TagImportValues } from "@/types";
import { useMutation } from "react-query";

async function getTags(values: TagImportValues) {
  try {
    let result;
    if (values.site === "Danbooru") {
      const response = await fetch(
        `${values.url}.json`
      )
        .then((x: any) => x.text())
        .then((x: any) => JSON.parse(x))
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
