import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, X, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
    const validFiles = files.filter(file => 
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
      file.type === "text/csv"
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div
          className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop your files here or{" "}
            <label className="text-primary hover:underline cursor-pointer">
              click to upload
              <input
                type="file"
                className="hidden"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileInput}
              />
            </label>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: XLS, CSV
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Maximum file size: 25MB
          </p>
        </div>

        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <FileSpreadsheet className="h-8 w-8 text-primary mr-3" />
            <div className="flex-1">
              <h4 className="text-sm font-medium">Table Example</h4>
              <p className="text-xs text-gray-500">
                You can download the attached example and use them as a starting point for your own file.
              </p>
            </div>
            <Button variant="outline" size="sm">
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