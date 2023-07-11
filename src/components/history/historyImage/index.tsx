import Image from "next/image";
import cute from "../../../../public/cute.gif";
import React from "react";
import HistoryModal from "../historyModal";
import { FormValues, HistoryValues } from "@/types";
import { UseFormSetValue } from "react-hook-form";

/* firefox winges about images "not having a src attribute". this fixes that by defaulting to a blank pixel*/
var blank_pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

export default function HistoryImage({
  data,
  index,
  setValues,
  isDisabled
}: {
  data: HistoryValues;
  index: number;
  setValues: UseFormSetValue<FormValues>;
  isDisabled: boolean
}) {
  const [opened, setOpened] = React.useState<boolean>(false);
  const [url, setUrl] = React.useState<any>();
  React.useEffect(() => {
    try {
      const buffer = Buffer.from(data.base64, "base64");
      const blob = new Blob([buffer]);
      setUrl(URL.createObjectURL(blob));
    } catch {
      setUrl(cute);
    }
  }, [index, data.base64]);
  return (
    <>
      <HistoryModal opened={opened} setOpened={setOpened} data={data} url={url} setValues={setValues} isDisabled={isDisabled} index={index} />
      <Image
        src={url?url:blank_pixel}
        height={256}
        width={256}
        alt="image"
        className="m-1"
        onClick={() => setOpened(true)}
      />
    </>
  );
}
