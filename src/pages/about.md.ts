import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Hi, I’m Tomer.

This is my therapy, in public.

I write about the things I struggle to say out loud: love, family, friendship, ambition, loneliness, work, fear, and the versions of myself I’m still trying to understand.

Some posts begin with something that happened. Others begin with a feeling I can’t shake. Writing is how I stay with it long enough to find out what it means.

There are stories about building things and chasing big ideas, because that is part of my life. But this isn’t really a blog about work. It’s about everything underneath it.

## Elsewhere

- Based: Tel Aviv, Israel
- Listening: [Ambition Unlocked](https://open.spotify.com/show/2Ksp9fLLnPmwaRAcRaNmm6)
- Work: [The work version of me](/index.md)
- Writing: [All posts](/posts.md)
`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
