import { useQuery } from "react-query";
import { HistoryValues } from "../types";

async function getQueue() {
  try {
    const result: HistoryValues[] = JSON.parse(
      localStorage.getItem("history") ?? "[]"
    );
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useGetHistory() {
  return useQuery(["historyQuery"], () => getQueue(), {});
}
