import { GenDataValues, HistoryValues } from "@/types";

export default async function downloadImage(data) {
  const a = document.createElement("a");
  a.setAttribute("href", `data:image/png;base64,${data.base64}`);
  a.download = `nemuswaifugen-${data.base64.slice(100, 110)}-${data.seed}.png`;
  a.click();
}
/*


	var o_png_buf = new Uint8Array(
		await (
			await fetch(`data:image/png;base64,${data.base64}`)
		).arrayBuffer()
	);
	var chunks = pngExtract(o_png_buf);
	console.log(chunks);

	var text_chunks = chunks
		.filter(c => c.name === 'tEXt')
		.map(c => pngText.decode(c.data) )
	console.log(text_chunks)
*/