export type IntroductionImageSlot = "groom" | "bride" | "gallery";

export type IntroductionImage = {
  id: string;
  slot: IntroductionImageSlot;
  label: string;
  src: string;
  createdAt: string;
};

export const INTRODUCTION_IMAGES_STORAGE_KEY = "introduction-ceremony-images";

export function getIntroductionImages() {
  if (typeof window === "undefined") {
    return [] as IntroductionImage[];
  }

  try {
    const saved = window.localStorage.getItem(INTRODUCTION_IMAGES_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as IntroductionImage[]) : [];
  } catch {
    return [] as IntroductionImage[];
  }
}

export function saveIntroductionImages(images: IntroductionImage[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(INTRODUCTION_IMAGES_STORAGE_KEY, JSON.stringify(images));
  window.dispatchEvent(new Event("introduction-images-updated"));
}

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}