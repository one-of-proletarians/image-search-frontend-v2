"use server";

export default async function (formData: FormData) {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}
