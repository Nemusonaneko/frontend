import { HistoryValues, ResultValues } from "@/types";
import translateModel from "@/utils/translateModel";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { apiURL } from "./getApiBase";

async function getGenResult(values: ResultValues) {
  try {
    if (!values.form.model) throw new Error("No model");
    if (!values.jobId) throw new Error("No Job ID");
    const res: Response = await fetch(
      `${apiURL}/job/result/${translateModel(
        values.form.model
      )}/${values.jobId}`
    );
    if (res.status !== 200) throw new Error("Failed to get generation result");
    const json = await res.json();
    const buffer = Buffer.from(json.base64, "base64");
    const blob = new Blob([buffer]);
    const url = URL.createObjectURL(blob);
    return {
      url,
      base64: json.base64,
      positivePrompts: values.form.positivePrompts,
      negativePrompts: values.form.negativePrompts,
      cfgScale: values.form.cfgScale,
      denoiseStrength: values.form.denoiseStrength,
      model: values.form.model,
      seed: json.seed,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useGetGenResult() {
  return useMutation((values: ResultValues) => getGenResult(values), {
    onSuccess: (data) => {
      let currentLocalStorage: HistoryValues[] = JSON.parse(
        localStorage.getItem("history") ?? "[]"
      );
      const toStore: HistoryValues = {
        base64: data.base64,
        positivePrompts: data.positivePrompts,
        negativePrompts: data.negativePrompts,
        cfgScale: data.cfgScale,
        denoiseStrength: data.denoiseStrength,
        model: data.model,
        seed: data.seed,
      };
      const originalSize = JSON.stringify(currentLocalStorage).length;
      currentLocalStorage.unshift(toStore);
      try {
        localStorage.setItem("history", JSON.stringify(currentLocalStorage));
      } catch {
        try {
          let count = 0;
          const toStoreSize = JSON.stringify(toStore).length;
          let currentSize = originalSize;
          while (currentSize + toStoreSize > originalSize) {
            currentLocalStorage.splice(currentLocalStorage.length - 1, 1);
            count++;
            currentSize = JSON.stringify(currentLocalStorage).length;
          }
          localStorage.setItem("history", JSON.stringify(currentLocalStorage));
          toast.success(
            `Added image to history after removing the last ${count} images.`
          );
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    },
  });
}
