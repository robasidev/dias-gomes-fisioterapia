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
