import { TagImportValues } from "@/types";
import { useMutation } from "react-query";

const before_queryRegex = /(.*?)\?/;
const after_postsRegex = /(?<=posts\/).*/;

function formatTagSet(set, emph=0){
	return set
		.split(' ')
		.map( s => `${"(".repeat(emph)}${s}${")".repeat(emph)}` )
		.join(', ')
}

async function getTags({type, url}) {

	if(!type || !url){ throw new Error('Invalid URL Type'); }
	if(
		type != "danbooru_full_query" &&
		type != "danbooru_full" &&
		type != "danbooru_id"
	){ throw new Error(`Unknown URL Type ${type}`) }

	try{
		switch(type){
			case "danbooru_full_query":
				url = before_queryRegex.exec(url)[1];

			case "danbooru_full":
				url = after_postsRegex.exec(url)[0];

			case "danbooru_id":
				url = parseInt( url );

			break;
		}

		var response = await fetch( `https://danbooru.donmai.us/posts/${url}.json`)
				.then((d) => d.json());

		return formatTagSet(response.tag_string_character, 1) + ",\n" +
			formatTagSet(response.tag_string_general) + ",\n" +
			formatTagSet(response.tag_string_artist)
		;

	}catch(e){
		throw e;
	}
}

/*
async function getTags(values: TagImportValues) {
  try {
    if (!values.site) throw new Error("No site");
    if (!values.url) throw new Error("No URL");
    let result;
    if (values.site === "Danbooru") {
      let isURI;
      try {
        isURI = Boolean(new URL(values.url));
      } catch (error) {
        isURI = false;
      }
      let id;
      if (isURI) {
        id = values.url.split("posts/")[1];
        const queryIndex = id.indexOf("?");
        if (queryIndex !== -1) {
          id = id.slice(0, queryIndex);
        }
      } else {
        id = values.url;
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

*/

export default function useGetTags() {
  return useMutation((values) => getTags(values));
}
