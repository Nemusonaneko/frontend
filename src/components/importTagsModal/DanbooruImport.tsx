import React from "react";
import useGetTags from "@/queries/useGetTags";
import toast from "react-hot-toast";

const danbooruRegex = /[0-9]{1,10}|https\:\/\/danbooru\.donmai\.us\/posts\/[0-9]{1,10}/;
const danbooru_fullRegex = /https\:\/\/danbooru\.donmai\.us\/posts\/[0-9]{1,10}/;
const has_queryRegex = /\?q=/;

export default function DanbooruImport({setValues, setOpened}){
  const { mutate: getTags } = useGetTags();

	function onSubmit(){
		var source = document.getElementById('danbooruImport');
		var url = source.value;
		var isFull = url.match(danbooru_fullRegex);
		getTags({
			type: isFull? (url.match(has_queryRegex)?"danbooru_full_query":"danbooru_full") :"danbooru_id",
			url:url
		},{
			onSuccess: function(data){
				setValues("positivePrompts", data);
				setOpened(false);
				source.value = "";
        toast.success("Successfully imported tags");
			},
			onError: function(e){
				console.log(e);				
        toast.error(`Import failed: ${e.message}`);
			}
		});
  };

	var [isValid, setIsValid] = React.useState(true);

	function inputUpdate(e){
		var d = e.target.value;
		setIsValid( !d.match(danbooruRegex) );
	}

	return(<>
		<input
			id="danbooruImport"
			className="focus:outline focus:outline-2 outline-[color:var(--blue)] w-full bg-[color:var(--bg3)] rounded h-8 pl-1 text-sm placeholder-[color:var(--darktext)]"
			onChange={inputUpdate}
			placeholder="https://danbooru.donmai.us/..."
		/>
		<button
			disabled={isValid}
			onClick={onSubmit}
			className="disabled:opacity-30 w-full text-[color:var(--bg0)] bg-[color:var(--green)] hover:bg-[color:var(--green-50)] rounded py-1 px-1 text-bold text-md"
		>Import Tags</button>
	</>);
}