import { z } from 'zod';
import { validatedProfile } from '@/features/profile/schemas/profile-schema';

export type Profile = z.infer<typeof validatedProfile>;

export interface ProfileOutput extends Profile {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
