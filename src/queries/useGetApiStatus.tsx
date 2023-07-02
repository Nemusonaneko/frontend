import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { apiURL } from "./getApiBase";

async function getApiStatus() {
  try {
    const res: Response = await fetch(`${apiURL}`);
    if (res.status !== 200) throw new Error(`Failed to check API status`);
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useGetApiStatus() {
  return useQuery(["apiStatus"], () => getApiStatus(), {
    refetchInterval: 30000,
    onError: () => {
      toast.error("API failed to respond.");
    },
  });
}
