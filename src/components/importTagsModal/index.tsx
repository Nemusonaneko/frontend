import useGetTags from "@/queries/useGetTags";
import { FormValues, TagImportValues } from "@/types";
import { UseFormSetValue, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ImportTagsModal({
  opened,
  setOpened,
  setValues,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setValues: UseFormSetValue<FormValues>;
}) {
  const { mutate: getTags } = useGetTags();

  const { handleSubmit, reset, register, setValue } =
    useForm<TagImportValues>({
      defaultValues: {
        site: null,
        url: "",
      },
    });

  const onSubmit = (data: TagImportValues) => {
    getTags(data, {
      onSuccess: (data) => {
        setValues("positivePrompts", data);
        setOpened(false);
        reset();
        toast.success("Successfully imported tags.");
      },
      onError: () => {
        setOpened(false);
        toast.error("Failed to import tags.");
      },
    });
  };

  if (!opened) return null;
  return (
    <div
      className="fixed inset-0 bg-[#00264F] backdrop-blur-sm bg-opacity-75 flex justify-center items-center"
      onClick={() => setOpened(false)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center max-w-md"
      >
        <div
          className="max-lg:hidden h-fit w-full bg-[#002C5C] rounded-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-xl absolute top-1 right-1 hover:bg-[#00264F] rounded-md"
            onClick={() => setOpened(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="p-2 w-full flex flex-col gap-2">
            <p className="text-bold text-sm">Select Site</p>
            <select
              className="w-full bg-[#474678] h-8"
              {...register("site")}
              onChange={(x) => setValue("site", x.target.value)}
            >
              <option>Danbooru</option>
            </select>
            <p className="text-bold text-sm">Input URL</p>
            <input
              className="w-full bg-[#474678] h-8 pl-1 text-sm"
              {...register("url")}
              onChange={(x) => setValue("url", x.target.value)}
            />
            <button
              className="w-full bg-green-600 hover:bg-green-500 rounded py-1 px-1 text-bold text-md"
              type="submit"
            >
              Import
            </button>
          </div>
        </div>
        <div
          className="lg:hidden w-3/4 bg-[#002C5C] rounded-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-xl w-fit absolute top-1 right-1 hover:bg-[#474678] rounded-md"
            onClick={() => setOpened(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="p-2 w-full flex flex-col gap-2">
            <p className="text-bold text-sm">Select Site</p>
            <select
              className="w-full bg-[#474678] h-8"
              {...register("site")}
              onChange={(x) => setValue("site", x.target.value)}
            >
              <option>Danbooru</option>
            </select>
            <p className="text-bold text-sm">Input URL</p>
            <input
              className="w-full bg-[#474678] h-8 pl-1 text-sm"
              {...register("url")}
              onChange={(x) => setValue("url", x.target.value)}
            />
            <button
              className="w-full bg-green-600 hover:bg-green-500 rounded py-1 px-1 text-bold text-md"
              type="submit"
            >
              Import
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
