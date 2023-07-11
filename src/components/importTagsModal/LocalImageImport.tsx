import React from "react";
import MiniPreview from './MiniPreview';
import toast from "react-hot-toast";

import translateModel from "@/utils/translateModel";
import extractTagsFromImage from "@/utils/extractTagsFromImage";

function InfoHover({title}){
	return (
		<div title={title} className="inline w-5 h-5 text-center text-sm rounded-full bg-[color:var(--yellow)] text-[color:var(--bg0)]">!</div>
	);
}

export default function LocalImageImport({setValues, setOpened, isDragging, setIsDragging }){
	var [isValid, setIsValid] = React.useState(false);
	var [isChosen, setIsChosen] = React.useState(false);
	var [file, setFile] = React.useState(null);
	var [fileInfo, setFileInfo] = React.useState(null);

	var fileInput = React.useRef(null);

	/* fired when file is drag-dropped */
	function drop_to_input(evt){
		evt.preventDefault(); //dont open file in new tab

		setIsDragging(false);
		setIsChosen(true);	

		document.getElementById('localImageImport_input').files = evt.dataTransfer.files;
		testFileIsValid( evt.dataTransfer.files[0] );
	}

	/* fired when file is selected from "Browse..." dialog */
	function fileSelected(e){
		setIsChosen(true);
		testFileIsValid(e.target.files[0]);
	}

	async function testFileIsValid(file){
		setIsValid(false);
		setFileInfo(null);
		setFile(null);

		var ret = await extractTagsFromImage(file);
		if(ret.error){return toast.error(ret.message); }
		else{ toast.success('File successfully parsed') }
		/*image data was successfully parsed, but it may not nessecerily be valid.*/
		setIsValid(true);
		setFileInfo(ret);
		setFile(file);
	}

	function onSubmit(_e){
		setValues("positivePrompts", fileInfo.positive);
		setValues("negativePrompts", fileInfo.negative);
		setValues("cfgScale", parseInt(fileInfo.metadata.get("CFG scale")) );
		setValues("denoiseStrength", parseFloat(fileInfo.metadata.get("Denoising strength")));
		setValues("model", translateModel(fileInfo.model, true) );
		setValues("seed",fileInfo.metadata.get("Seed"));

		
		setOpened(false);
	}

	return(<>
		<div className="flex gap-4">
			{isChosen?"":
				<InfoHover title="Some phones will strip png-tEXt data when downloading images, theres nothing we can do about this." />
			}
			<div className="fileUpload">
				<input ref={fileInput} id="localImageImport_input" type="file" accept="image/png" placeholder="Upload" onChange={ fileSelected } />
				<div
					className={(isDragging?"":"hidden ") + "dragBoundary z-10 absolute top-0 left-0 right-0 bottom-0 bg-[color:var(--blue)] border-2 border-dashed border-[color:var(--text)]"}
					onDrop={drop_to_input}
				></div>
			</div>
		</div>

		{isValid?<MiniPreview src={file} info={fileInfo}/>:""}

		<button
			disabled={!isValid}
			onClick={onSubmit}
			className="disabled:opacity-30 w-full text-[color:var(--bg0)] bg-[color:var(--green)] hover:bg-[color:var(--green-50)] rounded py-1 px-1 text-bold text-md"
		>Import Tags</button>
	</>);
}