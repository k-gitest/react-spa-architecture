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

interface ProfileUpdate {
  avatar?: string;
  user_name?: string;
}

const testEmail = process.env.E2E_TEST_EMAIL!;
const avatarUrl = process.env.E2E_TEST_AVATAR_URL! + `?v=${Date.now()}`;

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
        avatar: '',
        user_name: 'Test User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];

export const profileUpdateHandlers = [
  http.get('**/rest/v1/profiles*', async ({ request }) => {
    console.log('Mocking Update after get /rest/v1/profiles');
    console.log('avatarUrl:', avatarUrl);

    return HttpResponse.json<ProfileResponse>(
      {
        id: 'abc123',
        user_id: 'abc123',
        avatar: avatarUrl + `?v=${Date.now()}` || '',
        user_name: 'Test User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
  http.patch('**/rest/v1/profiles*', async ({ request }) => {
    console.log('Mocking PATCH /rest/v1/profiles');
    const body = (await request.json()) as Partial<ProfileUpdate>;
    const { avatar, user_name } = body;
    return HttpResponse.json<ProfileUpdate>(
      {
        avatar: avatar || '',
        user_name: user_name || 'Test User',
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

export const memoCreateHandlers = [
  http.post(/\/rest\/v1\/memos(\?.*)?$/, async ({ request }) => {
    console.log('Mocking POST /rest/v1/memos');
    const body = (await request.json()) as MemoCreateRequestBody;

    return HttpResponse.json<MemosResponse>(
      {
        id: 'new-memo-id',
        user_id: 'abc123',
        title: body.title,
        content: body.content,
        importance: 'low',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: [],
        tags: [],
        images: [],
      },
      { status: 201 },
    );
  }),
  http.get(/\/rest\/v1\/categories(\?.*)?$/, () => {
    console.log('Mocking GET /rest/v1/categories');
    return HttpResponse.json<Category[]>(
      [
        { id: 1, name: 'テストカテゴリー' },
        { id: 2, name: '仕事' },
        { id: 3, name: 'プライベート' },
      ],
      { status: 200 },
    );
  }),
  http.get(/\/rest\/v1\/tags(\?.*)?$/, () => {
    console.log('Mocking GET /rest/v1/tags');
    return HttpResponse.json<Tag[]>(
      [
        { id: 1, name: 'タグA' },
        { id: 2, name: 'タグB' },
        { id: 3, name: 'タグC' },
        { id: 4, name: 'テストタグ' },
      ],
      { status: 200 },
    );
  }),
  http.post('**/storage/v1/object*', async ({ request }) => {
    //const body = await request.json();
    console.log('Mocking POST /storage/v1/object');
    return HttpResponse.json(
      {
        id: 'new-object-id',
        path: 'uploads/test-image.jpg',
        fullPath: 'uploads/test-image.jpg',
      },
      { status: 201 },
    );
  }),
  http.post('**/rest/v1/images*', async ({ request }) => {
    const body = (await request.json()) as {
      user_id: string;
      storage_object_id: string;
      file_name: string;
      file_path: string;
      file_size: number;
      mime_type: string;
    };
    console.log('Mocking POST /rest/v1/images with body:', body);
    return HttpResponse.json(
      {
        id: 'new-image-id',
        user_id: body.user_id,
        storage_object_id: body.storage_object_id,
        file_name: body.file_name,
        file_path: body.file_path,
        file_size: body.file_size,
        mime_type: body.mime_type,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),
  http.post('**/rest/v1/rpc*', async ({ request }) => {
    const body = (await request.json()) as {
      p_title: string;
      p_content: string;
      p_importance: 'low' | 'medium' | 'high';
      p_category_id: number;
      p_tag_ids: number[];
      p_image_ids: string[];
      p_image_metadatas: string[];
    };
    console.log('Mocking RPC call with body:', body);
    return HttpResponse.json(
      {
        id: 'new-memo-id',
        user_id: 'abc123',
        title: body.p_title,
        content: body.p_content,
        importance: body.p_importance,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: [
          { category: { id: body.p_category_id, name: 'テストカテゴリー' } },
        ],
        tags: body.p_tag_ids.map((id) => ({ tag: { id, name: `タグ${id}` } })),
        images: body.p_image_metadatas,
      },
      { status: 200 },
    );
  }),
  http.get('**/storage/v1/object/public*', () => {
    console.log('Mocking GET /storage/v1/object/public');
    return HttpResponse.json(
      {
        url: avatarUrl,
      },
      { status: 200 },
    );
  }),
  http.get('**/rest/v1/images*', () => {
    console.log('Mocking GET /rest/v1/images');
    return HttpResponse.json(
      [
        {
          id: 'image-1',
          user_id: 'abc123',
          file_name: 'test-image.jpg',
          file_path: 'uploads/test-image.jpg',
          mime_type: 'image/jpeg',
          file_size: 123456,
          storage_object_id: 'object-1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      { status: 200 },
    );
  }),
];
