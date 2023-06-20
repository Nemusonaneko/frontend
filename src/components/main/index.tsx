"use client";
import Image from "next/image";
import dogo from "../../../public/DogO.png";
import { useForm } from "react-hook-form";
import History from "@/components/history";
import { FormValues } from "@/types";
import useGetCount from "@/queries/useGetCount";
import React from "react";
import useGetGenQueue from "@/queries/useGetGenQueue";
import useGetGenStatus from "@/queries/useGetGenStatus";
import useGetGenResult from "@/queries/useGetGenResult";
import useSubmitPrompt from "@/queries/useSubmitPrompt";
import { useQueryClient } from "react-query";
import translateStatus from "@/utils/translateStatus";
import ImportTagsModal from "@/components/importTagsModal";
import downloadImage from "@/utils/downloadImage";
import downloadPrompt from "@/utils/downloadPrompt";
import toast from "react-hot-toast";

export default function Main() {
  const [genFetched, setGenFetched] = React.useState<boolean>(false);
  const [importTagsOpened, setImportTagsOpened] =
    React.useState<boolean>(false);
  const [lastGenValues, setLastGenValues] = React.useState<FormValues | null>(
    null
  );
  const [cooldown, setCooldown] = React.useState<number>(0);
  const [cooldownEnd, setCooldownEnd] = React.useState<number>(Date.now());
  const [toastId, setToastId] = React.useState<string | null>(null);

  const queryClient = useQueryClient();

  const { register, handleSubmit, getValues, watch, setValue, reset } =
    useForm<FormValues>({
      defaultValues: {
        positivePrompts: "",
        negativePrompts: "",
        cfgScale: 10,
        denoiseStrength: 0.5,
        model: null,
        seed: "-1",
      },
    });

  const watchFields = watch();
  const { data: waifuCount } = useGetCount();
  const { data: amtInQueue } = useGetGenQueue(getValues("model"));
  const {
    mutate: submitGen,
    data: returnedJobId,
    isLoading: submittingGen,
  } = useSubmitPrompt();
  const { data: genStatus, isLoading: fetchingGenStatus } = useGetGenStatus(
    lastGenValues?.model,
    returnedJobId
  );
  const { mutate: fetchResult, data: genData } = useGetGenResult();

  const disableInput =
    translateStatus(genStatus) === "In Queue" ||
    translateStatus(genStatus) === "Generating" ||
    fetchingGenStatus ||
    submittingGen;

  React.useEffect(() => {
    if (genStatus !== "completed" || genFetched || !lastGenValues) return;
    fetchResult(
      { form: lastGenValues, jobId: returnedJobId },
      {
        onSuccess: (data) => {
          toast.remove(toastId!);
          toast.success("Generated image.");
          setGenFetched(true);
          queryClient.invalidateQueries();
        },
      }
    );
  }, [
    returnedJobId,
    genStatus,
    genFetched,
    fetchResult,
    lastGenValues,
    queryClient,
    setValue,
    toastId,
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const time = Math.floor((cooldownEnd - Date.now()) / 1e3);
      setCooldown(0 > time ? 0 : time);
    }, 1e3);
    return () => clearInterval(interval);
  }, [cooldownEnd]);

  const onSubmit = (data: FormValues) => {
    submitGen(data, {
      onSuccess: () => {
        setLastGenValues(data);
        setGenFetched(false);
        setCooldownEnd(Date.now() + 30 * 1e3);
        toast.success("Added prompts to queue.");
        setToastId(toast.loading("Processing prompts..."));
        queryClient.invalidateQueries();
      },
    });
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-sm">{`Amount Generated (Started counting ${(
            (Date.now() / 1e3 - 1686826200) /
            86400
          ).toFixed(2)} days ago)`}</p>
          <div className="flex gap-3 text-sm">
            <p>{`This hour: ${waifuCount && waifuCount.hour}`}</p>
            <p>{`This day: ${waifuCount && waifuCount.day}`}</p>
            <p>{`This week: ${waifuCount && waifuCount.week}`}</p>
          </div>
          <div className="lg:visible max-lg:hidden">
            <div className="gap-2 flex">
              <div className="min-w-fit min-h-fit mt-auto">
                <Image
                  src={genData?.url ?? dogo}
                  alt="image"
                  height={512}
                  width={512}
                />
              </div>
              <div className="w-full flex flex-col justify-center mt-auto">
                <div className="w-full">
                  <p className="text-sm">Positive Prompts</p>
                  <textarea
                    {...register("positivePrompts")}
                    className="bg-[#00264F] w-full p-1 resize-none h-36"
                    onChange={(x) =>
                      setValue("positivePrompts", x.target.value)
                    }
                    disabled={disableInput}
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm">Negative Prompts</p>
                  <textarea
                    {...register("negativePrompts")}
                    className="bg-[#00264F] w-full p-1 resize-none h-36"
                    onChange={(x) =>
                      setValue("negativePrompts", x.target.value)
                    }
                    disabled={disableInput}
                  />
                </div>
                <div className="columns-2 w-full">
                  <div className="px-2 py-1 w-full">
                    <p className="text-sm">{`CFG Scale: ${getValues(
                      "cfgScale"
                    )}`}</p>
                    <input
                      {...register("cfgScale")}
                      className="w-full"
                      type="range"
                      min={0}
                      max={20}
                      step={1}
                      onChange={(x) =>
                        setValue("cfgScale", Number(x.target.value))
                      }
                      disabled={disableInput}
                    />
                  </div>
                  <div className="px-2 py-1 w-full">
                    <p className="text-sm">{`Denoise Strength: ${getValues(
                      "denoiseStrength"
                    )}`}</p>
                    <input
                      {...register("denoiseStrength")}
                      className="w-full"
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={(x) =>
                        setValue("denoiseStrength", Number(x.target.value))
                      }
                      disabled={disableInput}
                    />
                  </div>
                </div>
                <div className="columns-2 w-full">
                  <div>
                    <p className="text-bold text-sm">Model</p>
                    <select
                      {...register("model")}
                      className="w-full bg-[#00264F] h-8"
                      placeholder="Select Model"
                      onChange={(x) => setValue("model", x.target.value)}
                      disabled={disableInput}
                    >
                      <option>Anything V4.5</option>
                      <option>AOM3</option>
                      <option>Counterfeit V2.5</option>
                      <option>Nemu (WIP)</option>
                    </select>
                  </div>
                  <div className="pl-2">
                    <p className="text-bold text-sm">Seed</p>
                    <input
                      {...register("seed")}
                      className="bg-[#00264F] w-full h-8 p-1"
                      min={-1}
                      onChange={(x) =>
                        !Number.isNaN(Number(x.target.value)) ||
                        x.target.value === "-"
                          ? setValue("seed", x.target.value)
                          : setValue("seed", getValues("seed"))
                      }
                      disabled={disableInput}
                    />
                  </div>
                </div>
                <div className="columns-2 w-full pt-2">
                  <div className="flex items-center">
                    <p className="text-sm w-full">{`Queue: ${
                      amtInQueue ?? `Select Model`
                    }`}</p>
                    <p className="text-sm w-full">{`Status: ${translateStatus(
                      genStatus
                    )}`}</p>
                  </div>
                  <div className="pl-2 gap-4 flex place-self-end">
                    <button
                      type="button"
                      className="text-sm bg-[#00264F] hover:bg-[#3a3a7c] rounded-md px-1 disabled:bg-gray-600"
                      onClick={() => setValue("seed", genData?.seed)}
                      disabled={disableInput}
                    >
                      Reuse Seed
                    </button>
                    <button
                      type="button"
                      className="text-sm bg-[#00264F] hover:bg-[#3a3a7c] rounded-md px-1 disabled:bg-gray-600"
                      onClick={() => setValue("seed", -1)}
                      disabled={disableInput}
                    >
                      Random Seed
                    </button>
                  </div>
                </div>
                <div className="columns-2 w-full items-center pt-2">
                  <div>
                    <button
                      type="submit"
                      className="w-full font-bold py-1 bg-[#337357] hover:bg-[#3f906b] rounded-lg text-xl disabled:bg-gray-600"
                      disabled={
                        disableInput || cooldown > 0 || !getValues("model")
                      }
                    >
                      {`Generate ${cooldown > 0 ? `(${cooldown})` : ""}`}
                    </button>
                  </div>
                  <div className="gap-2 align-middle flex pl-2 pt-1 w-fit">
                    <button
                      type="button"
                      className="font-bold py-1 bg-[#337357] hover:bg-[#3f906b] rounded-lg px-1 text-sm disabled:bg-gray-600"
                      disabled={disableInput || !genData}
                      onClick={() => downloadImage(genData!)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="font-bold py-1 bg-[#337357] hover:bg-[#3f906b] rounded-lg px-1 text-sm disabled:bg-gray-600"
                      disabled={disableInput || !genData}
                      onClick={() => downloadPrompt(genData!)}
                    >
                      Save Tags
                    </button>
                    <button
                      type="button"
                      className="font-bold py-1 bg-[#337357] hover:bg-[#3f906b] rounded-lg px-1 text-sm disabled:bg-gray-600"
                      disabled={disableInput}
                      onClick={() => setImportTagsOpened(true)}
                    >
                      Import Tags
                    </button>
                    <button
                      type="button"
                      className="font-bold py-1 bg-red-600 hover:bg-red-500 rounded-lg px-1 text-sm disabled:bg-gray-600"
                      onClick={() => reset()}
                      disabled={disableInput}
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden items-center">
            <div className="flex justify-center">
              <Image
                src={genData?.url ?? dogo}
                alt="image"
                height={512}
                width={512}
              />
            </div>
            <div className="flex w-full flex-col justify-center pt-2 gap-2">
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full max-w-lg font-bold px-2 py-1 bg-[#337357] hover:bg-[#3f906b] rounded-lg text-xl disabled:bg-gray-600"
                  disabled={disableInput || cooldown > 0 || !getValues("model")}
                >
                  {`Generate ${cooldown > 0 ? `(${cooldown})` : ""}`}
                </button>
              </div>

              <div className="flex justify-center gap-2 w-full">
                <button
                  type="button"
                  className="font-bold  bg-[#337357] hover:bg-[#3f906b] rounded-lg px-2 text-sm disabled:bg-gray-600"
                  disabled={disableInput || !genData}
                  onClick={() => downloadImage(genData!)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="font-bold bg-[#337357] hover:bg-[#3f906b] rounded-lg px-2 text-sm disabled:bg-gray-600"
                  disabled={disableInput || !genData}
                  onClick={() => downloadPrompt(genData!)}
                >
                  Save Tags
                </button>
                <button
                  type="button"
                  className="font-bold py-1 bg-[#337357] hover:bg-[#3f906b] rounded-lg px-2 text-sm disabled:bg-gray-600"
                  disabled={disableInput}
                  onClick={() => setImportTagsOpened(true)}
                >
                  Import Tags
                </button>
                <button
                  type="button"
                  className="font-bold py-1 bg-red-600 hover:bg-red-500 rounded-lg px-2 text-sm disabled:bg-gray-600"
                  onClick={() => reset()}
                  disabled={disableInput}
                >
                  Reset Form
                </button>
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm">Positive Prompts</p>
              <textarea
                {...register("positivePrompts")}
                className="bg-[#00264F] w-full p-1 resize-none h-32"
                onChange={(x) => setValue("positivePrompts", x.target.value)}
                disabled={disableInput}
              />
            </div>
            <div className="w-full">
              <p className="text-sm">Negative Prompts</p>
              <textarea
                {...register("negativePrompts")}
                className="bg-[#00264F] w-full p-1 resize-none h-32"
                onChange={(x) => setValue("negativePrompts", x.target.value)}
                disabled={disableInput}
              />
            </div>
            <div className="columns-2 w-full">
              <div className="px-2 py-1 w-full">
                <p className="text-sm">{`CFG Scale: ${getValues(
                  "cfgScale"
                )}`}</p>
                <input
                  {...register("cfgScale")}
                  className="w-full"
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  onChange={(x) => setValue("cfgScale", Number(x.target.value))}
                  disabled={disableInput}
                />
              </div>
              <div className="px-2 py-1 w-full">
                <p className="text-sm">{`Denoise Strength: ${getValues(
                  "denoiseStrength"
                )}`}</p>
                <input
                  {...register("denoiseStrength")}
                  className="w-full"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(x) =>
                    setValue("denoiseStrength", Number(x.target.value))
                  }
                  disabled={disableInput}
                />
              </div>
            </div>
            <div className="columns-2 w-full">
              <div>
                <p className="text-bold text-sm">Model</p>
                <select
                  {...register("model")}
                  className="w-full bg-[#00264F] h-8"
                  placeholder="Select Model"
                  onChange={(x) => setValue("model", x.target.value)}
                  disabled={disableInput}
                >
                  <option>Anything V4.5</option>
                  <option>AOM3</option>
                  <option>Counterfeit V2.5</option>
                  <option>Nemu (WIP)</option>
                </select>
              </div>
              <div className="pl-2">
                <p className="text-bold text-sm">Seed</p>
                <input
                  {...register("seed")}
                  className="bg-[#00264F] w-full h-8 p-1"
                  onChange={(x) =>
                    !Number.isNaN(Number(x.target.value)) ||
                    x.target.value === "-"
                      ? setValue("seed", x.target.value)
                      : setValue("seed", getValues("seed"))
                  }
                  disabled={disableInput}
                />
              </div>
            </div>
            <div className="columns-2 w-full pt-2">
              <div className="flex">
                <p className="text-sm w-full">{`Queue: ${
                  amtInQueue ?? `Select Model`
                }`}</p>
                <p className="text-sm w-full">{`Status: ${translateStatus(
                  genStatus
                )}`}</p>
              </div>
              <div className="pl-2 gap-4 flex place-self-end">
                <button
                  type="button"
                  className="text-sm bg-[#00264F] hover:bg-[#3a3a7c] rounded-md px-1 disabled:bg-gray-600"
                  onClick={() => setValue("seed", genData?.seed)}
                  disabled={disableInput}
                >
                  Reuse
                </button>
                <button
                  type="button"
                  className="text-sm bg-[#00264F] hover:bg-[#3a3a7c] rounded-md px-1 disabled:bg-gray-600"
                  onClick={() => setValue("seed", -1)}
                  disabled={disableInput}
                >
                  Random
                </button>
              </div>
            </div>
          </div>
        </form>
        <History setValues={setValue} isDisabled={disableInput} />
      </div>
      <ImportTagsModal
        setOpened={setImportTagsOpened}
        opened={importTagsOpened}
        setValues={setValue}
      />
    </>
  );
}
