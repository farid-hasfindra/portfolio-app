"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { X, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
  value: string;
  name?: string;
  onChange: (url: string, name?: string) => void;
  onRemove: () => void;
  endpoint: keyof OurFileRouter;
  label?: string;
  placeholder?: string;
}

export function FileUpload({
  value,
  name,
  onChange,
  onRemove,
  endpoint,
  label,
  placeholder = "Upload Document"
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-4 w-full">
      {label && <label className="text-sm font-medium text-neutral-300">{label}</label>}
      
      {value ? (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 group">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <FileText size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{name || "Uploaded Document"}</p>
            <p className="text-xs text-neutral-500 truncate">{value}</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 hover:bg-red-500/20 rounded-lg text-neutral-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <UploadDropzone<OurFileRouter, typeof endpoint>
            endpoint={endpoint}
            onUploadBegin={() => setIsUploading(true)}
            onClientUploadComplete={(res) => {
              setIsUploading(false);
              if (res?.[0]) {
                onChange(res[0].url, res[0].name);
              }
            }}
            onUploadError={(error: Error) => {
              setIsUploading(false);
              alert(`ERROR! ${error.message}`);
            }}
            appearance={{
              container: "border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all rounded-2xl p-6 cursor-pointer",
              label: "text-cyan-400 hover:text-cyan-300 font-semibold text-sm",
              allowedContent: "text-neutral-500 text-[10px] mt-1",
              button: "bg-cyan-600 hover:bg-cyan-500 transition-colors text-xs h-8 px-4 rounded-lg mt-3 ut-uploading:bg-cyan-700/50",
            }}
            content={{
              label: isUploading ? "Uploading..." : placeholder,
              allowedContent: "Documents up to 8MB",
            }}
          />
          {isUploading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
                <span className="text-xs text-cyan-400 font-medium">Uploading document...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
