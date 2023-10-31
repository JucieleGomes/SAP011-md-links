#!/usr/bin/env node

const { mdLinks } = require('./MdLinks.js')
const input = process.argv;
const filePath = input[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

  mdLinks(filePath, options).then((links)=>{

        if(options.validate && options.stats){
            console.log('Total:', links.total, 'Valid links:',
             links.validLinks, 'Invalid links:', links.invalidLinks, 'Unique links:', links.uniqueLinks);
    
        }else if(options.validate){
            links.map((link)=>{
             console.log('Title:', link.title, 'Url:', link.url, 'Path:', link.path, 
            'Status:', link.status);
        })
    
        }else if(options.stats){
            console.log('Total:', links.totalLinks, 'Unique:', links.uniqueLinks);


        }else if(!options.stats && !options.validate){
            links.map((link)=>{
                console.log('Title:', link.title, 'Url:', link.url, 'Path:', link.path);
            })
        }

    })
        
      



