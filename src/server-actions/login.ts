"use server";

export default async function (formData: any) {
  console.log("login", formData);

  return new Promise((resolve) => setTimeout(resolve, 2000));
}
