import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FaXmark } from "react-icons/fa6";
import { AiFillFileImage } from "react-icons/ai";

export type ImageFile = File & {
  preview: string;
};

type FileDropZonePropsType = {
  value: ImageFile[] | undefined;
  onChange: (files: ImageFile[]) => void;
};

const baseStyle = {
  border: "2px dashed #d4d4d4",
  borderColor: "#EEEEEE",
};
const focusedStyle = { borderColor: "#2196f3" };
const acceptStyle = { borderColor: "#65ab32" };
const rejectStyle = { borderColor: "#ff1744" };

const FileDropZone = ({ value = [], onChange }: FileDropZonePropsType) => {
  const onDrop = useCallback(
    (acceptedImageFiles: File[]) => {
      if (acceptedImageFiles.length) {
        const newImageFiles = acceptedImageFiles.map((image) =>
          Object.assign(image, { preview: URL.createObjectURL(image) }),
        );
        onChange([...value, ...newImageFiles]);
      }
    },
    [value, onChange],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  const removeImageFile = (imageName: string) => {
    onChange(value.filter((file) => file.name !== imageName));
  };

  return (
    <div className="p-10 rounded-2xl bg-ecru-white">
      <div className="file-dropzone-area" {...getRootProps({ style })}>
        <label htmlFor="image">Add an image (optional)</label>
        <AiFillFileImage
          size={70}
          className={`${isDragActive ? "text-apple" : "text-old-gold"} hover:text-apple cursor-pointer`}
        />
        <input
          className="input text-outer-space cursor-pointer"
          type="file"
          multiple
          {...getInputProps()}
        />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop images here or click to select files</p>
        )}
      </div>
      <ul className="flex flex-wrap gap-2">
        {value &&
          value.map((file, index) => (
            <li key={index} className=" flex h-30 w-30 relative rounded-md bg-apple">
              <div className="h-full w-full">
                <img
                  className="h-full w-full object-cover rounded-md"
                  src={file.preview}
                  alt=""
                />
              </div>
              <button
                type="button"
                className="w-5 h-5 bg-red-400 absolute right-0"
                onClick={() => removeImageFile(file.name)}
              >
                <FaXmark className="w-full h-full fill-ecru-white hover:fill-red-400 hover:bg-ecru-white cursor-pointer" />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FileDropZone;