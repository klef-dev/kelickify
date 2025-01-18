import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowDownToLineIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  handleUpload?: () => void;
}

export function UploadModal({ open, onClose, handleUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(
      (file) =>
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "text/csv",
    );

    if (validFiles.length === 0) {
      toast.error("Invalid file type", { description: "Please upload only XLS or CSV files" });
      return;
    }

    //TODO: Handle the valid files here
    setIsUploading(true);

    setTimeout(() => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2;
        if (currentProgress <= 100) {
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
          setFiles(validFiles);
          toast("Files uploaded", { description: `Successfully uploaded ${validFiles.length} file(s)` });
        }
      }, 50);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-xl sm:max-w-lg max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <div
          className={cn("mt-4 border-2 border-dashed rounded-lg p-8 text-center bg-gray-100 border-gray-300", {
            "border-primary bg-primary/5": dragActive,
          })}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!progress && (
            <>
              <div
                className={cn(
                  "mx-auto w-20 h-20 flex items-center justify-center transition-all duration-1000 opacity-100",
                  { "opacity-0 transform -translate-y-6": isUploading },
                )}
              >
                <Image
                  alt="Upload"
                  height={80}
                  width={80}
                  objectFit="contain"
                  src={"/upload-icon.png"}
                  className="mx-auto"
                />
              </div>

              <p
                className={cn("mt-2 text-sm text-gray-600 transition-all duration-1000 delay-500 opacity-100", {
                  "opacity-0 transform -translate-y-6": isUploading,
                })}
              >
                Drag and drop your files here
              </p>

              <p
                className={cn("mt-1 text-sm text-gray-600 transition-all duration-1000 delay-1000 opacity-100", {
                  "opacity-0 transform -translate-y-6": isUploading,
                })}
              >
                or{" "}
                <label className="font-semibold cursor-pointer">
                  click to upload
                  <input type="file" className="hidden" accept=".xls,.xlsx,.csv" onChange={handleFileInput} />
                </label>
              </p>
            </>
          )}

          {progress > 0 && (
            <div className="mt-10 mb-10">
              <div className="w-1/2 mx-auto">
                <Progress value={progress} className="rounded-sm" />
              </div>
              <p className="mt-4 text-sm text-gray-600 text-center">Please wait while we upload your file...</p>
            </div>
          )}
        </div>

        <style jsx global>{`
          .upload-section {
            transition: all 1s ease-in-out;
          }

          .upload-section.fade-out {
            opacity: 0;
            transform: translateY(-1rem);
          }
        `}</style>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 font-semibold">Supported formats: XLS, CSV</p>
          <p className="text-xs text-gray-500 font-semibold">Maximum file size: 25MB</p>
        </div>

        <div className="mt-4 bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <Image alt="Upload" height={50} width={50} objectFit="contain" src={"/excel-logo.png"} />
            <div className="flex-1 w-4/5">
              <h4 className="font-medium">Table Example</h4>
              <p className="text-xs text-gray-500 mt-2">
                You can download the attached example and use them as a starting point for your own file.
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              <ArrowDownToLineIcon />
              Download XLSX
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              if (files.length) {
                handleUpload?.();
                onClose();
              }
            }}
            disabled={!files.length}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
