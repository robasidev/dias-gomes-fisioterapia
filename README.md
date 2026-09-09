# Fisioterapia Dias Gomes — site institucional

Landing page institucional da clínica Fisioterapia Dias Gomes (Limão, São
Paulo), publicada via GitHub Pages.

- URL atual (GitHub Pages): https://robasidev.github.io/dias-gomes-fisioterapia/
- Domínio próprio da clínica (a apontar depois): www.fisioterapiadiasgomes.com.br

## Estrutura

- `index.html` — página única, Tailwind via CDN, sem build step
- `assets/` — logo e fotos da clínica, já otimizados pra web
- `sitemap.xml` / `robots.txt` — SEO básico

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
