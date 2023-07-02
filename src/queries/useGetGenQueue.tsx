import translateModel from "@/utils/translateModel";
import { useQuery } from "react-query";
import { apiURL } from "./getApiBase";

async function getGenQueue(model: string | null | undefined) {
  try {
    if (!model) return;
    const res: Response = await fetch(
      `${apiURL}/job/queue/${translateModel(model)}`
    );
    if (res.status !== 200) throw new Error(`Failed to get queue for ${model}`);
    return await res.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useGetGenQueue(model: string | null | undefined) {
  return useQuery(["genQueue", model], () => getGenQueue(model), {
    refetchInterval: 30000
  });
}
