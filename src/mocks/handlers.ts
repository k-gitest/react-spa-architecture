import { http, HttpResponse } from "msw";

interface SignUpRequestBody {
  email: string;
  password: string;
}

export const handlers = [

  http.post(
    "**/auth/v1/signup",
    async ({ request }) => {
      const body = await request.json() as SignUpRequestBody;
      const { email } = body;

      if (email === "testuser_1750581112830@example.com") {
        return HttpResponse.json(
          {
            error: "User already registered",
          },
          {
            status: 422,
          },
        );
      }

      return HttpResponse.json(
        {
          user: { id: "abc123", email },
          session: null,
        },
        {
          status: 200,
        },
      );
    },
  ),
];
