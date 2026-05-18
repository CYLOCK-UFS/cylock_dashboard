# Cylock Dashboard — Liga Acadêmica de Cibersegurança

Plataforma web para agregação, organização e visualização de notícias sobre cibersegurança, com foco em acessibilidade da informação, acompanhamento de tendências e visualização didática de dados.

## Objetivo do Projeto

Criar um dashboard público capaz de:

* Centralizar notícias atualizadas sobre cibersegurança
* Facilitar o aprendizado e acompanhamento de tendências
* Exibir informações de forma organizada e didática
* Tornar o conteúdo mais acessível para estudantes e público geral

---

## Funcionalidades Planejadas

### Coleta de Dados

O sistema deverá:

* Agregar notícias de múltiplas fontes
* Consumir RSS, APIs e scraping
* Atualizar automaticamente em intervalos configuráveis
* Classificar notícias por categoria

Categorias previstas:

* Malware
* Phishing
* Vulnerabilidades
* Vazamentos
* Threat Intelligence

---

### Exibição de Conteúdo

Cada notícia deverá apresentar:

* Título
* Resumo
* Fonte
* Data

O sistema também permitirá:

* Visualização detalhada da notícia
* Destaque para notícias relevantes ou de alto impacto

---

### Filtros e Busca

Os usuários poderão:

* Filtrar notícias por categoria
* Filtrar por fonte
* Filtrar por data
* Buscar por palavras-chave

---

### Dashboard e Visualizações

O dashboard contará com:

* Gráficos de tendências
* Estatísticas simples e didáticas
* Indicadores visuais de risco
* Visualização de tipos de ataques mais frequentes

---

### Sistema de Notificações

Integração futura com:

* Telegram
* Discord

Para envio automatizado de alertas e notícias relevantes.

---

## Arquitetura Proposta

O sistema será dividido em:

### Coletor de Dados

Responsável pela extração e normalização das notícias.

### Backend

Responsável pelo processamento, categorização e armazenamento das informações.

### Banco de Dados

Responsável pelo armazenamento otimizado das notícias, fontes e categorias.

### Frontend

Dashboard web para visualização das informações e estatísticas.

### Módulo de Notificações

Integração com bots e envio de alertas automatizados.

---

## Stack Tecnológica Planejada

### Backend

* Python
* FastAPI
* PostgreSQL

### Frontend

* React
* TailwindCSS

### Infraestrutura

* Docker

---

## Requisitos do Sistema

### Desempenho

* Tempo de carregamento inferior a 3 segundos
* Atualização eficiente e fluida

### Usabilidade

* Interface simples e intuitiva
* Linguagem acessível para não especialistas
* Compatibilidade com desktop e dispositivos móveis

### Segurança

* Proteção contra ataques comuns
* Integridade dos dados exibidos

### Escalabilidade

* Arquitetura modular
* Suporte ao crescimento de acessos simultâneos

---

## Escopo do MVP

Nesta fase inicial, o foco será:

* Coleta de notícias via RSS
* API básica de notícias
* Dashboard inicial
* Busca e filtros
* Visualização básica de estatísticas

O objetivo do MVP é validar o uso da plataforma e disponibilizar uma primeira versão funcional do dashboard.

---

## Riscos e Considerações

* Mudanças na estrutura dos sites podem quebrar scraping
* Dependência de fontes externas
* Necessidade de validação das fontes
* Crescimento rápido do volume de dados

---

## Critérios de Aceitação

* Notícias devem ser exibidas corretamente e atualizadas
* Filtros e busca devem funcionar sem falhas
* Dashboard deve apresentar dados claros e compreensíveis
* Interface deve ser utilizável por iniciantes

---

## Público-Alvo

* Estudantes
* Integrantes da liga
* Entusiastas de tecnologia
* Público geral interessado em cibersegurança

---

## Objetivo Educacional

O projeto busca democratizar o acesso à informação em cibersegurança, tornando o conteúdo mais acessível, visual e educativo.
