# Memória das Artes

## 🎨 Objetivo do jogo

**Memória das Artes** é um jogo da memória baseado em obras de arte. O jogador deve escolher uma categoria de pinturas e encontrar todos os pares de imagens iguais no menor número possível de tentativas.

O jogo foi desenvolvido como uma atividade acadêmica para aplicar conceitos de **HTML, CSS e JavaScript**, incluindo manipulação do DOM, eventos, lógica de programação e criação de uma interface interativa.

## ▶️ Como jogar

1. Acesse o jogo pelo navegador.
2. Escolha uma das categorias disponíveis:

   * **Cidades**
   * **Plantas**
   * **Pessoas**
3. O tabuleiro será preenchido de acordo com a dificuldade escolhida:
   * **Fácil (4 pares)**
   * **Médio (8 pares)**
   * **Díficil (12 pares)**
4. Clique em uma carta para revelar a pintura.
5. Clique em uma segunda carta para tentar encontrar o par correspondente.
6. Se as duas cartas forem iguais, elas permanecerão visíveis.
7. Se forem diferentes, as cartas serão escondidas novamente após alguns segundos.
8. Continue jogando até encontrar todos os **8 pares**.

**Depois de encontrar um par, é possível clicar novamente em uma das cartas para visualizar a pintura em tamanho maior.**

## 📜 Regras do jogo

* O jogo possui **16 cartas**, organizadas em **8 pares**.
* Cada par representa a mesma obra de arte.
* As cartas são embaralhadas sempre que um novo jogo é iniciado.
* Uma tentativa corresponde à escolha de duas cartas.
* Quando as duas cartas formam um par, elas permanecem abertas.
* Quando as cartas não formam um par, elas são viradas novamente.
* O jogador deve encontrar todos os **8 pares** para vencer.
* Cartas já encontradas podem ser selecionadas novamente para visualizar a pintura ampliada.
* Não existe limite de tentativas.

## 💻 Tecnologias utilizadas

O projeto foi desenvolvido exclusivamente com tecnologias web básicas:

* **HTML5** — estrutura da página e dos elementos do jogo.
* **CSS3** — estilização, layout, responsividade e animações.
* **JavaScript** — lógica do jogo, manipulação do DOM, eventos, embaralhamento das cartas, contagem de tentativas e controle das interações.

Não são utilizadas bibliotecas ou frameworks externos.

## 📁 Estrutura do projeto

```text
jogo-da-memoria/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   └── img/
│       ├── cidades/
│       │   ├── 1.jpg
│       │   ├── 2.jpg
│       │   └── ...
│       │
│       ├── plantas/
│       │   ├── 1.jpg
│       │   ├── 2.jpg
│       │   └── ...
│       │
│       └── pessoas/
│           ├── 1.jpg
│           ├── 2.jpg
│           └── ...
│
├── README.md
│
└── LICENSE
```

## ⚙️ Instalação

Não é necessária nenhuma instalação de dependências.

Para executar o jogo localmente:

1. Faça o download ou clone este repositório.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` em um navegador.

O jogo funciona diretamente no navegador utilizando apenas **HTML, CSS e JavaScript**.

## 🌐 GitHub Pages

A versão publicada do jogo está disponível em:

**https://i-am-gab.github.io/memoria-das-artes/**

## 👨‍💻 Informações do projeto

```json
{
    "nome": "Memória das Artes",
    "descricao": "Jogo da memória baseado em obras de arte, no qual o jogador deve encontrar 8 pares de pinturas organizadas em diferentes categorias.",
    "autores": "Gabriel Aguiar Alves e Silva",
    "turma": "10A"
}
```

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.

Consulte o arquivo [`LICENSE`](LICENSE) para obter mais informações.
