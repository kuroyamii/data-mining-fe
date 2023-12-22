import { BaseAPI } from "./baseAPI";

const uploadImage = async (formData: FormData) => {
  try {
    const res = await BaseAPI.post("/classify", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    // return e;
  }
};

export default { uploadImage };
