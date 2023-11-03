const { readMdFile, statsLinks} = require('../src/MdLinks');

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

  it('Deve retornar os links encontrados no arquivo', () => {
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

  it('Deve retornar mensagem de erro', () => {
    const erro = 'The file is empty or does not contain any links.';
    return readMdFile(emptyFile, options).then((result) => {
      expect(result).toEqual(erro);
    }).catch((error) => {
      expect(error.message).toEqual(erro);
    });    
  });

  it('Deve retornar mensagem de erro', () => {
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

  it('Deve a estatística dos links', () => {
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


  