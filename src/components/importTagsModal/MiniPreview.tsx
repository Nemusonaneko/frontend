import React from "react";
import translateModel from "@/utils/translateModel";

export default function MiniPreview({src, info}){
	/* default is a single transparent pixel, to prevent "Image has missing SRC attribute" */
	var [decodedImage, setDecodedImage] = React.useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')

	React.useEffect(()=>{
		var reader = new FileReader();
		reader.onload = function(e){
			setDecodedImage(e.target.result);
		}
		reader.readAsDataURL(src);
	},[src]);

	console.log(info);

	return (
		<div className="flex flex-row md:flex-col">
			<div className="relative">
				<img
					src={decodedImage}
					alt="waifu"
					className="grow aspect-square w-full h-full hidden md:block rounded-t-lg"
				/>
				<div /*Model, CFG Scale, Noise*/
					className="hidden md:flex absolute flex-row gap-2 modelInfo bg-[color:var(--bg2)] px-1.5 py-0.5 rounded-bl-lg rounded-tr-lg"
					style={{top:"-1px", right:"-1px"}}
				>
					<div className="flex flex-col justify-center" style={{transform:"translateY(-1px)"}}>
						<span>{translateModel(info.model, true)}</span>
					</div>
					<div>
						<p className="text-xs text-[color:var(--yellow)]">D: {info.metadata.get("Denoising strength")}</p>
						<p className="text-xs text-[color:var(--purple)]">C: {info.metadata.get("CFG scale")}</p>
					</div>
				</div>

				<div /* Seed */
					className="hidden md:flex absolute flex-row gap-2 modelInfo bg-[color:var(--bg1)] px-1.5 py-0.5 rounded-tr-lg"
					style={{bottom:"-0px", left:"-0px"}}
				>
					<p>{info.metadata.get("Seed")}</p>
				</div>


			</div>
			<div>
				<p className="positive p-1 max-h-24 overflow-y-scroll bg-[color:var(--bg1)] text-[color:var(--green-70)]">
					{info.positive}
				</p>
				<p className="negative p-1 max-h-16 overflow-y-scroll bg-[color:var(--bg1)] text-[color:var(--red-70)] md:rounded-b-lg">
					{info.negative}
			</p>
			</div>
		</div>
	);
}