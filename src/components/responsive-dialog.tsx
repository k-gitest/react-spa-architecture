import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";

export const ResponsiveDialog = React.memo(({
  open,
  onOpenChange,
  isDesktop,
  buttonTitle,
  dialogTitle,
  dialogDescription,
  className,
  children,
  hasOverflow,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isDesktop: boolean;
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  className?: string;
  children: ReactNode;
  hasOverflow?: boolean;
}) => {
  const overflowClass = hasOverflow ? 'overflow-y-auto' : '';

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <div className={cn("w-full", className)}>
          <DialogTrigger asChild>
            <Button variant="outline">{buttonTitle}</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <div className={`max-h-[60vh] ${overflowClass}`}>
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <div className={cn("w-full", className)}>
        <DrawerTrigger asChild>
          <Button variant="outline">{buttonTitle}</Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>
            {dialogDescription}
          </DrawerDescription>
        </DrawerHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {children}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
