import { GenDataValues, HistoryValues } from "@/types";

export default function downloadImage(data: GenDataValues | HistoryValues) {
  const a = document.createElement("a");
  a.setAttribute("href", `data:image/png;base64,${data.base64}`);
  a.download = `nemuswaifugen-${data.base64.slice(0, 10)}-${data.seed}.png`;
  a.click();
}
