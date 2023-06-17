import { GenDataValues, HistoryValues } from "@/types";

export default function downloadPrompt(data: GenDataValues | HistoryValues) {
  const a = document.createElement("a");
  const toSave = {
    Postive: data.positivePrompts,
    Negative: data.negativePrompts,
    "CFG Scale": data.cfgScale,
    "Denoise Strength": data.denoiseStrength,
    Model: data.model,
    Seed: data.seed,
  };
  a.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(
      JSON.stringify(toSave)
    )}`
  );
  a.download = `nemuswaifugen-${data.base64.slice(0, 10)}-${data.seed}.txt`;
  a.click();
}
