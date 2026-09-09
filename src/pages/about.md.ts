import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Hi, I’m Tomer Gal.

This is my therapy, in public.

I’m the person behind [TomerWave](/). I help teams make technical decisions and build what comes next, from architecture and R&D leadership to AI and automation.

I joined Tonkean as its third developer, building workflow automation and integrations. Later, I led a team at LayerX and worked at Fireblocks. Today I work independently with teams and organizations, from figuring out what needs to change to getting it working.

You can find me on [LinkedIn](https://www.linkedin.com/in/tomergal14) and [GitHub](https://github.com/tomerwave), or [book a conversation](/meet) about something you’re working on.

## Outside work

I write about the things I struggle to say out loud: love, family, friendship, ambition, loneliness, work, fear, and the versions of myself I’m still trying to understand.

Some posts begin with something that happened. Others begin with a feeling I can’t shake. Writing is how I stay with it long enough to find out what it means.

There are stories about building things and chasing big ideas, because that is part of my life. But this isn’t really a blog about work. It’s about everything underneath it.

[עברית](https://tomerwave.com/he/about)

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
