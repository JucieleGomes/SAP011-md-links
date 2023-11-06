const { readMdFile, statsLinks, validateLinks } = require('../src/MdLinks');
// global.fetch = require('jest-fetch-mock').enableFetchMocks()

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
        title: 'Git',
        url: 'https://git-scm.com/',
        path: filePath,
      },
      {
        title: 'GitHub',
        url: 'https://github.com/',
        path: filePath,
      },
      {
        title: 'GitHub Pages',
        url: 'https://pages.github.com/',
        path: filePath,
      },
      {
        title: 'Node.js',
        url: 'https://nodejs.org/en',
        path: filePath,
      },
      {
        title: 'Node.js',
        url: 'https://nodejs.org/enjsdhhdjsad',
        path: filePath,
      }
  
    ]

    const linksValidate = [
      {
        title: 'Git',
        url: 'https://git-scm.com/',
        path: filePath,
        isValid: true,
        status:200,
      },
      {
        title: 'GitHub',
        url: 'https://github.com/',
        path: filePath,
        isValid: true,
       status: 200,
      },
      {
        title: 'GitHub Pages',
        url: 'https://pages.github.com/',
        path: filePath,
        isValid: true,
        status: 200,
      },
      {
        title: 'Node.js',
        url: 'https://nodejs.org/en',
        path: filePath,
        isValid: true,
        status: 200,
      },
      {
        title: 'Node.js',
        url: 'https://nodejs.org/enjsdhhdjsad',
        path: filePath,
        isValid: false,
        status: 404,
      }
    ]

  
    it('Should return the links found in the file', () => { 
    const options = {
        validate: false,
        stats: false,
      };

    return readMdFile(filePath, options).then((result) => { 
      expect(result).toStrictEqual(linksResult);
    });
  });

  it('should return the status of the links found', () => {
    const options = {
      validate: true,
      stats: false,
    };
    return readMdFile(filePath, options).then((result) => {
      expect(result).toStrictEqual(linksValidate);
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
  global.fetch = jest.fn()
  fetch.mockResolvedValue({status:200})

    // fetch.mockOnce('validLink', { status: 200 });

    validateLinks({url:'https://marvelapp.com/'})
      .then((response) => {
        expect(response.isValid).toBe(true);
      });
  });

  it('Should return the status of the links', () => {
    global.fetch = jest.fn()
    fetch.mockResolvedValue({status:404})
    // fetch.mockOnce('invalidLink', { status: 404 });

     validateLinks({url:'https://marvelapp.com/hahsdhsad'})
      .then((response) => {
        expect(response.isValid).toBe(false);
      });
  });
});
