# Shane’s Athenaeum

Shane Park’s academic homepage and research notebook. Built with **HugoBlox Academic CV**, using the original Academic CV layout with an ivory / midnight-navy / antique-gold palette and the S neural-network monogram.

**Website:** https://shanespark.github.io/
**Blog:** https://shanespark.github.io/blog/

## 페이지 구성

- Main: Professional Summary · Education · Interests · Recent Publications
- Blog: Markdown 기술 글, 논문 리뷰, 수식, 코드, 표, 목차
- 상단 메뉴는 메인 페이지의 각 섹션으로 이동합니다.
- 라이트 / 다크 모드는 시스템 설정을 따르며, 사용자가 바꾼 모드는 다음 방문에도 유지됩니다.

## 새 글 쓰기

GitHub에서 `content/blog/글-주소/index.md` 파일을 만들고 아래처럼 작성합니다.
`draft: false`로 커밋하면 GitHub Actions가 자동으로 배포합니다. 별도 서버나 명령어는 필요 없습니다.

1. [글 폴더](https://github.com/shanespark/shanespark.github.io/tree/main/content/blog)에서 **Add file → Create new file**을 누릅니다.
2. 파일 이름에 `paper-review-example/index.md`처럼 글 주소와 `index.md`를 입력합니다. 주소는 영어 소문자와 하이픈을 권장합니다.
3. 아래 예시 전체를 붙여 넣고 제목·날짜·본문을 바꿉니다.
4. **Commit changes… → Commit directly to the main branch → Commit changes**로 저장합니다.
5. [Actions](https://github.com/shanespark/shanespark.github.io/actions)에서 초록색 체크가 뜨면 `/blog/`에 글이 표시됩니다.

`draft: true`이면 저장소에만 저장되고 사이트에는 공개되지 않습니다. 날짜가 미래이면 기본적으로 발행되지 않으니 발행일을 확인합니다.

```markdown
---
title: "[Paper Review] Attention Is All You Need"
date: 2026-11-20
draft: false
description: "Transformer의 핵심 아이디어와 연구 관점 정리"
summary: "Transformer의 핵심 아이디어와 연구 관점 정리"
topic: "Paper Review"
authors: [me]
math: true
toc: true
---

## 논문 정보

- 논문: Attention Is All You Need
- 원문: https://arxiv.org/abs/1706.03762

## 한 줄 요약

논문의 핵심 주장을 내 말로 정리합니다.

## 핵심 아이디어

방법과 수식, 필요한 배경을 설명합니다.

## 실험과 결과

비교 대상, 주요 결과, 해석을 기록합니다.

## 한계와 내 생각

의문점, 재현할 실험, 후속 연구 아이디어를 정리합니다.
```

위 YAML 아래에 Markdown 본문을 작성합니다. 한국어와 영어를 모두 쓸 수 있습니다.
제목은 `##`, 코드는 언어를 지정한 코드 블록, 인라인 수식은 `$...$`, 블록 수식은 `$$...$$`를 사용합니다. 연구 노트는 `topic: "Research Note"`로 바꾸면 됩니다.
글에 넣을 이미지는 같은 폴더에 저장하고 `![설명](figure.png)`로 연결합니다.
이미지는 GitHub에서 해당 글 폴더를 연 뒤 **Add file → Upload files**로 올립니다. 기존 글은 `index.md`의 연필 버튼으로 수정합니다.

기존 C2SR Lab. 글은 https://chipkkang9.github.io/ 에 남겨 두었으며 새 블로그에서 연결합니다.

## 프로필 수정

| 내용 | 파일 |
| --- | --- |
| 소개·학력·GPA·관심사·소셜 링크 | `data/authors/me.yaml` |
| 메인 페이지 섹션 | `content/_index.md` |
| 본인 발표 논문 목록 | `content/publications/` |
| 사진·로고 | `assets/media/authors/me.jpg`, `assets/media/logo.png` |
| 라이트·다크 색상 | `data/themes/athenaeum.yaml` |
| 세부 디자인 | `assets/css/custom.css` |

논문 목록에는 CV에서 확인한 제목·학회·연도만 표시합니다. 저자 목록·DOI·PDF 링크는 확인 후 추가할 수 있습니다.
Recent Publications는 Domestic / International 탭으로 나눕니다. 국제학회 논문은 해당 `index.md`의 YAML에 `publication_scope: international`을 추가합니다. 나머지는 Domestic에 표시됩니다. 현재 CUTE 2023 논문 1편이 International이며, 나머지 4편은 Domestic입니다.
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
