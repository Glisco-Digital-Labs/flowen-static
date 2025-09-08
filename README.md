# Flowen Yôga — Web Components Starter (No Build)
A tiny, throwaway-friendly site built with plain HTML, CSS, and a few Web Components.

## What you get
- `<py-header>` and `<py-footer>` for shared layout (no copy‑paste)
- `<py-card>` and `<py-grid>` for quick sections and cards
- Mobile‑first, dark‑mode aware styles
- Zero build tools; deploy to Cloudflare Pages, Netlify, Vercel, or any static host

## Develop
Just open `index.html` in your browser. No tooling required.

## Deploy (Cloudflare Pages)
1. Push this folder to a GitHub repo (e.g., `patsy-yoga-site`).
2. In Cloudflare → **Pages** → **Create project** → **Connect to Git** → select repo.
3. Framework preset: **None**
   - Build command: *(leave empty)*
   - Output directory: `/`
4. Deploy. Add your custom domain in **Custom Domains** (optional).

## Usage
Example card:
```html
<py-card title="Alento (Pré‑Parto)" href="/cursos/alento/">
  6–12 sessões. Respiração e mobilidade pélvica.
</py-card>
```

Change the nav by editing the links inside `<py-header>...</py-header>` on each page.

## Notes
- Components use light DOM (no Shadow DOM) so you can style them with your global CSS.
- Accessibility: semantic landmarks (`header`, `main`, `footer`), labeled nav, focusable buttons/links.
- You can add more components in `assets/components.js` as needed.

## Instagram strategy 

Ver INSTAGRAM.md neste repositório para mais detalhes da estratégia.

These are the types of Instagram content we will be producing. For more details see [instagram-content][instagram-content].

1. Feed Posts (aka “Standard Posts”) - Single image, single video, or carousel (multi-image/video).
2. Carousels (a subtype of feed posts) - Up to 10 images and/or videos in one post.
3. Stories - Vertical photo or video (up to 60 sec per story). Disappear after 24h
4. Highlights - Curated sets of past Stories, pinned permanently on your profile
5. Reels - Short-form video (up to 90 seconds, vertical, with audio/music). Best organic reach right now.

Looking into the [instagram-content-specs][instagram-content-specs], we have the following:

Vamos fazer posts em regime:

1. Educativo (tips de yoga, saúde, autocuidado)
2. Inspiracional (histórias, testemunhos, frases)
3. Comercial (aulas, cursos, convites)

### Posts

Square: 1080 x 1080 pixels (1:1 aspect ratio). work well for symmetrical images
Landscape: 1080 x 566 pixels (1.91:1 or 16:9 aspect ratio). Perfect for wide landscapes, group photos, and full-body shots
Portrait: 1080 x 1350 pixels (4:5 aspect ratio). Ideal for tall subjects like buildings, artwork, or full-frame portraits.

### Stories 

Vertical: 1080 x 1920 pixels (9:16 aspect ratio).


## Our Initial Content 

1. Carrossel Educativo (quem é a flowen) 
2. Carrossel Educativo (o que é o Yôga) 
3. Post Inspiracional (citação)
4. Reel/Post Yoga no feminino 
5. Carrossel Mitos & Verdades 
6. 3 coisas que o yoga me deu depois do parto (repetir mais 2 vezes nestas 2 semanas iniciais)
7. O SwáSthya Yôga 
8. Os 8 angas do Ashtanga Sádhána 
9. Benefícios do Yôga (carrossel com os 3 produtos flowen) 
10. Post Inspiracional (citação)
11. Yoga na maternidade (carrossel - pre-concepção, pre-parto, pos-parto) 
12. Yôga depois dos 45 anos
13. Yôga e o desempenho profissional
14. Meditação - 5 mitos destruídos
15. Os produtos Flowen
15-22 Um carrossel por cada Anga do Ashtánga Sádhána (muita educação nesta fase)

📌 A Barbie, acabou por sugerir

Dias 1–5: Identidade + Educação básica (Flowen, o que é yoga, citação, yoga no feminino, mitos & verdades).

Dias 6–10: Mais humano e aplicado (testemunho pós-parto, SwáSthya, 8 Angas, Aulas, Citação).

Dias 11–15: Segmentos de público + temas universais (maternidade, 45+, desempenho profissional, meditação).

Dias 16–22: Série dos Angas (1 carrossel por anga, ritmo cadenciado).

### Calendar 

| Dia | Tipo de Post             | Tema / Conteúdo                                               | CTA sugerido                                          | Repurposing em Stories / Highlights                                                   |
| --- | ------------------------ | ------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1   | Carrossel Educativo      | **Quem é a Flowen** (apresentação, missão, filosofia)         | “Segue-nos para acompanhar esta jornada de bem-estar” | Story resumo + abrir highlight “Sobre a Flowen”                                       |
| 2   | Carrossel Educativo      | **O que é o Yôga** (definição, visão Flowen)                  | “Já praticaste? Conta-nos nos comentários”            | Partilhar cada slide em story + sticker de pergunta (“O que significa yoga para ti?”) |
| 3   | Post Inspiracional       | Citação (ex.: sobre equilíbrio ou autoconhecimento)           | “Guarda esta frase para te inspirar mais tarde”       | Story com animação simples (texto + música calma)                                     |
| 4   | Carrossel Educativo      | **Yoga no feminino** (benefícios específicos)                 | “Marca uma amiga que precisa disto”                   | Criar highlight “Yoga no Feminino”                                                    |
| 5   | Carrossel Educativo      | **Mitos & Verdades** do Yôga                                  | “Desliza para descobrir a verdade”                    | Transformar em quiz interativo nos stories                                            |
| 6   | Post Testemunho / Humano | **3 coisas que o yoga me deu depois do parto**                | “Partilha: o que o yoga já te trouxe?”                | Story com vídeo/áudio curto (voz pessoal, mais próximo)                               |
| 7   | Carrossel Educativo      | **O SwáSthya Yôga** (origem, diferenciação)                   | “Descobre o yoga mais completo”                       | Story educativo + highlight “SwáSthya”                                                |
| 8   | Carrossel Educativo      | **Os 8 Angas do Ashtánga Sádhána** (visão geral)              | “Segue-nos — vamos explorar cada anga em detalhe”     | Story “em breve série Angas”                                                          |
| 9   | Reel (simples)           | **Mini prática** (ex.: respiração ou 2-3 posturas)            | “Experimenta agora mesmo”                             | Guardar em highlight “Práticas Rápidas”                                               |
| 10  | Post Inspiracional       | Citação (diferente formato da primeira – ex.: foto + frase)   | “Identificas-te com isto? ❤️”                         | Story com sticker de reação (❤️🔥🙏)                                                  |
| 11  | Carrossel Educativo      | **Yoga na maternidade** (pré-concepção, pré-parto, pós-parto) | “Partilha com uma mãe que precise”                    | Highlight “Maternidade”                                                               |
| 12  | Carrossel Informativo    | **As nossas aulas** (Essência, Plenitude, Metamorfose)        | “Explora os nossos planos no link da bio”             | Story com CTA direto + highlight “Aulas”                                              |
| 13  | Carrossel Educativo      | **Yoga depois dos 45 anos**                                   | “Nunca é tarde para começar”                          | Story com sticker de idade (“Tens +45?”)                                              |
| 14  | Carrossel Educativo      | **Yoga e o desempenho profissional**                          | “Gostavas que falássemos mais sobre isto?”            | Story com slider (“Stress no trabalho 0️⃣–🔟”)                                        |
| 15  | Carrossel Educativo      | **Meditação: 5 mitos destruídos**                             | “Desliza e guarda para voltar depois”                 | Story quiz: Verdadeiro ou Falso                                                       |


[instagram-content]: https://chatgpt.com/g/g-p-68b960a5915081919c46da85ef58a384-instagram-marketing/c/68b96145-5f28-832d-b13c-3c917dc295c0
[instagram-content-specs]: https://magicbrief.com/post/instagram-post-sizes-dimensions-guide-for-2024-2025#:~:text=Is%204:3%20or%2016,common%20than%20the%20other%20formats