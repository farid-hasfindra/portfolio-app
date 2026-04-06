"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
  maxFiles?: number;
  endpoint: keyof OurFileRouter;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  maxFiles = 1,
  endpoint,
  label
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-4 w-full">
      {label && <label className="text-sm font-medium text-neutral-300">{label}</label>}
      
      <div className="flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[120px] h-[120px] rounded-xl overflow-hidden border border-white/10 group">
            <div className="absolute top-1 right-1 z-10">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="p-1 bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
            <Image
              fill
              src={url}
              alt="Upload"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {(value.length < maxFiles) && (
        <div className="relative">
          <UploadDropzone<OurFileRouter, typeof endpoint>
            endpoint={endpoint}
            onUploadBegin={() => setIsUploading(true)}
            onClientUploadComplete={(res) => {
              setIsUploading(false);
              const urls = res.map((file) => file.url);
              onChange([...value, ...urls]);
            }}
            onUploadError={(error: Error) => {
              setIsUploading(false);
              alert(`ERROR! ${error.message}`);
            }}
            appearance={{
              container: "border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all rounded-2xl p-8 cursor-pointer",
              label: "text-cyan-400 hover:text-cyan-300 font-semibold",
              allowedContent: "text-neutral-500 text-xs mt-1",
              button: "bg-cyan-600 hover:bg-cyan-500 transition-colors text-sm h-9 px-4 rounded-xl mt-4 ut-uploading:bg-cyan-700/50",
            }}
            content={{
              label: isUploading ? "Uploading..." : `Upload ${maxFiles === 1 ? "Thumbnail" : "Gallery"}`,
              allowedContent: "Images up to 4MB",
            }}
          />
          {isUploading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Processing images...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
