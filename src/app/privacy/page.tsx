import Link from "next/link";

export default function Privacy() {
  return (
    <div>
      <h1 className="font-bold text-3xl">Privacy</h1>
      <p className="text-lg">{`By using this service you consent to the following terms:`}</p>
      <p>
        {`- The service utilizes Cloudflare to protect this service from attacks and provide website analytics. This will introduce cookies onto this site and you can learn more `}
        <Link href="https://developers.cloudflare.com/fundamentals/get-started/reference/cloudflare-cookies/" className="underline-offset-2 underline">
          here
        </Link>
        {"."}
      </p>
      <p>{`- The prompts that you submit are only stored temporarily to generate your image.`}</p>
      <p>{`- Images that are generated will only be stored temporarily and are deleted after a period of time.`}</p>
      <p>{`- Only data that is stored is a counter that stores how many generations have been requested from this service.`}</p>
      <p>{`- Images that you generate are stored in local storage and cannot be accessed by Nemu.`}</p>
    </div>
  );
}
