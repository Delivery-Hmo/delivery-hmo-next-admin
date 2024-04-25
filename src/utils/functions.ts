import { UploadFile, message } from "antd";
import { RcFile } from "antd/es/upload";

export const getHeaders = (token: string) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + token
});

export const handleError = (error: any) => {
  console.log(error);

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(error as string);
};

export const onPreviewImage = async (file: UploadFile) => {
  let src = file.url as string;

  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file.originFileObj!);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve("");
    });

    if (!src) {
      message.error(`No se pudo obtener la imagen.`, 4);
      return;
    }
  }

  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
}

export const validFiles = (fileList: RcFile[], accept: string, showMessageError?: boolean) => {
  for (let index = 0; index < fileList.length; index++) {
    const file = fileList[index];
    const types = accept.split(",").map(type => type.trim()) || [];

    if (!types.includes(file.type!)) {
      if (showMessageError) {
        message.error(`Formato incorrecto.`, 4);
      }

      return false;
    }
  }

  return true;
}