const { readMdFile, statsLinks, validateLinks } = require('../src/MdLinks');
global.fetch = require('jest-fetch-mock');

const filePath = './test/Files/File1.md';
const emptyFile = './test/Files/Empty.md';
const noMdFile = './test/Files/File2.txt';

const options = {
  validate: true,
  stats: true,
};


//Testando função readMdfile
describe('readMdFile', () => {
  it('is a function', () => {
    expect(typeof readMdFile).toBe('function');
  });

    const linksResult = [
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
    ]


    it('Should return the links found in the file', () => {
    return readMdFile(filePath).then((result) => {
      expect(result).toBe(linksResult);
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


//Testando função statsLinks
describe('statsLinks', () => {
  it('is a function', () => {
    expect(typeof statsLinks).toBe('function');
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

  it('Should return link statistics', () => {
    expect(statsLinks(links)).toEqual(expectedStats);
  });
});


//Testnado validateLinks
describe('validateLinks', () => {
  it('is a function', () => {
    expect(typeof validateLinks).toBe('function');
  });

  it('Should return the status of the links', () => {
    fetch.mockResponseOnce('validLink', { status: 200 });

    return fetch('https://marvelapp.com/')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('Should return the status of the links', () => {
    fetch.mockResponseOnce('invalidLink', { status: 404 });

    return fetch('https://marvelapp.com/hahsdhsad')
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });
});
