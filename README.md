# Shane’s Athenaeum

Shane Park’s academic homepage and research notebook. Built with **HugoBlox Academic CV**, using the original Academic CV layout with an ivory / midnight-navy / antique-gold palette and the S neural-network monogram.

**Website:** https://shanespark.github.io/
**Blog:** https://shanespark.github.io/blog/

## 페이지 구성

- Main: Professional Summary · Education · Interests · My Research · Recent Publications
- Blog: Markdown 기술 글, 논문 리뷰, 수식, 코드, 표, 목차
- 상단 메뉴는 메인 페이지의 각 섹션으로 이동합니다.
- 라이트 / 다크 모드는 시스템 설정을 따르며, 사용자가 바꾼 모드는 다음 방문에도 유지됩니다.

## 새 글 쓰기

GitHub에서 `content/blog/글-주소/index.md` 파일을 만들고 아래처럼 작성합니다.
`draft: false`로 커밋하면 GitHub Actions가 자동으로 배포합니다.

```yaml
---
title: "Understanding activation steering"
date: 2026-11-18
draft: false
description: "글의 간단한 설명"
topic: "Interpretability"
authors: [me]
math: true
toc: true
---
```

위 YAML 아래에 Markdown 본문을 작성합니다. 한국어와 영어를 모두 쓸 수 있습니다.
제목은 `##`, 코드는 언어를 지정한 코드 블록, 인라인 수식은 `$...$`, 블록 수식은 `$$...$$`를 사용합니다.
글에 넣을 이미지는 같은 폴더에 저장하고 `![설명](figure.png)`로 연결합니다.

기존 C2SR Lab. 글은 https://chipkkang9.github.io/ 에 남겨 두었으며 새 블로그에서 연결합니다.

## 프로필 수정

| 내용 | 파일 |
| --- | --- |
| 소개·학력·GPA·관심사·소셜 링크 | `data/authors/me.yaml` |
| 연구 프로젝트 | `content/_index.md` |
| 본인 발표 논문 목록 | `content/publications/` |
| 사진·로고 | `assets/media/authors/me.jpg`, `assets/media/logo.png` |
| 라이트·다크 색상 | `data/themes/athenaeum.yaml` |
| 세부 디자인 | `assets/css/custom.css` |

논문 목록에는 CV에서 확인한 제목·학회·연도만 표시합니다. 저자 목록·DOI·PDF 링크는 확인 후 추가할 수 있습니다.
CV 원본과 전화번호는 저장소에 포함하지 않습니다.

## 로컬 실행

Hugo Extended 0.162.0, Go, Node.js 24, pnpm 10.14.0을 준비한 뒤:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm run dev
```

배포 빌드: `pnpm run build`

`scripts/prepare-tailwind.mjs`는 Hugo의 Node 기반 Tailwind 실행과 pnpm의 실행 파일 형식을 맞춥니다.

## 기반과 라이선스

- [HugoBlox Academic CV](https://github.com/HugoBlox/hugo-theme-academic-cv)
- [HugoBlox Kit](https://github.com/HugoBlox/kit)
- 원본 MIT 라이선스는 `LICENSE.md`에 보존되어 있습니다.
- 인물 사진과 개인 S 로고는 Shane Park의 프로필 자산입니다.
