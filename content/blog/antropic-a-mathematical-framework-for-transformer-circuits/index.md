---
title: '[Antropic] A Mathematical Framework for Transformer Circuits'
card_image: Screenshot 2026-11-24 at 11.39.51 AM.png
category: Interpretability/XAI
keyword: Antropic
date: 2026-09-25
topic: Paper Review
summary: Anthropic's very first trial to define Mechanistic Interpretability, and it inspired me a lot.
draft: true
authors:
  - me
math: true
toc: true
---

"Interpretability"라는 분야는 아마 많은 사람들이 들어보지 못한 영역일 것이다.

새로운 블로그의 첫 글은 지금의 나에게 가장 큰 영향을 준 논문을 리뷰하는 글을 작성해보자고 생각했다. 

##### A Mathematical Framework for Transformer Circuits.

논문이라 부르기는 조금 애매한 칼럼과 비슷한 글인데, 중간중간 필요한 부분만 읽어도 Antropic 연구진의 분석에 감탄을 했다. 그래서 언젠가 처음부터 끝까지 분석해서 리뷰하는 글을 쓰고 싶었는데, 이 포스팅이 그 글이 될 것 같다. 잘못된 표현일 수는 있지만, 일관성을 위해 Antropic에서 공개한 이 글을 '논문'으로 간주하고 글을 작성하겠다.

# Openings.

이 논문이 처음 게재된 2021년 12월, 나는 대학교 새내기로 AI 라고는 알파고밖에 들어본 적이 없으나, Antrophic에서는 Transformer 기반 언어 모델의 문제점을 해결하고자 연구하고 있었다.

당시의 언어모델(GPT-3, LaMDA 등)은 지금의 GPT-6 Astra, Claude Fable 5.1과 같이 큰 모델이 아니었음에도 불구하고, 심지어는 그 모델을 만든 사람조차 모델의 규모나 표현력을 키울수록 예상치 못한 능력과 해로운 행동을 발견하곤 하는 경우가 있었다.

그래서 연구자들은 이를 해결하기 위해 모델이 왜 그런 출력을 냈는지 마치 소프트웨어 역공학(reverse-engineering) 처럼 내부 연산을 거꾸로 들여다보기 시작했고, 인공지능에서는 이를 **기계적 해석 가능성(Mechanistic Interpretability)** 이라고 부르기 시작했다.

이 연구는 처음 기계적 해석 가능성을 제안한 연구는 아니지만, Transformer이 만들어내는 결과의 패턴이나 구조를 찾아내고, 이를 기반으로 더 큰 모델을 이해하는데 활용하는 것을 목표로 한다.
