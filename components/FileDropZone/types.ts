export type ImageFile = File & {
  preview: string;
};

export type FileDropZonePropsType = {
  value: ImageFile[] | undefined;
  onChange: (files: ImageFile[]) => void;
};
