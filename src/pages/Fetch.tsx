import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FetchClient } from '@/lib/fetchClient';
import { trpc as trpcClient } from '@/lib/trpc';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';
import { TRPCClientError } from '@trpc/client';
import { SUPABASE_ANON_KEY } from '@/lib/constants';
import { useSessionStore } from '@/hooks/use-session-store';
import { EDGE_REST_URI } from '@/lib/constants';
import { FileUploader } from '@/components/file-uploader';
import { fetchImagesService, deleteImageService, uploadImageStorageService } from '@/services/ImageService';
import { getImageUrl } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { getExtensionIfAllowed, convertFileToBase64 } from '@/lib/utils';

const http = new FetchClient();
const edge = new FetchClient({
  baseUrl: EDGE_REST_URI,
  timeout: 5000,
  maxRetry: 2,
});

const fetchTodo = async (): Promise<Todo[]> => {
  console.log('fetch!!');
  return http.get<Todo[]>('/todos');
};

type ZodErrorData = {
  zodError?: {
    formErrors?: string[];
    fieldErrors?: Record<string, string[]>;
  };
};

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Image {
  created_at: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  id: string;
  mime_type: string | null;
  storage_object_id: string | null;
  updated_at: string;
  user_id: string;
}

const Fetch = () => {
  const session = useSessionStore((state) => state.session);
  const [todos, setTodos] = useState<Todo[]>([]);

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todo'],
    queryFn: fetchTodo,
    enabled: false,
  });

  /*
  const fetchEdge = useCallback(
    async (id: string) => {
      try {
        const result = await edge.post('/save-memo/drizzle', {
          headers: {
            Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ title: 'test', name: 'test', user_id: id }),
        });
        console.log(result);
      } catch (e) {
        console.error(e);
      }
    },
    [session?.access_token],
  );
  */

  const fetchData = useCallback(async () => {
    try {
      const data = await http.get<Todo[]>('/todos');
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /*
  useEffect(() => {
    if (session?.user?.id) {
      fetchEdge(session.user.id);
    }
  }, [session?.user?.id, fetchEdge]);
  */

  const handleFetch = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ['todo'] });
  }, [queryClient]);

  const helloQuery = useQuery(trpcClient.util.hello.queryOptions());
  const greetQuery = useQuery(trpcClient.util.greet.queryOptions('hoge'));
  const getMemosQuery = useQuery(trpcClient.memo.getMemos.queryOptions());
  const memosKey = useMemo(() => trpcClient.memo.getMemos.queryKey(), []);

  useEffect(() => {
    if (getMemosQuery.error instanceof TRPCClientError) {
      console.log(getMemosQuery.error?.data);
    }
  }, [getMemosQuery.error]);

  useEffect(() => {
    if ((greetQuery.error?.data as ZodErrorData | undefined)?.zodError) {
      console.log((greetQuery.error?.data as ZodErrorData | undefined)?.zodError);
    }
  }, [greetQuery.error?.data]);

  const invalidateMemoKey = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: memosKey });
  }, [queryClient, memosKey]);

  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const images = await fetchImagesService(session.user.id);
      console.log('Fetched images:', images);
      setImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, [session?.user?.id]);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDeleteImage = useCallback(
    async (id: string, file_path: string, file_name: string) => {
      if (!session?.user?.id) return;
      try {
        await deleteImageService(id, session?.user?.id, file_path, file_name);
        fetchImages();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    },
    [session?.user?.id],
  );

  const handleDeleteClick = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (files: File[]) => {
    try {
      for (const file of files) {
        const folderName = session?.user.id || 'default_folder';
        const extension = await getExtensionIfAllowed(file);

        if (extension) {
          await uploadImageStorageService(
            file,
            file.size,
            file.type,
            session?.user.id || 'unknown',
            folderName,
            extension,
          );
        }
      }
      setFiles([]);
      fetchImages();
    } catch (error) {
      setImageError('画像のアップロードに失敗しました');
    }
  };

  // Base64用のアップロード処理
  const handleBase64Upload = async (files: File[]) => {
    for (const file of files) {
      const extension = await getExtensionIfAllowed(file);
      const base64Data = await convertFileToBase64(file);

      if (base64Data && extension) {
        console.log('To Base64 hooks:', base64Data);
        // ここで必要な処理を実行
      } else {
        throw new Error('Base64変換に失敗しました');
      }
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users: {error?.message}</p>;

  const zodError = (greetQuery.error?.data as ZodErrorData | undefined)?.zodError;

  return (
    <MainWrapper>
      <Helmet>
        <title>Fetchページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリで使用するFetchの種類を見る事ができます" />
      </Helmet>
      <h2>ファイルアップローダー</h2>
      <FileUploader files={files} onChange={handleFileChange} onUpload={handleFileUpload} onError={imageError} />
      <h2>Images</h2>
      {files.map((file, index) => (
        <div key={index}>
          <div className="relative w-[100px] h-[100px]">
            <button
              onClick={() => handleDeleteClick(index)}
              className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              aria-label="削除"
            >
              ×
            </button>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
          </div>
          <p className="text-xs mt-1 truncate">{file.name}</p>
          <p className="text-xs">{file.size} bytes</p>
        </div>
      ))}
      {images?.map((image: Image) => (
        <div key={image.id} className="flex items-center gap-2">
          <img src={getImageUrl(image.file_path)} alt={image.file_name} className="w-16 h-16 object-cover" />
          <p>{image.file_name}</p>
          <Button onClick={() => handleDeleteImage(image.id, image.file_path, image.file_name)}>削除</Button>
        </div>
      ))}
      <h2>tRPCによるフェッチ</h2>
      <p>{helloQuery.data?.message}</p>
      <p>{greetQuery.data?.greeting}</p>

      <p>{zodError?.formErrors && <div>{zodError.formErrors.join(', ')}</div>}</p>
      <p>{zodError?.fieldErrors?.title && <div>{zodError.fieldErrors.title.join(', ')}</div>}</p>
      <div>
        {getMemosQuery.isLoading && <p>Loading...</p>}
        {getMemosQuery.isError && <p className="color-red-600">{getMemosQuery.error.message}</p>}
        {getMemosQuery.data?.map((chunk, index) => <div key={index}>{chunk.title}</div>)}
        {getMemosQuery.data?.length === 0 && <p>データがありません</p>}
        <button type="button" onClick={() => getMemosQuery.refetch()}>
          更新
        </button>
        <button type="button" onClick={invalidateMemoKey}>
          キー更新
        </button>
      </div>
      <hr className="my-3" />
      <h2 className="text-2xl font-bold">tanstackQueryでのフェッチ</h2>
      <button onClick={handleFetch}>再フェッチ</button>
      {data?.map((todo) => (
        <ul key={todo.id}>
          <li>{todo.title}</li>
          <li>{todo.completed}</li>
        </ul>
      ))}
      <h2 className="text-2xl font-bold">fetchClientでのフェッチ</h2>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.completed}</p>
          </div>
        ))}
    </MainWrapper>
  );
};

export default Fetch;
