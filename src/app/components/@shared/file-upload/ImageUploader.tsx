// components/ImageUploader.tsx
import { storage } from "@/app/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Delete } from "lucide-react";
import { useState } from "react";

interface ImageUploaderProps {
  onUpload?: (url: string) => void;
  onDelete?: (url: string) => void;
  value?: string[];
  maxFiles?: number;
  maxFileSize?: number;
  accept?: string[];
  label?: string;
}

export default function ImageUploader({
  onUpload,
  onDelete,
  value,
  maxFiles = 1,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  accept = ["image/jpeg", "image/png", "image/jpg"],
  label = "Upload Image",
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(value?.[0] || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!accept.includes(file.type)) {
      setError("File không đúng định dạng (.jpg, .jpeg, .png)");
      return;
    }

    // Check file size
    if (file.size > maxFileSize) {
      setError(`Dung lượng vượt quá giới hạn ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }

    setError(null);
    setFiles([file]);

    // Hiển thị preview ảnh trước khi upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload ảnh lên Firebase
    setUploading(true);
    try {
      const imageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      onUpload?.(url);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Lỗi upload ảnh");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = () => {
    if (!imageUrl) return;
    onDelete?.(imageUrl);
    setImageUrl(null);
    setPreviewUrl(null);
    setFiles([]);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept={accept.join(",")}
          onChange={handleFileChange}
        />
        {(previewUrl || imageUrl) && (
          <div className="relative h-16 w-16">
            <img
              src={previewUrl || imageUrl!}
              alt="Uploaded"
              className="h-full w-full object-cover rounded-md shadow"
            />
            <button
              type="button"
              onClick={handleDelete}
              className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
            >
              <Delete className="h-4 w-4 text-red-500" />
            </button>
          </div>
        )}
      </div>
      {uploading && <p className="text-gray-500 text-sm">Đang tải lên...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
