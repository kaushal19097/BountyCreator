import { ChangeEvent, useEffect, useRef, useState } from "react";
import { RequiredStar } from "./RequiredStar";

type FileUploadProps = {
  label: string;
  required?: boolean;
  value: File | null;
  onFileChange: (file: File | null) => void;
};

export const FileUpload = ({ label, required = false, value, onFileChange }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
        {required && <RequiredStar className="ml-2" />}
      </label>
      {previewUrl ? (
        <div className="flex items-center justify-between gap-4 rounded-xl border-2 border-dashed border-slate-300 p-4" style={{ background: "#F7F7F7" }}>
          <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-lg bg-slate-900">
            <img src={previewUrl} alt="Uploaded logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex gap-2 ">
            <button
              type="button"
              onClick={handleRemove}
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8 transition hover:border-slate-400" style={{ background: "#F7F7F7" }}>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-2xl font-light text-slate-400">
            +
          </div>
          <p className="mb-2 text-sm text-slate-400">click to choose files</p>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-500">
              i
            </span>
            <span>Max file size: 2 MB; Ideal dimensions: 20×20 px</span>
          </div>
        </label>
      )}
    </div>
  );
};

