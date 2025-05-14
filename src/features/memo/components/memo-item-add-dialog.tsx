import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type MemoItemAddDialogProps = {
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
};

export const MemoItemAddDialog = ({
  buttonTitle,
  dialogTitle,
  dialogDescription,
  placeholder,
  value,
  setValue,
  onSubmit,
}: MemoItemAddDialogProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      isDesktop={isDesktop}
      buttonTitle={buttonTitle}
      dialogTitle={dialogTitle}
      dialogDescription={dialogDescription}
      className="flex justify-center"
    >
      <div className="flex flex-col gap-4">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
        <Button type="button" onClick={onSubmit}>
          送信
        </Button>
      </div>
    </ResponsiveDialog>
  );
};
