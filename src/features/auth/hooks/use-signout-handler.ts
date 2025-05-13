import { useBehaviorVariant } from '@/hooks/use-behavior-variant';
import { signOutAuthService } from '@/features/auth/services/authService';
import { useAuth } from '@/features/auth/hooks/use-auth-queries-tanstack';
import { useAuth as useAuthTRPC } from '@/features/auth/hooks/use-auth-queries-trpc';

type SignOutHandlerOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const useSignOutHandler = () => {
  const { getCurrentVariant } = useBehaviorVariant();
  const variant = getCurrentVariant();
  const { signOutMutation } = useAuth();
  const { signOutMutation: signOutMutationTRPC } = useAuthTRPC();

  const handleSignOut = async ({ onSuccess, onError }: SignOutHandlerOptions = {}) => {
    if (variant.id === 'tanstack') {
      signOutMutation.mutate();
      return;
    }

    if (variant.id === 'trpc') {
      signOutMutationTRPC.mutate();
      return;
    }

    try {
      await signOutAuthService();
      onSuccess?.();
    } catch (error) {
      onError?.(error);
    }
  };

  const isPending =
    variant.id === 'tanstack'
      ? signOutMutation.isPending
      : variant.id === 'trpc'
        ? signOutMutationTRPC.isPending
        : false;

  return { handleSignOut, isPending };
};
