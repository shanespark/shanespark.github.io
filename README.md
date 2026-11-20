# Shane’s Athenaeum

The academic homepage and research notebook of **Shane Park (Sanghyeon Park)**.
Research interests include Security for AI, Mechanistic Interpretability, and LLM & Agent Security.

[Website](https://shanespark.github.io/) · [Blog](https://shanespark.github.io/blog/)

## About

- Academic profile, education, research interests, and publications.
- Paper reviews and research notes, with support for equations, code, images, and tables.
- A light and dark theme built on HugoBlox Academic CV.

## Writing

Create and edit posts in the [site editor](https://shanespark.github.io/admin/).
The [writing guide](https://shanespark.github.io/blog/test/) covers formatting and publishing.
Published changes are built and deployed automatically through GitHub Actions.

Posts can also be edited directly in `content/blog/`, with images stored alongside each post.
Drafts are hidden from the website, but their source remains visible in this public repository.

## Local development

Requires Hugo Extended 0.162.0, Go 1.27.4, Node.js 24, and pnpm 10.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm run dev
```

Create a production build with `pnpm run build`.

## Project structure

| Location | Content |
| --- | --- |
| `data/authors/me.yaml` | Profile, education, and research interests |
| `content/_index.md` | Homepage sections |
| `content/blog/` | Blog posts and post images |
| `content/publications/` | Publication records |
| `assets/media/` | Portrait and site logo |
| `assets/css/` | Site and blog styles |
| `data/themes/athenaeum.yaml` | Light and dark color palettes |

## Credits

Built with [HugoBlox Academic CV](https://github.com/HugoBlox/hugo-theme-academic-cv).
The original MIT license is preserved in [LICENSE.md](LICENSE.md).
The portrait and S monogram are personal profile assets.
