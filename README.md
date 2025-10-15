<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Detector de Imagens com AI

## 🔗 Demonstração

Experimente a aplicação em funcionamento:
[**Acesse a aplicação**](https://detector-de-imagem-com-ia-910511479451.us-west1.run.app)

## ✨ Sobre o Projeto

O **Detector de Imagens** é uma aplicação interativa que demonstra o poder da Inteligência Artificial para análise de conteúdo visual.
Ele permite que os usuários carreguem qualquer imagem para que o modelo Gemini AI a analise em detalhes. O sistema identifica objetos,
cenários, e fornece *insights* e percepções ricas sobre o conteúdo da imagem, transformando a simples visualização em uma experiência de
compreensão profunda.

### 🎯 Funcionalidades Principais

  * **Análise Multimodal:** Utiliza a Gemini API para processar a imagem.
  * **Identificação Detalhada:** Detecta e descreve objetos, pessoas, cenários e o contexto da imagem.
  * **Insights Contextuais:** Gera informações detalhadas.
  * **Interface Amigável:** Aplicação simples e intuitiva para upload de imagens.

## 💻 Tecnologias Utilizadas

| Categoria | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Inteligência Artificial** | **Google Gemini API** | Motor central para análise e geração de texto a partir da imagem. |
| **Linguagem de Programação** | **TypeScript** | Garante código mais robusto e escalável no frontend. |
| **Estrutura Frontend** | **Vite** e **React** | Ambiente de desenvolvimento rápido e moderno para a interface do usuário. |
| **Outros** | **Node.js** | Ambiente de execução para o servidor e gerenciamento de dependências. |

-----

## Executando localmente

### Pré-requisitos

* **Node.js**: Certifique-se de ter uma versão LTS instalada. 
* **Chave da API Gemini**: Você precisará obter uma chave de acesso para a API.     
* Obtenha sua chave gratuitamente no **[Google AI Studio](https://ai.google/gemini-api/)**.       

1.  **Clone o Repositório:**
```
git clone https://github.com/MaduAraujo/Detector-de-Imagens.git
cd Detector-de-Imagens
```

2.  **Instale as Dependências:**
```
npm install
```

3.  **Configure a Chave da API:**

Crie um arquivo chamado **`.env.local`** na raiz do projeto e adicione sua chave da Gemini API:
```
GEMINI_API_KEY="SUA_CHAVE_AQUI"
```
* *Substitua* `"SUA_CHAVE_AQUI"` pela chave que você obteve no Google AI Studio.

4.  **Execute a Aplicação:**

Inicie o servidor de desenvolvimento:

```
npm run dev
```

* A aplicação estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).
