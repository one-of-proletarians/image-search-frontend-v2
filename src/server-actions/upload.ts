"use server";

import type { UploadData } from "@/types";

import { fileTypeFromBlob } from "file-type";

const upload = async (formData: FormData) => {
  const itemsData: UploadData = {};

  formData.forEach((value, key) => {
    if (key.startsWith("$")) return;

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

  for (const item of Object.values(itemsData)) {
    for (const image of item.images) {
      const { mime } = (await fileTypeFromBlob(image))!;

      if (mime.includes("image")) {
        return JSON.stringify({ name: image.name, mime });
      }

      console.log(image.name, mime);
    }
  }
};

export default upload;
