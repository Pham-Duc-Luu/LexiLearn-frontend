import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@nextui-org/react";
import React from "react";

interface HeaderProps {
  className?: string;
  title?: string;
  description?: string;
  onSave?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
  isCreating?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  disabled?: boolean;
  canSave?: boolean;
  canCancel?: boolean;
  canDelete?: boolean;
  canEdit?: boolean;
  canCreate?: boolean;
  onClose?: () => void;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
  onCreateClick?: () => void;
  onSaveDisabled?: boolean;
  onCancelDisabled?: boolean;
  onDeleteDisabled?: boolean;
  onEditDisabled?: boolean;
  onCreateDisabled?: boolean;
}
const Header = ({ className }: HeaderProps) => {
  return (
    <div className={cn(className, "")}>
      <Card>
        <CardContent>
          <div className="flex flex-col space-y-1.5">
            <Input variant="underlined" label="name" type="text" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input variant="underlined" label="description" type="text" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
