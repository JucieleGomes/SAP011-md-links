#!/usr/bin/env node
const chalk = require('chalk')
const { mdLinks } = require('./MdLinks.js')
const input = process.argv;
const filePath = input[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

  mdLinks(filePath, options).then((links)=>{

        if(options.stats && options.validate){
            console.log('Total:', links.total)
            console.log('Valid links:', links.validLinks)
            console.log( 'Invalid links:', links.invalidLinks), 
            console.log('Unique links:', links.uniqueLinks);
    
        }else if(options.validate){
            links.map((link)=>{

        if(link.status === 200){
            console.log(chalk.white('Title: '), chalk.blue(link.title)), 
            console.log(chalk.white('Url: '), chalk.blue(link.url)), 
            console.log(chalk.white('Path: '), chalk.blue(link.path)), 
            console.log(chalk.white('Status: '), chalk.blue(link.status));

        }else{
            console.log(chalk.white('Title: '), chalk.red(link.title)), 
            console.log(chalk.white('Url: '), chalk.red(link.url)), 
            console.log(chalk.white('Path: '), chalk.red(link.path)), 
            console.log(chalk.white('Status: '), chalk.red(link.status))
        }})
    
        }else if(options.stats){
            console.log(chalk.white('Total: '), chalk.blue(links.totalLinks))
            console.log(chalk.white('Unique: '), chalk.blue(links.uniqueLinks)) 
          

        }else if(!options.stats && !options.validate){
            links.map((link)=>{
            console.log(chalk.white('Title: '), chalk.blue(link.title)), 
            console.log(chalk.white('Url: '), chalk.blue(link.url)), 
            console.log(chalk.white('Path: '), chalk.blue(link.path))
        })}

    }).catch((error)=>{
        if(error.message === 'There are no .md files in the directory'){
            console.log('There are no .md files in the directory');
        }
    })
        
      
