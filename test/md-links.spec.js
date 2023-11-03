const { readMdFile, statsLinks, validateLinks } = require('../src/MdLinks');
global.fetch = require('jest-fetch-mock');

const filePath = './test/Files/File1.md';
const emptyFile = './test/Files/Empty.md';
const noMdFile = './test/Files/File2.txt';

const options = {
  validate: true,
  stats: true,
};

describe('readMdFile', () => {
  it('is a function', () => {
    expect(typeof readMdFile).toBe('function');
  });

  it('Should return the links found in the file', () => {
    return readMdFile(filePath, options).then((result) => {
      expect(result).toEqual([
        {
          Title: 'Git',
          Url: 'https://git-scm.com/',
          Path: filePath,
        },
        {
          Title: 'GitHub',
          Url: 'https://github.com/',
          Path: filePath,
        },
        {
          Title: 'GitHub Pages',
          Url: 'https://pages.github.com/',
          Path: filePath,
        },
        {
          Title: 'Node.js',
          Url: 'https://nodejs.org/en',
          Path: filePath,
        }
      ]);
    });
  });

  it('Should return an error message', () => {
    const erro = 'The file is empty or does not contain any links.';
    return readMdFile(emptyFile, options).then((result) => {
      expect(result).toEqual(erro);
    }).catch((error) => {
      expect(error.message).toEqual(erro);
    });
  });

  it('Should return an error message', () => {
    const erro = 'It is not possible to continue, the file is not .md';
    return readMdFile(noMdFile, options).then((result) => {
      expect(result).toEqual(erro);
    }).catch((error) => {
      expect(error.message).toEqual(erro);
    });
  });
});

const links = [
  {
    title: 'MarvelApp',
    url: 'https://marvelapp.com/',
    status: 200,
  },
  {
    title: 'Git',
    url: 'https://git-scm.com/',
    status: 404
  },
  {
    title: 'MarvelApp',
    url: 'https://marvelapp.com/',
    status: 200,
  },
];

describe('statsLinks', () => {
  it('is a function', () => {
    expect(typeof statsLinks).toBe('function');
  });

  it('should return link statistics', () => {
    const validLinks = links.filter((link) => link.status === 200).length;
    const invalidLinks = links.filter((link) => link.status !== 200).length;
    const uniqueLinks = [...new Set(links.map((link) => link.url))].length;
    const totalLinks = links.length;
    const expectedStats = {
      validLinks,
      invalidLinks,
      uniqueLinks,
      totalLinks,
    };
    expect(statsLinks(links)).toEqual(expectedStats);
  });
});

describe('validateLinks', () => {
  it('is a function', () => {
    expect(typeof validateLinks).toBe('function');
  });

  it('Deve retornar o status dos links', () => {
    fetch.mockResponseOnce('validLink', { status: 200 });

    return fetch('https://marvelapp.com/')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('Deve retornar o status dos links', () => {
    fetch.mockResponseOnce('invalidLink', { status: 404 });

    return fetch('https://marvelapp.com/hahsdhsad')
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });
});
