# mdLinks Library

## Índice

* [1. Prefácio](#prefacio)
* [2. Resumo do projeto](#resumo-do-projeto)
* [3. Fluxograma](#fluxograma)
* [4. Instalação](#instalacao)
* [5.Comando do terminal](#comandos-no-terminal)
* [6. Testes unitários](#testes-unitarios)
* [7. CheckList](#checklist)
* [10. Desenvolvedora](#desenvolvedora)

***
<a name="prefacio"></a>
## 1. Prefácio


O Markdown é uma linguagem de marcação leve e popular que foi criada para simplificar a formatação de texto em documentos, especialmente para a web. Foi desenvolvido por John Gruber e Aaron Swartz em 2004, e desde então, tornou-se amplamente adotado por sua simplicidade e facilidade de uso.

O principal objetivo do Markdown é permitir que as pessoas escrevam documentos com formatação de maneira rápida e intuitiva, sem a necessidade de aprender linguagens de marcação complexas, como HTML. Com o Markdown, você pode criar facilmente títulos, listas, links, citações, tabelas e muito mais, usando uma sintaxe simples baseada em texto.

A simplicidade do Markdown o torna uma escolha popular entre escritores, blogueiros, desenvolvedores e qualquer pessoa que queira criar conteúdo na web sem se preocupar com detalhes técnicos. Neste prefácio, exploraremos os conceitos básicos do Markdown e forneceremos exemplos para ajudá-lo a começar a usar essa linguagem de marcação de forma eficaz.
* * *

<a name="resumo-do-projeto"></a>
## 2. Resumo do projeto

Este é o projeto 4 do bootcamp Laboratória turma SAP-011, o projeto tem como objetivo
a criação de ferramenta de linha de comando (CLI) assim como
a sua própria biblioteca (library) em Javascript e executada com Node.js.

Neste projeto temos como foco aprender sobre processos, como interagir
com sistemas de arquivos, como fazer consultas de rede, etc.

Desenvolver sua própria biblioteca é uma experiência fundamental para qualquer
desenvolvedora, pois te obriga a pensar na interface (API) dos seus _módulos_ e
como ela será usada por outras desenvolvedoras. 
* * *

<a name="fluxograma"></a>
## 3. Fluxograma
![_Fluxograma](https://github.com/JucieleGomes/SAP011-md-links/assets/127780316/a8a8f2d1-d4d7-4805-b8fc-761fc49fe403)
* * *

<a name="instalacao"></a>
## 4. Instalação
Para instalçao da biblioteca utilize o comando:
`npm install mdLinks`
* * *



<a name="comandos-no-terminal"></a>
## 5. Comandos no terminal

### 5.1 Extração dos links:
Para extração e leitura dos links do arquivo .md, utilize o comando:

`mdLinks <caminho-do-arquivo>`

![mdLinks](https://github.com/JucieleGomes/SAP011-md-links/assets/127780316/32fdbaff-54d6-49d8-8c96-4924059b05d0)
* * *
### 5.2 Gerar dados estátisticos:
Para gerar dados estátisticos dos links contidos no arquvivo .md utilize o comando:

`mdLinks <caminho-do-arquivo> --stats`

![--stats](https://github.com/JucieleGomes/mdLinks-Library/assets/127780316/ccd2c50a-2f13-45c5-8f3e-35519f15132a)

* * *
### 5.3 Validação:
Para validar os links contidos no arquvivo .md utilize o comando:

`mdLinks <caminho-do-arquvivo> --validate`


* * *
### 5.4 Validar e gerar dados estátisticos:
Para validar os links e gerar dados estaticos dos links, utilize o comando: 
![--validate](https://github.com/JucieleGomes/SAP011-md-links/assets/127780316/19733eb4-0c28-460a-a233-198eedb8e445)

`mdLinks <caminho-do-arquivo> --validate --stats`

![--validade --stats](https://github.com/JucieleGomes/SAP011-md-links/assets/127780316/051394b9-831c-4d71-a151-06bca0c40750)
* * *
### 5.6 Mensagens de erro:
A partir dos comandos inseridos no terminal podem ser geradas algumas mensagens de erro.

Caso o caminho do arquivo inserido não seja .md a seguinte mensagem de erro será mostrada no terminal:


![notMdFile](https://github.com/JucieleGomes/SAP011-md-links/assets/127780316/5965be90-512c-4203-94c2-39d33c480b38)

Caso o arquivo não possua links ou esteja vazio sera mostrada a seguinte mensagem de erro no terminal: 

![noLinks](https://github.com/JucieleGomes/SAP011-md-links/assets/127780316/74c1c490-f06a-4b41-a84b-90ee611ad3c6)
* * *
<a name="testes-unitarios"></a>
## 6. Testes unitários
Os testes forma finalizados com mais de 80% de cobertura
![testes](https://github.com/JucieleGomes/mdLinks-Library/assets/127780316/9f745f5a-4e9d-4c54-af1f-c02d7670d506)

* * *
<a name="checklist"></a>
## 🗹 7. CheckList 
- [x]  Poder instalar via npm install 
- [x] Guia de uso e instalação da biblioteca
- [x] Possuir o executável md-links no path (configurado no package.json)
- [x] Executar sem erros e ter o resultado esperado
- [x] Implementar --validate
- [x] Implementar --stats
- [x] Os testes unitários devem cobrir no mínimo 70% dos statements, functions, lines e branches.
* * * 
<a name="ferramentas-e-tecnologias-utilizadas"></a>
## Ferramentas e tecnologias utilizadas

* [Git](https://git-scm.com/)
* [GitHub](https://github.com/)
* [Node.js](https://nodejs.org/en)
* [Jest](https://jestjs.io/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Trello](https://trello.com/pt-BR/login)
* [NPM](https://www.npmjs.com/)
* [Chalk](https://www.npmjs.com/package/chalk)
* HTML
* JAVA SCRIPT
* * *

<a name="desenvolvedora"></a>
# 👩‍💻 Desenvolvedora
* Juciele Gomes: [GitHub](https://github.com/JucieleGomes) [LinkedIn](https://www.linkedin.com/in/juciele-gomes-03287b149/)













