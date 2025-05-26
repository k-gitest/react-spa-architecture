import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  type?: "base64";
  files: File[];
  onChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void | string[]>;
  onError?: string | null;
}

export const FileUploader = (props: FileUploaderProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = [...Array.from(selectedFiles)];
      props.onChange?.(newFiles);
    }
  };

  const handleUploadClick = async () => {
    if (props.onUpload && props.files.length > 0) {
      props.onUpload(props.files);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Input type="file" multiple onChange={handleFileChange} />
      {props.onError && <p className="text-red-500">{props.onError}</p>}
      <Button onClick={handleUploadClick}>送信</Button>
    </div>
  );
};
