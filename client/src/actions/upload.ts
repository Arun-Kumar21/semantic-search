import { FormValues } from "@/components/file-upload/form";
import axios from "axios";

const uploadFiles = async (data: FormValues) => {
  try {
    if (!data.file) {
      return console.error("No file provided");
    }

    const formData = new FormData();
    formData.append("file", data.file[0]);

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/upload`,
      formData
    );

    console.log(res.data);
  } catch (error: any) {
    console.error(error.response.data);
  }
};

export default uploadFiles;
