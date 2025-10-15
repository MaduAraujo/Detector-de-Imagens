<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Detector de Imagens com AI

## Demonstração

https://github.com/user-attachments/assets/753d73af-c2e2-4c6a-8707-680f77e55024

## Sobre o Projeto

O **Detector de Imagens** é uma aplicação interativa que demonstra o poder da Inteligência Artificial para análise de conteúdo visual.
Ele permite que os usuários carreguem qualquer imagem para que o modelo Gemini AI a analise em detalhes. O sistema identifica objetos,
cenários, e fornece *insights* e percepções ricas sobre o conteúdo da imagem, transformando a simples visualização em uma experiência de
compreensão profunda.

### Funcionalidades Principais

  * **Análise Multimodal:** Utiliza a Gemini API para processar a imagem.
  * **Identificação Detalhada:** Detecta e descreve objetos, pessoas, cenários e o contexto da imagem.
  * **Insights Contextuais:** Gera informações detalhadas.
  * **Interface Amigável:** Aplicação simples e intuitiva para upload de imagens.

## Tecnologias Utilizadas

- **TypeScript:** Adiciona tipagem estática ao JavaScript, tornando o código mais robusto e fácil de manter.
- **Node.js:** Ambiente de execução para o lado do servidor.
- **HTML5:** Linguagem de marcação para estruturar a página web.
- **Gemini API (Google AI):** O cérebro por trás da aplicação, responsável pela análise de imagem e geração da descrição textual.

## Instalação e Configuração

### Pré-requisitos

  - [Node.js](https://nodejs.org/) instalado (versão 18 ou superior é recomendada).
  - Uma chave de API da plataforma **Gemini (Google AI)**. Você pode obter a sua gratuitamente no [Google AI Studio](https://aistudio.google.com/app/apikey).

### Passos para Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/MaduAraujo/Detector-de-Imagens.git
    ```

2.  **Acesse o diretório do projeto:**

    ```bash
    cd Detector-de-Imagens
    ```

3.  **Instale as dependências necessárias:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**

      - Crie um arquivo chamado `.env.local` na raiz do projeto.
      - Adicione sua chave da API do Gemini a este arquivo, conforme o exemplo abaixo:
        ```env
        GEMINI_API_KEY=SUA_CHAVE_DE_API_VEM_AQUI
        ```

## Como Executar

```bash
npm run dev
```

* A aplicação estará rodando e acessível em seu navegador no endereço `http://localhost:3000` (ou na porta que for indicada no seu terminal).
