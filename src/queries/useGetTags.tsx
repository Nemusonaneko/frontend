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

    return formatTagSet(response.tag_string_artist) + ", " +
      formatTagSet(response.tag_string_character) + ", " +
      formatTagSet(response.tag_string_general)
    ;

  }catch(e){
    throw e;
  }
}

export default function useGetTags() {
  return useMutation((values) => getTags(values));
}
