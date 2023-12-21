import { BaseAPI } from "./baseAPI";

const uploadImage = async (formData: FormData) => {
  return BaseAPI.post("/classify", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default { uploadImage };
