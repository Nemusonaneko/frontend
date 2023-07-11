export default function translateModel(model: string) {
  switch (model) {
    case "Anything V4.5":
      return "anything";
    case "AOM3":
      return "aom";
    case "Counterfeit V2.5":
      return "counterfeit";
    case "Nemu (WIP)": 
      return "nemu";
    default:
      break;
  }
}


