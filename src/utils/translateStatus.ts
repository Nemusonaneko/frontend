export default function translateStatus(status: string | null | undefined) {
  switch (status) {
    case "completed":
      return "Successful";
    case "failed":
      return "Failed";
    case "waiting":
      return "In Queue";
    case "delayed":
      return "In Queue";
    case "active":
      return "Generating";
    default:
      return "Idle";
  }
}
