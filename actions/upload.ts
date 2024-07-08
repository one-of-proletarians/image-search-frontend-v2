"use server";

import type { UploadData } from "@/types";

const upload = async (formData: FormData): Promise<string> => {
  const itemsData: UploadData = {};
  let index = 0;

  formData.forEach((value, key) => {
    if (index++ === 0) return;
    const [item, field] = key.split("--");

    if (!itemsData[item]) {
      itemsData[item] = { images: [] };
    }

    if (value instanceof File) {
      itemsData[item].images.push(value);
    } else {
      itemsData[item][field] = value;
    }
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("files");
    }, 2000);
  });
};

export default upload;
