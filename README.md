# Monitoring Hard Web

Aplicação web para monitoramento de dispositivos, construída com Next.js, Flowbite e TailwindCSS.

## Funcionalidades

- **Dashboard de Dispositivos:** Visualização em tempo real dos dispositivos.
- **CRUD de Dispositivos:** Cadastro, edição, remoção e listagem de dispositivos.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
- [Lucide React](https://lucide.dev/)
- [Recharts](https://recharts.org/) (gráficos)
- [ESLint](https://eslint.org/) (qualidade de código)

## Instalação

```bash
git clone https://github.com/ClenildonFerreira/monitoring-hard-web.git
cd monitoring-hard-web
npm install
```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto e defina a variável de ambiente da API:

```
NEXT_PUBLIC_API_URL=http://localhost:5009/api
```

## Uso

```bash
npm run dev
```

## Estrutura de Pastas

- `src/app/` - Páginas e layout principal
- `src/components/` - Componentes reutilizáveis (tabelas, cards, formulários)
- `src/services/` - Serviços de integração com API
- `src/types/` - Tipagens TypeScript

---

"Vingança nunca é plena, mata a alma e a envenena."
