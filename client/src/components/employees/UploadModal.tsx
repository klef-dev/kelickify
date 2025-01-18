import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function UploadModal({ open, onClose }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

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
      toast({
        title: "Invalid file type",
        description: "Please upload only XLS or CSV files",
        variant: "destructive",
      });
      return;
    }

    // Handle the valid files here
    toast({
      title: "Files uploaded",
      description: `Successfully uploaded ${validFiles.length} file(s)`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-xl sm:max-w-lg max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <div
          className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center bg-gray-100 ${
            dragActive ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Image alt="Upload" height={80} width={80} objectFit="contain" src={"/upload-icon.png"} className="mx-auto" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop your files here or
            <br />{" "}
            <label className="text-primary hover:underline cursor-pointer">
              click to upload
              <input type="file" className="hidden" accept=".xls,.xlsx,.csv" onChange={handleFileInput} />
            </label>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Supported formats: XLS, CSV</p>
          <p className="text-xs text-gray-500">Maximum file size: 25MB</p>
        </div>

        <div className="mt-4 bg-gray-100 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <Image alt="Upload" height={50} width={50} objectFit="contain" src={"/excel-logo.png"} />
            <div className="flex-1 w-4/5">
              <h4 className="font-medium">Table Example</h4>
              <p className="text-xs text-gray-500 mt-2">
                You can download the attached example and use them as a starting point for your own file.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <DownloadIcon />
              Download XLSX
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
