import axios, { CancelTokenSource } from "axios";
import { BaseAPI } from "./baseAPI";

const uploadImage = async (
  formData: FormData,
  cancelToken: CancelTokenSource
) => {
  try {
    const res = await BaseAPI.post("/classify", formData, {
      cancelToken: cancelToken.token,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("canceled");
      console.log(e.message);
      return null;
    }
    console.log(e);
    // return e;
  }
};

export default { uploadImage };
