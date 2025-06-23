import { http, HttpResponse } from 'msw';

// ユーザーの型を定義
interface User {
  id: number;
  name: string;
  // 他のプロパティがあればここに追加
}

export const handlers = [
  // GETリクエストの例
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice Smith' },
      { id: 2, name: 'Bob Johnson' },
    ]);
  }),

  // POSTリクエストの例
  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json() as User[];
    console.log('新しいユーザーが作成されました:', newUser);
    return HttpResponse.json({ id: 3, ...newUser }, { status: 201 });
  }),

  // パスパラメータの例
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    if (id === '1') {
      return HttpResponse.json({ id: 1, name: 'Alice Smith' });
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // エラーレスポンスの例
  http.get('/api/error', () => {
    return new HttpResponse('Something went wrong', { status: 500 });
  }),
];