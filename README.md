# Instaboom - Gerador de Planos para Instagram

Instaboom é uma aplicação web que gera planos personalizados de crescimento para Instagram, utilizando IA para criar estratégias sob medida para cada perfil.

## 🚀 Funcionalidades

### Landing Page
- Design moderno e responsivo com tema dark
- Apresentação das principais funcionalidades
- Lista de benefícios do plano
- Formulário de captura integrado

### Formulário de Cadastro
- Coleta de informações essenciais:
  - Link do Instagram
  - Área de atuação
  - Descrição do negócio
  - Objetivo do perfil
  - Maior dificuldade
  - Email para contato
- Feedback em tempo real com mensagens de status
- Validação de campos obrigatórios

### Integração com Supabase
- Armazenamento seguro dos dados do usuário
- Geração de URLs únicas para cada plano
- Sistema de hash para URLs seguras
- Persistência do plano gerado

### Integração com OpenAI
#### Input
- Processamento contextual das informações do usuário
- Análise do nicho e objetivos
- Consideração das dificuldades específicas

#### Output
- Geração de plano personalizado incluindo:
  - Análise detalhada do nicho
  - Bio otimizada
  - Calendário de conteúdo para 7 dias
  - Estratégias de hashtags
  - Exemplos de legendas
  - Dicas personalizadas

### Página do Plano
- Layout intuitivo com navegação por dias
- Seções organizadas:
  - Informações essenciais
  - Calendário de conteúdo
  - Plano de ação diário
  - Exemplos de legendas
  - Boas práticas do Instagram
- Carrossel educativo com dicas
- Design responsivo e tema dark consistente

### Sistema de Emails
- Integração com Resend para envio de emails
- Template personalizado com:
  - Confirmação de geração do plano
  - Link seguro de acesso
  - Botão de call-to-action
  - Instruções claras
- Rastreamento de entrega

## 🛠 Tecnologias Utilizadas

- **Frontend**: Next.js 13, Chakra UI
- **Backend**: Next.js API Routes
- **Database**: Supabase
- **AI**: OpenAI GPT-4
- **Email**: Resend
- **Estilização**: Chakra UI + CSS personalizado
- **Deploy**: Vercel

## 🔧 Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_supabase
OPENAI_API_KEY=sua_chave_openai
RESEND_API_KEY=sua_chave_resend
```

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Webinhood/instaboom.git

# Entre no diretório
cd instaboom

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔄 Fluxo de Funcionamento

1. Usuário acessa a landing page
2. Preenche o formulário com suas informações
3. Sistema valida e processa os dados
4. OpenAI gera plano personalizado
5. Dados são salvos no Supabase
6. URL única é gerada
7. Email é enviado com link de acesso
8. Usuário acessa seu plano personalizado

## 📱 Responsividade

- Desktop: Layout em duas colunas
- Tablet: Layout adaptativo
- Mobile: Layout em coluna única
- Breakpoints personalizados para melhor experiência

## 🔒 Segurança

### Proteção contra Rate Limiting
- Limite de 5 requisições por minuto por IP
- Limite de 1 plano por email por hora
- Headers de rate limit para feedback ao cliente
- Cache para controle de submissões frequentes

### Validação de Dados
- Schema validation com Zod no frontend e backend
- Sanitização de inputs (trim, lowercase, etc)
- Validação de formato de email e link do Instagram
- Proteção contra injeção de HTML/scripts
- Limite de tamanho nos campos
- Validação em tempo real dos campos

### Headers de Segurança
- X-Frame-Options: Previne clickjacking
- X-Content-Type-Options: Previne MIME sniffing
- Content-Security-Policy: Controla recursos carregados
- Referrer-Policy: Controla informações de referência
- Permissions-Policy: Restringe APIs do navegador

### Proteção contra Spam
- Validação rigorosa de email
- Limite de submissões por email
- Sanitização de dados antes de processar
- Cache para controle de submissões frequentes
- Bloqueio de IPs suspeitos

### Tratamento de Erros
- Mensagens de erro específicas e amigáveis
- Logs detalhados para debugging
- Feedback visual imediato no formulário
- Validação em tempo real dos campos
- Monitoramento de erros e tentativas suspeitas

### Dependências de Segurança
```
@upstash/redis         // Rate limiting distribuído
@upstash/ratelimit    // Implementação de rate limiting
zod                   // Validação de schema
react-hook-form       // Gerenciamento seguro de formulários
@hookform/resolvers   // Integração com Zod
