import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from '@/schemas/memo-form-schema';
import { MemoFormData } from '@/types/memo-form-data';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import FormRadioGroup from "@/components/form/form-radio";
import FormSelect from "@/components/form/form-select";
import FormCheckboxGroup from "@/components/form/form-checkbox";

const importances = [
  { value: 'high', label: '大' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '小' },
] as const;

const categories = [
  { value: 'memo', label: 'メモ' },
  { value: 'task', label: 'タスク' },
  { value: 'diary', label: '日記' },
] as const;

const tagItems = [
  { id: "recents", label: "Recents" },
  { id: "home", label: "Home" },
  { id: "applications", label: "Applications" },
  { id: "desktop", label: "Desktop" },
  { id: "downloads", label: "Downloads" },
  { id: "documents", label: "Documents" },
] as const;

const defaultMemoFormData = {
  title: "",
  content: "",
  importance: "high",
  category: "",
  tag: [],
};

const MemoForm = ({ onSubmit }: { onSubmit: (data: MemoFormData) => void }) => {
  
  const form = useForm<MemoFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultMemoFormData,
  });

  const handleSubmit = (data: MemoFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <div>
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-6">
            <FormInput label="タイトル" placeholder="タイトルを入力してください" name="title" />
            <FormSelect label="カテゴリー" options={categories} placeholder="カテゴリ選択" name="category" />
            <FormTextArea label="メモの内容" placeholder="内容を記入してください" name="content" />
            <FormRadioGroup label="重要度" options={importances} name="importance" />
            <FormCheckboxGroup label="タグ" options={tagItems} name="tag" />

            <div className="flex justify-center">
              <Button type="submit" className="w-32">送信</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default MemoForm;