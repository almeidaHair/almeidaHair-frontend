# Almeida Hair — Frontend

Aplicação web para gerenciamento de clientes e avaliações capilares do Almeida Hair.

## Sobre o projeto

O sistema possui duas áreas de acesso:

- **Área administrativa:** cadastro e consulta de clientes, criação de avaliações capilares e controle do compartilhamento das avaliações.
- **Área da cliente:** consulta das avaliações capilares compartilhadas pelo salão.

## Funcionalidades

### Administrador

- Autenticação administrativa;
- Listagem e pesquisa de clientes;
- Cadastro e edição de clientes;
- Consulta dos dados cadastrais de cada cliente;
- Criação de avaliações capilares;
- Registro de características dos fios e do couro cabeludo;
- Registro de histórico químico, diagnóstico, recomendações e observações internas;
- Escolha das avaliações que poderão ser visualizadas pela cliente.

### Cliente

- Autenticação na área da cliente;
- Consulta das avaliações compartilhadas;
- Visualização do diagnóstico e das recomendações do salão;
- Proteção das observações de uso exclusivamente interno.

## Tecnologias

- React 18;
- TypeScript;
- Vite;
- React Router;
- Tailwind CSS;
- Framer Motion;
- Lucide React;
- Sonner;
- date-fns.

## Requisitos

- Node.js 18 ou superior;
- npm.

## Instalação e execução

Acesse a pasta do frontend:

```powershell
cd C:\Faculdade\almeidaHair\almeidaHair-frontend
```

Instale as dependências:

```powershell
npm install
```

Inicie o servidor de desenvolvimento:

```powershell
npm run dev
```

O endereço local será exibido pelo Vite no terminal, normalmente:

```text
http://localhost:5173
```

## Comandos disponíveis

```powershell
npm run dev
```

Executa a aplicação em modo de desenvolvimento.

```powershell
npm run build
```

Gera a versão de produção da aplicação.

```powershell
npm run preview
```

Executa localmente a versão gerada para produção.

```powershell
npm run lint
```

Verifica o código com o ESLint.

## Estrutura principal

```text
src/
├── components/   # Componentes visuais e de formulário
├── contexts/     # Contextos de autenticação e tema
├── data/         # Opções estáticas da interface
├── hooks/        # Hooks reutilizáveis
├── pages/        # Páginas administrativas e da cliente
├── types/        # Tipos e modelos do domínio
└── utils/        # Cliente HTTP, validação, rotas e utilitários
```

## Integração com a API

O frontend consome a API do Almeida Hair para autenticação, autorização e persistência dos dados. Configure a URL da API conforme o ambiente antes de iniciar a aplicação.
