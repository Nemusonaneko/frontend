import { FormValues, HistoryValues } from "@/types";
import downloadImage from "@/utils/downloadImage";
import Image from "next/image";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";

export default function HistoryModal({
  opened,
  setOpened,
  data,
  url,
  setValues,
  isDisabled,
  index,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  data: HistoryValues;
  url: any;
  setValues: UseFormSetValue<FormValues>;
  isDisabled: boolean;
  index: number;
}) {
  const queryClient = useQueryClient();

  const onReplicate = () => {
    if (isDisabled) return;
    setValues("positivePrompts", data.positivePrompts);
    setValues("negativePrompts", data.negativePrompts);
    setValues("cfgScale", data.cfgScale);
    setValues("denoiseStrength", data.denoiseStrength);
    setValues("seed", data.seed);
    setValues("model", data.model);
    setOpened(false);
    toast.success("Replicated tags.");
  };

  const onDelete = () => {
    let current: HistoryValues[] = JSON.parse(
      localStorage.getItem("history") ?? "[]"
    );
    current.splice(index, 1);
    localStorage.setItem("history", JSON.stringify(current));
    queryClient.invalidateQueries();
    setOpened(false);
    toast.success("Deleted image.");
  };

  if (!opened) return null;
  return (
    <div
      className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-75 flex justify-center items-center"
      onClick={() => setOpened(false)}
    >
      <div
        className=" max-lg:hidden w-fit  max-w-5xl h-fit bg-[color:var(--bg0)] rounded-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-xl absolute top-1 right-1 hover:bg-[color:var(--red)] rounded-md"
          onClick={() => setOpened(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-2">
          <div className="columns-2 p-4 flex gap-4">
            <Image src={url} height={512} width={512} alt="image" className="rounded-md"/>
						<div className="flex flex-col justify-evenly">
							<div className="text-md break-all p-2">
								<p>{`Positive Prompts:`}</p>
								<p className="text-sm max-h-40 overflow-y-auto text-[color:var(--green-70)]">
									{data.positivePrompts}
								</p>
								<p>{`Negative Prompts: `}</p>
								<p className="text-sm max-h-40 overflow-y-auto text-[color:var(--red-70)]">
									{data.negativePrompts}
								</p>
								<p>{`CFG Scale: ${data.cfgScale}`}</p>
								<p>{`Denoise Strength: ${data.denoiseStrength}`}</p>
								<p>{`Seed: ${data.seed}`}</p>
								<p>{`Model: ${data.model}`}</p>
							</div>
							<div className="flex gap-1 items-center justify-center">
								<button
									className="min-w-[8rem] px-3 py-2 rounded bg-[color:var(--green)] text-[color:var(--text-on-color)] hover:bg-[color:var(--green-50)]"
									onClick={() => downloadImage(data)}
								>
									Save Image
								</button>
								<button
									className="min-w-[8rem] px-3 py-2 rounded bg-[color:var(--green)] text-[color:var(--text-on-color)] hover:bg-[color:var(--green-50)] disabled:opacity-30"
									onClick={() => onReplicate()}
									disabled={isDisabled}
								>
									Apply&nbsp;Settings
								</button>
								<button
									className="min-w-[8rem] px-3 py-2 rounded bg-[color:var(--red)] text-[color:var(--text-on-color)] hover:bg-[color:var(--red-50)]"
									onClick={() => onDelete()}
								>
									Delete
								</button>
							</div>
						</div>
          </div>

        </div>
      </div>
      <div
        className=" lg:hidden w-4/5 h-fit bg-[color:var(--bg0)] rounded-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-xl absolute top-1 right-1 hover:bg-[color:var(--red)] rounded-md"
          onClick={() => setOpened(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mt-5 p-4 flex flex-col gap-1">
          <div className="justify-center flex">
            <Image src={url} height={512} width={512} alt="image" className="rounded-lg"/>
          </div>
          <div className="text-md break-all pt-2">
            <p>{`Positive Prompts:`}</p>
            <p className="text-sm max-h-[128px] overflow-y-auto text-[color:var(--green-70)]">
              {data.positivePrompts}
            </p>
            <p>{`Negative Prompts: `}</p>
            <p className="text-sm max-h-[128px] overflow-y-auto text-[color:var(--red-70)]">
              {data.negativePrompts}
            </p>
            <p>{`CFG Scale: ${data.cfgScale}`}</p>
            <p>{`Denoise Strength: ${data.denoiseStrength}`}</p>
            <p>{`Seed: ${data.seed}`}</p>
            <p>{`Model: ${data.model}`}</p>
          </div>
          <div className="flex grid-flow-col md:grid gap-2 justify-stretch flex-col md:flex-row">
						<div className="space-x-2 flex ">
							<button
								className="bg-[color:var(--green)] text-[color:var(--text-on-color)] hover:bg-[color:var(--green-50)] rounded grow px-5 lg:py-2 py-3"
								onClick={() => downloadImage(data)}
							>
								Save
							</button>
							<button
								className="bg-[color:var(--green)] text-[color:var(--text-on-color)] hover:bg-[color:var(--green-50)] rounded grow px-5 lg:py-2 py-3"
								onClick={() => onReplicate()}
								disabled={isDisabled}
							>
								Apply&nbsp;Settings
							</button>
						</div>
            <button
              className="bg-[color:var(--red)] text-[color:var(--text-on-color)] hover:bg-[color:var(--red-50)] rounded min-w-[6rem] px-5"
              onClick={() => onDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
