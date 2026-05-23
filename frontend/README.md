# 💻 Dashboard App — Front-end

Esta é a pasta dedicada exclusivamente à interface do usuário (Front-end) do projeto, desenvolvido com **Next.js** (App Router) e **Tailwind CSS**. O painel conta com gráficos de visão geral e uma tabela expansível para gerenciamento de itens.

## 🛠️ Tecnologias Utilizadas

*   **Framework:** [Next.js 14+ (App Router)](https://nextjs.org)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com)
*   **Gráficos:** [Recharts](https://recharts.org) (Carregamento via Dynamic Imports)
*   **Linguagem:** JavaScript (JS/JSX)

---

## 🚀 Como Configurar e Rodar o Projeto

Siga os passos abaixo para preparar o ambiente de desenvolvimento local.

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18.x ou superior) instalado em sua máquina.

### 2. Instalação de Dependências
Navegue até a raiz deste diretório front-end e execute o comando correspondente ao seu gerenciador de pacotes:

```bash
# Se usa NPM
npm install

# Se usa Yarn
yarn install

# Se usa PNPM
pnpm install
```

### 3. Executando em Ambiente de Desenvolvimento
Para iniciar o servidor local com Live Reload, execute:

```bash
npm run dev
# ou: yarn dev | pnpm dev
```

Abra o seu navegador e acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura de Pastas e Componentes

O projeto segue o padrão de **Colocação Próxima (Colocation)** para organizar os componentes de forma escalável:

```text
src/
├── app/
│   ├── layout.js                 # Configurações globais (HTML, Body, Classes Base)
│   ├── _components/              # COMPONENTES EXCLUSIVOS DESTA ROTA
│   │   ├── DashboardCharts.jsx   # Seção dos gráficos interativos
│   │   └── DashboardList.jsx     # Tabela interativa e expansível
│   └── page.js                   # Página orquestradora
└── components/                   # Componentes globais reutilizáveis
```

> 💡 **Nota sobre a pasta `_components`:** O uso do underline `_` avisa ao sistema de roteamento do Next.js para ignorar esses arquivos como páginas, mantendo-os estritamente como componentes privados da rota.

---

### ⚡ Client-Side vs Server-Side
*   Como utilizamos bibliotecas interativas (`@headlessui/react`, animações do `Recharts` e estados com `useState`), os arquivos de componentes interativos exigem a diretiva `"use client";` obrigatoriamente no topo.

---

## 🛠️ Scripts Disponíveis

*   `npm run dev` - Inicia o servidor de desenvolvimento.
*   `npm run build` - Cria a versão de produção otimizada da aplicação.
*   `npm run start` - Inicia o servidor em modo de produção (após rodar o build).
