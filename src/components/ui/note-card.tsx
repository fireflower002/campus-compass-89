import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, FileImage, FileText, Calendar } from 'lucide-react';
import { formatDateTime } from '@/utils/formatDate';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  content,
  createdAt,
  updatedAt,
  attachments = [],
  onEdit,
  onDelete,
}) => {
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileImage className="h-4 w-4 text-blue-500" />;
    }
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  return (
    <Card className="card-base card-hover group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="heading-md text-card-foreground line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(id)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Edit className="h-4 w-4 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              className="h-8 w-8 p-0 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formatDateTime(updatedAt)}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="body-text text-muted-foreground line-clamp-3 mb-4">
          {content}
        </p>
        
        {attachments.length > 0 && (
          <div className="space-y-2">
            <h4 className="small-text font-medium text-card-foreground">
              Attachments ({attachments.length})
            </h4>
            <div className="space-y-1">
              {attachments.slice(0, 2).map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 p-2 bg-muted rounded-lg"
                >
                  {getFileIcon(attachment.type)}
                  <span className="text-xs truncate flex-1">{attachment.name}</span>
                </div>
              ))}
              {attachments.length > 2 && (
                <div className="text-xs text-muted-foreground px-2">
                  +{attachments.length - 2} more files
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;