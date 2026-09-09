# Fisioterapia Dias Gomes — site institucional

Landing page institucional da clínica Fisioterapia Dias Gomes (Limão, São
Paulo), publicada via GitHub Pages.

- URL atual (GitHub Pages): https://robasidev.github.io/dias-gomes-fisioterapia/
- Domínio próprio da clínica (a apontar depois): www.fisioterapiadiasgomes.com.br

## Estrutura

- `index.html` — página única, Tailwind **compilado** (não CDN — ver seção
  de performance abaixo)
- `assets/styles.css` — CSS gerado, não editar à mão
- `assets/` — logo e fotos da clínica, já otimizados pra web
- `sitemap.xml` / `robots.txt` — SEO básico

## Performance — reconstruir o CSS depois de mexer em classes do Tailwind

O site usava `cdn.tailwindcss.com` (124 KiB de JS bloqueando a renderização,
apontado pelo PageSpeed Insights). Trocado por CSS compilado e purgado:
só ~18 KiB, sem JS de runtime.

**Toda vez que adicionar/mudar uma classe Tailwind no `index.html`, rodar:**

```
npx tailwindcss@3.4.17 -i ./src-tailwind-input.css -o ./assets/styles.css --config ./tailwind.config.js --minify
```

Rodar isso **por último**, depois de terminar todas as edições de HTML da
vez — se compilar antes e só depois adicionar uma classe nova, ela não
existe no CSS final e simplesmente não faz efeito nenhum (já aconteceu
aqui: o ícone do mapa saiu invisível porque o CSS tinha sido gerado antes
da classe `group-hover:bg-slate-900/20` existir no HTML).

Outras decisões de performance:
- **Fonte do Google** carregada de forma não-bloqueante (`rel=preload` +
  troca pra `stylesheet` no `onload`, com `<noscript>` de fallback)
- **Mapa do Google**: o `<iframe>` de verdade só é injetado no clique
  (função `carregarMapa()`) — o embed sozinho carrega ~230 KiB de JS do
  Google Maps, que a maioria dos visitantes nunca usa. Por padrão mostra
  uma imagem estática real do mapa (`assets/mapa-preview-fisioterapia-limao.*`,
  print tirado uma vez do embed de verdade) com um ícone de lupa por cima.
- **Cache de imagens**: o GitHub Pages não permite configurar
  `Cache-Control` customizado (serve tudo com TTL curto, ~10min) — isso só
  se resolve de verdade passando o domínio pela Cloudflare (mesma conta já
  usada pro Worker de rastreio de cliques). Não dá pra corrigir enquanto o
  site estiver só no domínio `github.io`.

## Apontar o domínio próprio (quando a clínica tiver o DNS pronto)

1. Criar arquivo `CNAME` na raiz do repo com o conteúdo `www.fisioterapiadiasgomes.com.br`
2. No provedor de domínio da clínica, criar um registro CNAME apontando
   `www` para `robasidev.github.io`
3. Nas configurações do repositório no GitHub (Settings → Pages), adicionar
   o domínio customizado e aguardar a validação do certificado HTTPS

## Editar conteúdo

Todo o conteúdo (textos, links de WhatsApp, endereço, horário) está direto
no `index.html` — não há sistema de template ou CMS, é edição manual do
arquivo.

## Padrão de imagem (SEO local) — sempre que adicionar uma foto nova

1. **Nome do arquivo descritivo**, em português, minúsculo, com hífen —
   nunca `IMG_1234.jpg`. Formato: `o-que-mostra-servico-ou-pessoa-limao.jpg`
   (ex: `maca-tratamento-fisioterapia-limao.jpg`). Evitar empilhar palavra-
   chave demais no nome — 3 a 6 palavras descritivas já basta.
2. **Redimensionar pro tamanho real de exibição** (nunca subir a foto
   original do celular) e gerar `.webp` junto com `.jpg`/`.png` de
   fallback via `<picture>` — ver `index.html` pra o padrão exato.
3. **`width`/`height` explícitos** no `<img>` (evita layout shift) e
   `loading="lazy"` em toda foto abaixo da dobra.
4. **`alt` descritivo e específico**, sempre mencionando o que a foto
   mostra + "Fisioterapia Dias Gomes" + "Limão" (ou o bairro certo, se
   for foto do atendimento domiciliar) — nunca genérico tipo "foto 1".
5. **Geolocalização EXIF** (latitude/longitude da clínica) embutida nas
   fotos reais (não nos logos) — feito via `piexif`. Ver `## Fonte real
   dos dados` abaixo pras coordenadas. **Importante ser honesto sobre
   isso**: o Google já negou publicamente (John Mueller) que EXIF de
   geolocalização em foto seja usado como fator de ranqueamento — é uma
   prática comum no meio de SEO mas sem prova de efeito. Faço mesmo
   assim por ser inofensivo e rápido, mas o peso real de SEO local está
   nos itens 1, 4, no `geo`/`hasMap` do JSON-LD (schema.org) e nas
   entradas de imagem do `sitemap.xml` — esses sim têm efeito documentado.
6. **`sitemap.xml`**: toda foto nova que representa a clínica de verdade
   (não decorativa) ganha uma entrada `<image:image>` com `title` e
   `geo_location`, seguindo a extensão oficial de imagem do Google.

## Fonte real dos dados (referência, não inventar)

- Coordenadas: -23.5031066, -46.6737405 (extraídas do link permanente do
  Google Maps da clínica, `google.com/maps?cid=5057741437835691982`)
- Endereço/telefone/horário: ver o `PostalAddress` e
  `openingHoursSpecification` no JSON-LD do `index.html`
