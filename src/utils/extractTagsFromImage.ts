/* nodejs compatible! */
const extract = require('png-chunks-extract');
const encode = require('png-chunks-encode');
const text = require('png-chunk-text');

function toMap(q){
	return new Map(Object.entries(q));
}

function format_sd_embed(text){
	var textArray = text.replace('\n\n','\n').split('\n');

	var metadata = Object.fromEntries(
		textArray.pop()
			.split(', ')
			.map(e => e.split(': '))
	);

	// eventually, ill make this source from https://github.com/nemusonaneko/waifus-api/blob/main/api.ts
	/* eslint-disable */
	var model_defaults = {unknown:true};
	switch(metadata.Model){
		case "anything-v4.5": model_defaults = {
			route:"anything",
			positive:"masterpiece, best quality",
			negative:"EasyNegative, extra fingers,fewer fingers, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name"
		}; break;

		case "aom3": model_defaults = {
			route:"aom",
			positive:"",
			negative:"EasyNegative, (worst quality, low quality:1.4), lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name"
		}; break;

		case "counterfeit-v2.5": model_defaults = {
			route:"counterfeit",
			positive:"((masterpiece,best quality))",
			negative:"EasyNegative, extra fingers,fewer fingers, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name"
		}; break;

		case "nemu-5": model_defaults = {
			route:"nemu",
			positive:"masterpiece, best quality, ultra-detailed, absurdres",
			negative:"lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)), signature, watermark"
		}; break;

		default:
			model_defaults = {
				route:"UNKNOWN",
				positive:"",
				negative:""
			};
			console.warn("Unable to determine model of file, Tags can still be extracted.");
		break;

	}
	/* eslint-enable */

	var reto = {
		positive: (model_defaults.positive==", ")?textArray[0]:textArray[0].split(model_defaults.positive+", ")[1],
		negative: (model_defaults.negative==", ")?textArray[1]:textArray[1].split(model_defaults.negative+", ")[1],
		model: model_defaults.route,
		metadata: toMap(metadata),
		assumed:  toMap(model_defaults)
	};

	return reto;
}


/* rejections are for hard-errors, resolves are for soft errors */
/* rejections are treated like 50x's, you should never programmatically return a 50x */
function error(str){ return {error:true, message:str} }

export default async function extractTagsFromImage(file){
	return new Promise(function(resolve, reject){
		var reader = new FileReader();


		reader.onload = async function () {
			try{
				var chunks = extract(new Uint8Array( await(await fetch(reader.result)).arrayBuffer() ))
				var textChunks = chunks
					.filter(c => c.name === 'tEXt')
					.map(c => text.decode(c.data))
					.filter(c => c.keyword === 'parameters');

				if(textChunks.length == 0){ resolve(error('No tags found in image!')) }
				resolve({
					error:false,
					...format_sd_embed(textChunks[0].text)
				});
			}catch(e){
				resolve(error(e.message));
			}
		};
		reader.onerror = function (err) {
			reject(error(err));
		};
		reader.readAsDataURL(file);
	});
}