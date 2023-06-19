import useGetHistory from "@/queries/useGetHistory";
import HistoryImage from "../history/historyImage/";
import { UseFormSetValue } from "react-hook-form";
import { FormValues, HistoryValues } from "@/types";
import { useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

export default function History({
  setValues,
  isDisabled,
}: {
  setValues: UseFormSetValue<FormValues>;
  isDisabled: boolean;
}) {
  const { data: historyData } = useGetHistory();
  const queryClient = useQueryClient();

  const deleteAll = () => {
    localStorage.removeItem("history");
    queryClient.invalidateQueries();
    toast.success("Deleted all images.")
  };

  return (
    <div className="w-full pt-2">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-2xl lg:text-3xl">
          Recently Generated Images
        </h1>
        <button
          className="bg-red-600 hover:bg-red-500 rounded px-2 py-1 text-sm font-bold mt-1"
          onClick={() => deleteAll()}
        >
          Delete All
        </button>
      </div>
      <div className=" flex overflow-x-auto overflow-y-hidden gap-1 p-1">
        {historyData?.map((x: HistoryValues, i: number) => {
          return (
            <HistoryImage
              key={i}
              data={x}
              index={i}
              setValues={setValues}
              isDisabled={isDisabled}
            />
          );
        })}
      </div>
    </div>
  );
}
