import translateModel from "@/utils/translateModel";
import { useQuery } from "react-query";
import { apiURL } from "./getApiBase";

async function getGenStatus(
  model: string | null | undefined,
  jobId: string | number | null | undefined
) {
  try {
    if (!model) return null;
    if (!jobId) return null;
    const res = await fetch(
      `${apiURL}/job/status/${translateModel(
        model
      )}/${jobId}`
    );
    if (res.status !== 200) throw new Error(`Failed to get job status`);
    return await res.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useGetGenStatus(
  model: string | null | undefined,
  jobId: string | number | null | undefined
) {
  return useQuery(
    ["genStatus", model, jobId],
    () => getGenStatus(model, jobId),
    {
      refetchInterval: 3000,
    }
  );
}
