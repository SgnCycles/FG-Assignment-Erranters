import { createClient } from "./serverClient";
import { v4 as uuid } from "uuid";

const uploadCoverImage = async (image: File) => {
  const supabase = await createClient();
  const imageName: string[] = image.name.split(".");
  const uniqueImageName = `${imageName[0]}-${uuid()}.${imageName[1]}`;

  const { data, error } = await supabase.storage
    .from("Cover-Images")
    .upload(uniqueImageName, image);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = await supabase.storage.from("Cover-Images").getPublicUrl(data.path);

  return publicUrl;
};

export default uploadCoverImage;