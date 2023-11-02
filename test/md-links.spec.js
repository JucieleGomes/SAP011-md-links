const { readMdFile, mdLinks } = require('../src/MdLinks');

const filePath = './test/Files/File1.md';
const dir = './test/Files';
const options = {
  validate: true,
  stats: true,
};

const links = [
  {
    title: 'MarvelApp',
    url: 'https://marvelapp.com/',
    filePath: filePath,
  },
  {
    title: 'Git',
    url: 'https://git-scm.com/',
    filePath: filePath,
  }
];

describe('readMdFile', () => {
  it('is a function', () => {
    expect(typeof readMdFile).toBe('function');
  });

  it('Deve retornar os links encontrados no arquivo', () => {
    expect(readMdFile(filePath, options)).toEqual(links);

    expect(links[0].title).toBe('MarvelApp');
    expect(links[0].url).toBe('https://marvelapp.com/');
    expect(links[0].filePath).toBe(filePath);

    expect(links[1].title).toBe('Git');
    expect(links[1].url).toBe('https://git-scm.com/');
    expect(links[1].filePath).toBe(filePath);
  });
});

describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Deve entrar no arquivo caso seja .md e chamar a readFile', () => {
    expect(mdLinks(dir, options)).toEqual(readMdFile(filePath, options));
  });
});
