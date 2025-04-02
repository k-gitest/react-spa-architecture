import { z } from 'zod';
import { clientConfigSchema } from '../schemas/fetch-client-schema';

export type ClientConfig = z.infer<typeof clientConfigSchema>;

export interface InitOptions {
  baseUrl?: string;
  timeout?: number;
  maxRetry?: number;
  retryDelay?: number;
  baseBackoff?: number;
  retryStatus?: number[];
  retryMethods?: string[];
}

export interface RequestOptions extends RequestInit {
  retryEnabled?: boolean;
  type?: DataType;
}

export type DataType = 'json' | 'text' | 'blob' | 'arrayBuffer';
