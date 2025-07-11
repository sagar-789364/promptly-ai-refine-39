
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paperclip, X, FileText, Image, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { DatabaseService } from "@/lib/database";

interface AttachmentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  file: File;
  url?: string;
}

interface AttachmentUploadProps {
  onAttachmentsChange: (attachments: AttachmentFile[]) => void;
  className?: string;
}

export function AttachmentUpload({ onAttachmentsChange, className }: AttachmentUploadProps) {
  const { user } = useAuth();
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type === 'application/pdf') return <FileText className="h-4 w-4" />;
    if (type.includes('document') || type.includes('word')) return <FileText className="h-4 w-4" />;
    if (type.includes('excel') || type.includes('spreadsheet')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to upload files",
        variant: "destructive",
      });
      return;
    }

    const files = Array.from(event.target.files || []);
    const validTypes = [
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    const newAttachments: AttachmentFile[] = [];

    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        continue;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit`,
          variant: "destructive",
        });
        continue;
      }

      try {
        // Upload file to Supabase storage
        const uploadResult = await DatabaseService.uploadFile(user.id, file, 'workspace');
        
        if (uploadResult.error) {
          throw new Error(uploadResult.error.message);
        }

        newAttachments.push({
          id: Date.now() + Math.random().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          file: file,
          url: uploadResult.data?.url
        });

        // Track file upload event
        await DatabaseService.trackEvent(user.id, 'file_uploaded', {
          file_name: file.name,
          file_type: file.type,
          file_size: file.size
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }

    if (newAttachments.length > 0) {
      const updatedAttachments = [...attachments, ...newAttachments];
      setAttachments(updatedAttachments);
      onAttachmentsChange(updatedAttachments);

      toast({
        title: "Files uploaded",
        description: `${newAttachments.length} file(s) uploaded successfully`,
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    const updatedAttachments = attachments.filter(att => att.id !== id);
    setAttachments(updatedAttachments);
    onAttachmentsChange(updatedAttachments);
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".txt,.jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="hover:bg-accent/50"
      >
        <Paperclip className="h-4 w-4" />
      </Button>

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {attachments.map((attachment) => (
            <Badge
              key={attachment.id}
              variant="secondary"
              className="flex items-center gap-2 px-3 py-1 bg-accent/50 text-foreground"
            >
              {getFileIcon(attachment.type)}
              <span className="text-xs">
                {attachment.name} ({formatFileSize(attachment.size)})
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive/20"
                onClick={() => removeAttachment(attachment.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
