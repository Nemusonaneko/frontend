import React from "react";
import Link from "next/link";

import "./navbar.css";
import DeveloperCtx from "@/components/providers/DeveloperCtx";

function twitterSVG({style, className=""}){
	return (
		<div style={style} className={"icon-svg "+className}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 204">
				<path fill="currentColor" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"/>
			</svg>
		</div>
	);
}
function discordSVG({style, className=""}){
	return (
		<div style={style} className={"icon-svg "+className}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 96">
				<path fill="currentColor" d="M108 8a105 105 0 0 0-27-8 72 72 0 0 0-3 7 98 98 0 0 0-29 0 72 72 0 0 0-3-7 106 106 0 0 0-27 8C3 33-2 57 1 80a106 106 0 0 0 32 16 78 78 0 0 0 7-11 68 68 0 0 1-11-5l2-2a76 76 0 0 0 65 0l2 2a69 69 0 0 1-10 5 77 77 0 0 0 6 11 105 105 0 0 0 33-16c2-27-5-51-19-72ZM42 66c-6 0-11-6-11-13s5-13 11-13 12 6 12 13-5 13-12 13Zm43 0c-7 0-12-6-12-13s5-13 12-13 11 6 11 13-5 13-11 13Z"/>
			</svg>
		</div>
	);
}
function licenceSVG({style, className=""}){
	return (
		<div style={style} className={"icon-svg "+className}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path fill="currentColor" fillRule="evenodd" d="M356 277a70 70 0 0 0-9-30 101 101 0 0 0-20-27 214 214 0 0 0-27-24l-16-12-16-12-3-2a6497 6497 0 0 1-34-27 69 69 0 0 1-9-14 45 45 0 0 1-4-13 28 28 0 0 1 1-10 22 22 0 0 1 5-9 27 27 0 0 1 9-6 45 45 0 0 1 12-4 77 77 0 0 1 30 0l10 4a34 34 0 0 1 15 19 40 40 0 0 1 2 11h42a67 67 0 0 0-4-24 83 83 0 0 0-25-36 77 77 0 0 0-32-16 103 103 0 0 0-22-2h-1a129 129 0 0 0-41 7 81 81 0 0 0-21 13 66 66 0 0 0-23 46 69 69 0 0 0 3 26 87 87 0 0 0 13 26 196 196 0 0 0-22 28 105 105 0 0 0-11 28 71 71 0 0 0 7 48 101 101 0 0 0 20 27 214 214 0 0 0 27 24l16 12 16 12 3 2a6488 6488 0 0 1 34 27 69 69 0 0 1 9 14 45 45 0 0 1 4 13 28 28 0 0 1-1 11 22 22 0 0 1-5 8 27 27 0 0 1-9 6 44 44 0 0 1-13 4 75 75 0 0 1-29 0l-10-4a34 34 0 0 1-15-19 40 40 0 0 1-2-11h-42a67 67 0 0 0 4 24 83 83 0 0 0 25 36 77 77 0 0 0 32 16 102 102 0 0 0 21 2h2a129 129 0 0 0 41-7 81 81 0 0 0 21-13 66 66 0 0 0 23-46 69 69 0 0 0-3-26 87 87 0 0 0-13-26 196 196 0 0 0 22-28 105 105 0 0 0 11-28 71 71 0 0 0 2-18Zm-87 28a1189 1189 0 0 1-48-37c-6-6-12-12-15-18-4-6-7-12-7-17l1-10 4-10 7-10a142 142 0 0 1 10-12h1a10 10 0 0 0 0 1 899 899 0 0 0 16 11l5 4a1189 1189 0 0 1 48 37c6 6 12 12 15 18 4 6 7 12 7 17l-1 10-4 10-7 10a142 142 0 0 1-10 12h-1a10 10 0 0 0 0-1 899 899 0 0 0-16-11l-5-4Z"/>
			</svg>
		</div>
	);
}
function privacySVG({style, className=""}){
	return (
		<div style={style} className={"icon-svg "+className}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path fill="currentColor" fillRule="evenodd" d="M256 43c70 0 128 57 128 128v85h43v213H85V256h43v-85c0-71 58-128 128-128Zm128 256H128v128h256V299ZM256 85c-47 0-85 39-85 86v85h170v-85c0-47-38-86-85-86Z"/>
			</svg>
		</div>
	);
}
function statsSVG({style, className=""}){
	return (
		<div style={style} className={"icon-svg "+className}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path fill="currentColor" fillRule="evenodd" d="M107 64v341h341v43H64V64h43Zm323 189 15 28-101 56-115-21-80 69-21-24 91-79 120 21 91-50Zm-15-147 23 23-122 122H199l-59 69-24-21 69-80h118l112-113Z"/>
			</svg>
		</div>
	)
}
function DevSVG({style, className=""}){
	return (
		<div style={style} className={"icon-svg "+className}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path fill="currentColor" d="m30 16-8.5 8.5-2.8-2.8 5.6-5.7-5.6-5.7 2.8-2.8L30 16zM2 16l8.5-8.5 2.8 2.8L7.7 16l5.6 5.7-2.8 2.8L2 16z"/>
			</svg>
		</div>
	);
}

const svgSize="22px";

function LinkIcon({setLinkPreview, colour, src, text, IconE, idt=false}){
	return (
		<Link
			href={src}
			target="_blank"
			className="navIco text-lg hover:text-[color:var(--textdark)] flex flex-row items-center"
			onMouseEnter={() => setLinkPreview(text)}
		>
			<IconE className={`linkIco svg-${text}`} style={{color:colour,width:svgSize, height:svgSize}}/>
		</Link>
	);
}

export default function MediaList(){
	var [linkPreview, setLinkPreview] = React.useState<string>('');
	var {dev, setDev} = React.useContext(DeveloperCtx);

	return (
		<div className="linkPreviewBounds flex items-center gap-2 sm:visible max-sm:hidden px-2">
			<p className="linkPreview">{linkPreview}&nbsp;</p>
			<LinkIcon colour="#1DA1F2" text="Twitter" IconE={twitterSVG} src="https://twitter.com/waifugeneth" setLinkPreview={setLinkPreview}/>
			<LinkIcon colour="#7289DA" text="Discord" IconE={discordSVG} src="https://discord.gg/nbEN88q6dw" setLinkPreview={setLinkPreview} />
			<LinkIcon colour="" text="Licence" IconE={licenceSVG} src="https://huggingface.co/spaces/CompVis/stable-diffusion-license" setLinkPreview={setLinkPreview} />
			<LinkIcon colour="" text="Privacy" IconE={privacySVG} src="/privacy" setLinkPreview={setLinkPreview} />
			{/*<LinkIcon colour="" text="Statistics" IconE={statsSVG} src="/stats" setLinkPreview={setLinkPreview} />*/}
			{/*<LinkIcon text="Wallet" IconE={} src="" />*/}
			{process.env.NODE_ENV === "development"?
				<span
					className="navIco text-lg hover:text-[color:var(--textdark)] flex flex-row items-center"
					onMouseEnter={() => setLinkPreview("Developer")}
					onClick={()=>{setDev(!dev);}}
				>
					<DevSVG className={`linkIco svg-Dev ${dev?"rainbowText":""}`} style={{color:dev?"":"var(--text)",width:svgSize, height:svgSize}}/>
				</span>
			:""}
		</div>
	);
}

