import { useMutation } from "react-query";
import { FormValues } from "../types";
import translateModel from "@/utils/translateModel";
import { apiURL } from "./getApiBase";

async function submitPrompt(data: FormValues) {
  try {
    if (!data.model) throw new Error("No Model Selected");
    const body = JSON.stringify({
      prompt: data.positivePrompts,
      negative_prompt: data.negativePrompts,
      cfg_scale: data.cfgScale,
      denoising_strength: data.denoiseStrength,
      seed: data.seed,
    });
    const res: Response = await fetch(
      `${apiURL}/job/submit/${translateModel(
        data.model
      )}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: body,
      }
    );
    if (res.status !== 201) throw new Error(`Failed to submit job`);
    return await res.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useSubmitPrompt() {
  return useMutation((values: FormValues) => submitPrompt(values));
}
