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

여기서 잠깐! 이때, 한 번쯤 보면 좋을 자료들을 적어놓고 가겠다.

1. **GPT-3 : [2020, NeurIPS] Language Models are Few-Shot Learners** : GPT-3의 구체적인 하이퍼파라미터(Layer 수, Head 수)가 명시되어있다.
2. **[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)** : Transformer 구조를 시각적으로 가장 잘 설명한 자료로 유명하다.
3. **[LLM Visualization](https://bbycroft.net/llm)** : GPT 스타일의 모델 내부에서 행렬 연산이 어떻게 일어나는지 3D 인터랙티브 그래픽으로 볼 수 있는 시각화 도구이다.

그래서 결국 이 논문의 가장 Main Insight는, **"복잡한 최신 모델들은 결국 내부적으로 Induction Heads와 같은 작은 회로들의 집합체일 것이다."** 라는 주장이다.

이때, Induction Head란, 문맥에서 이전에 나온 토큰의 패턴을 찾아, 이어진 토큰을 현재 위치에서 예측하는 Attention Head이다.

또한, 이 논문의 실험에서는 ==**Attention-only Transformer**==라는 것을 사용한다. 이는 일반적인 Transformer에서 MLP 층을 제외하고 Attention 층을 둔 단순화된 모델을 의미한다. 일반적인 Transformer이 아닌, Attention-only Transformer를 사용하는 이유는, MLP를 제거하여 모델 내부에서 수행되는 연산을 주로 선형 변환과 Attention pattern으로 분석할 수 있어, 입력 토큰에서부터 출력 logit까지의 계산을 명확하게 분해할 수 있기 때문이다.

## Summary of Results.

논문의 길이가 상당히 방대하기 때문에, 우선적으로 결과의 요약을 제시한다.

**Reverse Engineering Results**에서는 실험 결과 측면에서의 요약, 그리고 **Conceptual Take-Aways**에서는 개념적 측면에서의 요약을 제시한다.

### Reverse Engineering Results.

이 논문에서는 Transformer의 내부 흐름을 분석하기 위해 작은 Transformer를 분석해 얻은 결과를 다음과 같이 정리하였다.

1. **0-layer Transformer는 bigram을 따른다.**
Attention 층이 없는 모델은 현재 토큰만 보고 다음 토큰을 예측한다.
2. **1-layer Attention-only Transformer는 bigram과 skip-trigram의 조합으로 볼 수 있다.**
예를 들어 B 토큰 다음에 올 토큰 C를 예측하는 문제에서, 문맥에서 앞서 위치한 토큰 A를 참고한다는 것을 의미한다($A \ldots B \rightarrow C$).
3. **2-layer Attention-only Transformer는 Attention Head들을 조합해 복잡한 알고리즘을 구현한다.**
앞서 언급한 Induction Head는 앞서 나온 토큰 패턴을 찾아 뒤따랐던 토큰을 현재 위치에서 예측하는 방식으로 **in-context learning**(모델이 가중치를 바꾸지 않고, 입력에 주어진 예시를 참고해 답하는 것)을 수행한다.
4. **1-layer 와 2-layer 모델의 차이점은 in-context learning 방식의 질에 있다.**
1-layer 모델은 주로 학습된 skip-trigram 관계에 의존하나, 2-layer 모델은 Induction Head를 통해 문맥 안의 반복 패턴을 찾아 활용하는 더 복잡한 추론 과정을 사용할 수 있다.

### Conceptual Take-Aways.

이 파트는 본문을 읽기 전에 핵심 개념과 저자들의 Transformer 분석 관점을 미리 파악하도록 한 파트이다.

1. Attention head는 독립적으로 계산해 결과를 Residual Stream에 더하는 연산으로 해석할 수 있다.
