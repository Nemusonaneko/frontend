export interface FormValues {
  positivePrompts: string;
  negativePrompts: string;
  cfgScale: number;
  denoiseStrength: number;
  model: string | null;
  seed: string | number;
}

export interface HistoryValues {
  base64: string;
  positivePrompts: string;
  negativePrompts: string;
  cfgScale: number;
  denoiseStrength: number;
  model: string | null;
  seed: string | number;
}

export interface ResultValues {
  form: FormValues;
  jobId: number | string | undefined;
}

export interface TagImportValues {
  site: string | undefined | null;
  url: string;
}

export interface GenDataValues {
  url: string;
  base64: any;
  positivePrompts: string;
  negativePrompts: string;
  cfgScale: number;
  denoiseStrength: number;
  model: string;
  seed: any;
}
