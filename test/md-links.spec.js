const { readMdFile} = require('../src/MdLinks');

const filePath = './test/Files/File1.md';

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
    return readMdFile(filePath, options).then((result) => {
      expect(result).toEqual(links);
    });
  });
});
