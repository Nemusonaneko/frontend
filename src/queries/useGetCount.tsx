import { useQuery } from "react-query";
import { apiURL } from "./getApiBase";

async function getCount() {
  try {
    const res = await fetch(`${apiURL}/job/count`);
    if (res.status === 200) {
      const result = await res.text();
      return JSON.parse(result);
    } else {
      throw new Error("Failed to get count");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useGetCount() {
  return useQuery(["count"], () => getCount(), {
    refetchInterval: 5000,
  });
}
