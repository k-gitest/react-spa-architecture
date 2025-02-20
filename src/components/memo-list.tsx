import { MemoFormData } from '@/types/memo-form-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface MemoListProps {
  memoData: MemoFormData[];
}

const MemoList = ({ memoData }: MemoListProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
    {memoData.map((memo, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>{memo.title}</CardTitle>
          <CardDescription>{memo.category}</CardDescription>
          <CardDescription>{memo.importance}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{memo.content}</p>
        </CardContent>
        <CardFooter>
          <ul>
            {memo.tag.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </CardFooter>
      </Card>
    ))}
    </div>
  )
}

export default MemoList