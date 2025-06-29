import { http, HttpResponse } from 'msw';

interface SignUpRequestBody {
  email: string;
  password: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface MemosResponse {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  tags?: { tag: Tag }[];
  category?: { category: Category }[];
  importance?: 'low' | 'medium' | 'high';
  images?: string[];
}

interface MemoCreateRequestBody {
  title: string;
  content: string;
  tags?: string[];
  categories?: string;
}

interface ProfileResponse {
  id: string;
  user_id: string;
  avatar?: string;
  user_name?: string;
  created_at: string;
  updated_at: string;
}

const testEmail = process.env.E2E_TEST_EMAIL!;

export const handlers = [
  http.post('**/auth/v1/signup', async ({ request }) => {
    const body = (await request.json()) as SignUpRequestBody;
    const { email } = body;

    if (email === testEmail) {
      return HttpResponse.json(
        {
          error: 'User already registered',
        },
        {
          status: 422,
        },
      );
    }

    return HttpResponse.json(
      {
        user: { id: 'abc123', email },
        session: null,
      },
      {
        status: 200,
      },
    );
  }),

  http.get('**/rest/v1/profiles*', ({ request }) => {
    console.log('Mocking GET /rest/v1/profiles');
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id')?.replace('eq.', '');

    return HttpResponse.json<ProfileResponse>(
      {
        id: 'abc123',
        user_id: 'abc123',
        avatar: 'https://avatars.githubusercontent.com/u/117815441?v=4',
        user_name: 'Test User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];

export const memoEmptyHandlers = [
  http.get(/\/rest\/v1\/memos(\?.*)?$/, () => {
    console.log('Mocking GET /rest/v1/memos with no memos');
    return HttpResponse.json([], { status: 200 });
  }),
];

export const memoHandlers = [
  http.get(/\/rest\/v1\/memos(\?.*)?$/, () => {
    console.log('Mocking GET /rest/v1/memos');
    return HttpResponse.json<MemosResponse[]>(
      [
        {
          id: 'memo-1',
          user_id: 'abc123',
          title: 'Test Memo 1',
          content: 'This is the content of test memo 1.',
          importance: 'high',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          category: [
            {
              category: {
                id: 1,
                name: 'カテゴリA',
              },
            },
          ],
          tags: [
            {
              tag: {
                id: 1,
                name: 'タグA',
              },
            },
          ],
          images: [],
        },
      ],
      { status: 200 },
    );
  }),
];
