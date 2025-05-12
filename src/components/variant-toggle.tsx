import { useBehaviorVariant } from "@/hooks/use-behavior-variant";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export const VariantToggle = () => {
  const { toggleVariant, getCurrentVariant } = useBehaviorVariant();
  const currentVariant = getCurrentVariant();
  
  return (
    <div className="flex justify-center mb-6">
      <Button 
        onClick={toggleVariant}
        className="flex items-center gap-2"
      >
        <RotateCw className="h-4 w-4" />
        <span>実装切替: {currentVariant.name}</span>
      </Button>
    </div>
  );
};