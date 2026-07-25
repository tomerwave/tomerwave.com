<p align="center">
  <img src="./public/tomerwave-icon.svg" width="76" alt="TomerWave mark" />
</p>

<h1 align="center">TomerWave</h1>

<p align="center">
  <strong>Personal writing and fractional VP of R&amp;D work by Tomer Gal.</strong><br />
  Built with <a href="https://astro.build">Astro</a> and deployed on <a href="https://vercel.com">Vercel</a>.
</p>

<p align="center">
  <a href="https://tomerwave.com">Website</a> ·
  <a href="https://tomerwave.com/blog">Writing</a> ·
  <a href="https://tomerwave.com/rss.xml">RSS</a>
</p>

## What’s here

- `/` — fractional VP of R&amp;D studio for early-stage startups.
- `/blog` — personal essays on building, founder life, and everything it costs.
- `src/content/blog/` — the writing, stored as Markdown by year.

## Development

```sh
npm install
npm run dev
```

The development site runs at `http://localhost:4321`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run check` | Run Biome checks |
| `npm run build` | Create a production build in `dist/` |
| `npm run build:check` | Type-check, build, and index the site |
| `npm run preview` | Preview the production build locally |

## Project map

```text
public/              Static assets, including the site mark and self-hosted fonts
src/components/      Shared studio and blog components
src/content/blog/    Markdown essays, organized by year
src/pages/           Site routes
src/styles/          Shared, studio, and blog styling
```

## License

- Blog posts and documentation: [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/)
- Code: [MIT](LICENSE)
