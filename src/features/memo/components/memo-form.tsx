import { useCallback, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/features/memo/schemas/memo-form-schema';
import { MemoFormData, MemoFormProps, Image } from '@/features/memo/types/memo-form-data';
import { Button } from '@/components/ui/button';
import {
  FormWrapper,
  FormInput,
  FormTextArea,
  FormSelect,
  FormCheckboxGroup,
  FormRadioGroup,
} from '@/components/form/form-parts';
import { syncZodErrors } from '@/lib/trpc';
import { MemoItemAddDialog } from '@/features/memo/components/memo-item-add-dialog';
import { FileUploader } from '@/components/file-uploader';
import { FileThumbnail } from '@/components/file-thumbnail';
import { getImageUrl } from '@/lib/supabase';
import { MemoImageAddDialog } from '@/features/memo/components/memo-image-add-dialog';

const importances = [
  { value: 'high', label: '大' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '小' },
] as const;

const defaultMemoFormData = {
  title: '',
  content: '',
  importance: 'high',
  category: '',
  tags: [],
  fileMetadata: [{ alt_text: '', description: '' }],
};

export interface MemoFormFileProps {
  files: File[];
  onFileChange: (files: File[]) => void;
  onFileUpload: (files: File[]) => Promise<string[]>;
  onFileDelete: (index: number) => void;
  imageError?: string | null;
  images: Image[];
}

export const MemoForm = ({
  onSubmit,
  initialValues,
  externalZodError,
  categories,
  tags,
  category,
  setCategory,
  tag,
  setTag,
  handleCategorySubmit,
  handleTagSubmit,
  categoryOpen,
  setCategoryOpen,
  tagOpen,
  setTagOpen,
  files,
  onFileChange,
  //onFileUpload,
  onFileDelete,
  imageError,
  images: uploadedImages,
}: MemoFormProps & Partial<MemoFormFileProps>) => {
  const form = useForm<MemoFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues || defaultMemoFormData,
  });

  const handleSubmit = useCallback(
    (data: MemoFormData) => {
      onSubmit(data, files);
    },
    [onSubmit, files],
  );

  useEffect(() => {
    if (initialValues && !externalZodError) {
      initialValues.fileMetadata = initialValues.fileMetadata || [{ alt_text: '', description: '' }];
      form.reset(initialValues);
    }
  }, [initialValues, externalZodError, form]);

  useEffect(() => {
    syncZodErrors(form, externalZodError);
  }, [externalZodError, form]);

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'images',
  });
  const handleImageDelete = (index: number) => {
    remove(index);
  };

  const {
    fields: fileMetadataFields,
    append: appendFileMetadata,
    remove: removeFileMetadata,
  } = useFieldArray({
    control: form.control,
    name: 'fileMetadata',
  });

  // filesの変化に合わせてfileMetadataを初期化・同期
  useEffect(() => {
    // filesの数が多い場合は追加
    if (files && files.length > fileMetadataFields.length) {
      appendFileMetadata({ alt_text: '', description: '' });
    }
  }, [files, appendFileMetadata, fileMetadataFields, fileMetadataFields.length]);

  const [selectDialogOpen, setSelectDialogOpen] = useState(false);

  // imagesフィールドに画像を追加
  const handleSelectImages = (imgs: Image[]) => {
    let added = false;
    imgs.forEach((img) => {
      const exists = fields.some((field) => field.image_id === img.id);
      if (!exists) {
        append({
          image_id: img.id,
          order: fields.length,
          file_path: img.file_path,
          file_name: img.file_name,
          alt_text: '',
          description: '',
        });
        added = true;
      }
    });
    if (!added) {
      alert('すでに追加済みの画像のみが選択されました');
    }
    setSelectDialogOpen(false);
  };

  console.log('レンダリング');

  return (
    <div className="flex justify-center">
      <FormWrapper onSubmit={handleSubmit} form={form}>
        <FormInput label="タイトル" name="title" placeholder="タイトルを入力してください" />
        <FormSelect label="カテゴリー" name="category" options={[...(categories ?? [])]} placeholder="カテゴリ選択" />
        <MemoItemAddDialog
          buttonTitle="カテゴリー追加"
          dialogTitle="Category"
          dialogDescription="新しいカテゴリーを追加"
          placeholder="カテゴリーを入力してください"
          value={category}
          setValue={setCategory}
          onSubmit={handleCategorySubmit}
          open={categoryOpen}
          setOpen={setCategoryOpen}
        />
        <FormTextArea label="メモの内容" name="content" placeholder="内容を記入してください" />
        <FormRadioGroup label="重要度" name="importance" options={importances} />
        <FormCheckboxGroup label="タグ" name="tags" options={[...(tags ?? [])]} />
        {tags?.length === 0 && <p>タグが登録されていません</p>}
        <MemoItemAddDialog
          buttonTitle="タグ追加"
          dialogTitle="Tag"
          dialogDescription="新しいタグを追加"
          placeholder="登録するタグを入力してください"
          value={tag}
          setValue={setTag}
          onSubmit={handleTagSubmit}
          open={tagOpen}
          setOpen={setTagOpen}
        />
        {/* ファイルアップロード・サムネイル */}
        {files && onFileChange && onFileDelete && (
          <div className="my-4">
            <label className="block font-bold mb-2">画像アップロード</label>
            <FileUploader files={files} onChange={onFileChange} onError={imageError} />
            {files.length > 0 && <FileThumbnail files={files} onDelete={onFileDelete} onRemove={removeFileMetadata} />}
          </div>
        )}

        <Button type="button" variant="outline" onClick={() => setSelectDialogOpen(true)} className="w-full">
          アップロード済み画像から選択
        </Button>
        <MemoImageAddDialog
          open={selectDialogOpen}
          images={(uploadedImages || []).filter((img) => !fields.some((field) => field.image_id === img.id))}
          onSelect={handleSelectImages}
          onClose={() => setSelectDialogOpen(false)}
        />

        {fields.length > 0 && (
          <div className="my-4">
            <label className="block font-bold mb-2">アップロード済み画像</label>
            <div className="grid grid-cols-1 gap-4">
              {fields.map((field, index) => (
                <div className="flex gap-4" key={field.id}>
                  {' '}
                  {/* field.idを使用 */}
                  <div className="relative w-[100px] h-[100px]">
                    <img
                      src={field.file_path ? getImageUrl(field.file_path) : ''}
                      alt={field.alt_text || 'Uploaded Image'}
                      className="w-[100px] h-[100px] object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                  <div className="w-full">
                    <FormInput
                      name={`images.${index}.alt_text`}
                      label="Alt Text"
                      placeholder="画像の代替テキストを入力"
                      className="mt-2"
                    />
                    <FormInput
                      name={`images.${index}.description`}
                      label="説明"
                      placeholder="画像の説明を入力"
                      className="mt-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {form.formState.errors?.root && <p className="text-sm text-red-500">{form.formState.errors.root?.message}</p>}
        <div className="flex justify-center">
          <Button type="submit" className="w-32">
            送信
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
};
