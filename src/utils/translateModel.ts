/* if you are adding anything here, you NEED to update the format_sd_embed function's switch block in extractTagsFromImage*/

const models = new Map([
	["Anything V4.5", "anything"],
	["AOM3", "aom"],
	["Counterfeit V2.5", "counterfeit"],
	["Nemu (WIP)", "nemu"]
])
const modelsReverse = new Map(Array.from(models, a => a.reverse()));

export default function translateModel(model, reverse=false) {
	return (reverse?modelsReverse:models).get(model);
}


