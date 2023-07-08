import { FormValues, TagImportValues } from "@/types";
import React from "react";

import LocalImageImport from './LocalImageImport';
import DanbooruImport from './DanbooruImport';

function CloseButton({setOpened}){
	return (
		<button
			className="text-xl absolute top-1 right-1 hover:bg-[color:var(--red)] rounded-md"
			onClick={() => setOpened(false)}
		>
			<svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  			<path d="M6 18 18 6M6 6l12 12"/>
			</svg>
		</button>
	);
}

export default function ImportTagsModal({opened,setOpened,setValues}){
	var ImportMethods = [
		{i:'localImage',n:"Saved Image"},
		{i:'danbooru',n:"Danbooru"}
	];
	var [openMethod, setOpenMethod] = React.useState('localImage');
	var [isDragging, setIsDragging] = React.useState(false);

	function handleDrag(e){
		e.preventDefault();
		setIsDragging(true);
	}

  if (!opened) return null;
	return (<div
      className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-75 flex justify-center items-center"
      onClick={() => setOpened(false)}
    >
			<div
				className="w-full flex justify-center max-w-md h-fit w-full bg-[color:var(--bg0)] rounded-md relative"
				onClick={(e) => e.stopPropagation()}
			>
				<CloseButton setOpened={setOpened} />
				<div
					className="closeBodyWrap p-2 w-full flex flex-col gap-2"
					onDragOver={handleDrag}
					onMouseOut={ ()=>setIsDragging(false) }
				>
					<div className="m-1 flex flex-row align-start">
						<div className="flex flex-col justify-center">
							<span className="text-bold text-sm inline leading-7 mr-2.5">Method:</span>
						</div>
						<div className="grow mr-5 flex flex-row rounded border border-[color:var(--text)]">
							{ImportMethods.map(({i,n})=>{
								return <button key={i}
									onClick={ ()=>setOpenMethod(i) }
									className={"grow " + (openMethod === i?"selected py-2 md:p-0 bg-[color:var(--text)] text-[color:var(--bg0)]":"") }
								>{n}</button>
							})}
						</div>
					</div>
					{ openMethod=="localImage"? <LocalImageImport setValues={setValues} setOpened={setOpened} isDragging={isDragging} setIsDragging={setIsDragging}/> :"" }
					{ openMethod=="danbooru"?   <DanbooruImport   setValues={setValues} setOpened={setOpened}/> :"" }
				</div>
			</div>
    </div>
	);
}
