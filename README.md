# Pulse Check App 📱

Aplicativo mobile desenvolvido com React Native e Expo para realizar check-ins diários de bem-estar e acompanhar estatísticas pessoais.

## 📋 Sobre o Projeto

O Pulse Check App é uma aplicação multiplataforma que permite aos usuários:
- Realizar check-ins diários rápidos sobre seu bem-estar
- Visualizar estatísticas e tendências ao longo do tempo
- Enviar sugestões e feedback
- Acompanhar seu progresso pessoal

## 🚀 Tecnologias Utilizadas

### Core
- **React Native** (0.81.5) - Framework para desenvolvimento mobile
- **React** (19.1.0) - Biblioteca JavaScript para interfaces
- **Expo** (~54.0.25) - Plataforma e ferramentas para React Native
- **TypeScript** (~5.9.2) - Tipagem estática

### Navegação e Roteamento
- **Expo Router** (~6.0.15) - Roteamento baseado em arquivos
- **React Navigation** (v7) - Navegação entre telas
  - `@react-navigation/native` (^7.1.8)
  - `@react-navigation/bottom-tabs` (^7.4.0)
  - `@react-navigation/elements` (^2.6.3)

### Gerenciamento de Estado
- **TanStack Query** (^5.90.10) - Gerenciamento de estado do servidor e cache
- **Zustand** (^5.0.8) - Gerenciamento de estado global (leve e performático)

### Comunicação e Autenticação
- **Axios** (^1.13.2) - Cliente HTTP para requisições à API
- **JWT Decode** (^4.0.0) - Decodificação de tokens JWT
- **Expo Secure Store** (^15.0.7) - Armazenamento seguro de dados sensíveis

### UI e Animações
- **React Native Reanimated** (~4.1.1) - Animações performáticas
- **React Native Gesture Handler** (~2.28.0) - Gestos e interações
- **Expo Haptics** (~15.0.7) - Feedback háptico
- **@expo/vector-icons** (^15.0.3) - Ícones
- **@react-native-picker/picker** (2.11.1) - Componente de seleção

### Outras
- **Expo Image** (~3.0.10) - Otimização de imagens
- **Expo Constants** (~18.0.10) - Constantes do sistema
- **React Native Safe Area Context** (~5.6.0) - Áreas seguras do dispositivo

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (opcional, mas recomendado)
- Para desenvolvimento iOS: [Xcode](https://developer.apple.com/xcode/) (apenas no macOS)
- Para desenvolvimento Android: [Android Studio](https://developer.android.com/studio)

## 🛠️ Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositório>
   cd pulse-check-app
   ```

2. Instale as dependências:
   
   **Usando npm:**
   ```bash
   npm install
   ```
   
   **Ou usando pnpm (recomendado):**
   ```bash
   pnpm install
   ```
   
   **Nota:** A versão do `@react-native-picker/picker` está fixada em `2.11.1` para compatibilidade com o Expo.

3. Inicie o servidor de desenvolvimento:
   ```bash
   npx expo start
   ```
   
   **Ou com pnpm:**
   ```bash
   pnpm start
   ```

## 🎯 Como Usar

Após iniciar o servidor, você terá as seguintes opções:

- **Pressione `a`** - Abrir no emulador Android
- **Pressione `i`** - Abrir no simulador iOS (apenas no macOS)
- **Pressione `w`** - Abrir no navegador web
- **Escaneie o QR code** - Abrir no Expo Go (dispositivo físico)

### Desenvolvimento

- **Android**: `npm run android` ou `npx expo start --android`
- **iOS**: `npm run ios` ou `npx expo start --ios`
- **Web**: `npm run web` ou `npx expo start --web`

## 📁 Estrutura do Projeto

```
pulse-check-app/
├── src/
│   ├── app/                    # Rotas e telas (Expo Router)
│   │   ├── (tabs)/             # Telas com navegação por abas
│   │   │   ├── index.tsx       # Tela principal (Dashboard)
│   │   │   └── _layout.tsx    # Layout das abas
│   │   ├── sign-in.tsx         # Tela de login
│   │   ├── sign-up.tsx         # Tela de registro
│   │   └── _layout.tsx         # Layout raiz
│   ├── components/             # Componentes reutilizáveis
│   │   ├── check-in-modal.tsx  # Modal de check-in
│   │   ├── dashboard-stats.tsx # Estatísticas do dashboard
│   │   ├── suggestion-modal.tsx # Modal de sugestões
│   │   └── ...
│   ├── constants/              # Constantes e configurações
│   ├── hooks/                  # Custom hooks
│   └── infra/                  # Infraestrutura
│       ├── auth/               # Serviços de autenticação
│       ├── services/           # Serviços da API
│       │   ├── auth/           # Autenticação (sign-in, sign-up)
│       │   ├── checkins/       # Check-ins (criar, listar)
│       │   ├── stats/          # Estatísticas
│       │   ├── departments/    # Departamentos
│       │   └── suggestions/    # Sugestões
│       ├── stores/             # Stores (Zustand)
│       │   └── auth.store.ts   # Store de autenticação
│       ├── http/               # Configuração HTTP (Axios)
│       └── helpers/            # Funções auxiliares
├── assets/                     # Imagens, ícones e recursos
├── app.json                    # Configuração do Expo
├── package.json                # Dependências e scripts
└── pnpm-workspace.yaml         # Configuração do pnpm
```

## 🔧 Scripts Disponíveis

### Usando npm:
- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Inicia no Android
- `npm run ios` - Inicia no iOS
- `npm run web` - Inicia no navegador
- `npm run lint` - Executa o linter ESLint

### Usando pnpm:
- `pnpm start` - Inicia o servidor de desenvolvimento
- `pnpm android` - Inicia no Android
- `pnpm ios` - Inicia no iOS
- `pnpm web` - Inicia no navegador
- `pnpm lint` - Executa o linter ESLint

## ⚙️ Configurações

### Expo

O projeto está configurado com:
- **Nova Arquitetura** habilitada (`newArchEnabled: true`)
- **Rotas tipadas** (`typedRoutes: true`)
- **React Compiler** (`reactCompiler: true`)
- Suporte a tema claro/escuro automático
- Suporte a tablets no iOS

### Variáveis de Ambiente

Certifique-se de configurar as variáveis de ambiente necessárias para a API. Crie um arquivo `.env` na raiz do projeto (se necessário) ou configure através do Expo Constants.

### Gerenciador de Pacotes

O projeto suporta tanto **npm** quanto **pnpm**. O arquivo `pnpm-workspace.yaml` está configurado com `nodeLinker: hoisted` para melhor compatibilidade.

## 📱 Funcionalidades

### Autenticação
- ✅ Login e registro de usuários
- ✅ Armazenamento seguro de tokens JWT (Expo Secure Store)
- ✅ Decodificação e validação de tokens
- ✅ Logout seguro

### Check-ins
- ✅ Check-in diário de bem-estar com escala de humor (1-5)
- ✅ Adição de notas/observações no check-in
- ✅ Visualização de check-ins do usuário
- ✅ Visualização de check-ins administrativos (admin)
- ✅ Validação de dados antes do envio

### Dashboard e Estatísticas
- ✅ Dashboard com estatísticas pessoais
- ✅ Visualização de tendências ao longo do tempo
- ✅ Pull-to-refresh para atualizar dados
- ✅ Estados de loading e empty state

### Outras Funcionalidades
- ✅ Envio de sugestões e feedback
- ✅ Gerenciamento de departamentos
- ✅ Feedback háptico em interações
- ✅ Suporte a tema claro/escuro automático

## 🎨 Recursos Visuais

- Interface moderna e intuitiva
- Suporte a tema claro/escuro
- Animações suaves com React Native Reanimated
- Ícones do Expo Vector Icons
- Splash screen personalizada

## 🔐 Segurança

- Tokens JWT armazenados de forma segura com `expo-secure-store`
- Autenticação baseada em tokens
- Validação de dados no cliente
