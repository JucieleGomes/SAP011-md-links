#!/usr/bin/env node
const chalk = require('chalk')
const { readMdFile } = require('./MdLinks.js')
const input = process.argv;
const filePath = input[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

  readMdFile(filePath, options).then((links)=>{

        if(options.stats && options.validate){
            console.log(chalk.cyan('Total:'), chalk.cyan(links.totalLinks))
            console.log(chalk.cyan('Unique links:'), chalk.cyan(links.uniqueLinks));
            console.log(chalk.underline.green('Valid links:'),chalk.green(links.validLinks))
            console.log( chalk.underline.red('Invalid links:'), chalk.red(links.invalidLinks))
  
    
        }else if(options.validate){
            links.map((link)=>{

        if(link.status === 200){
            console.log(chalk.white('Title: '), chalk.cyan(link.title)), 
            console.log(chalk.white('Url: '), chalk.green(link.url)), 
            console.log(chalk.white('Path: '), chalk.grey(link.path)), 
            console.log(chalk.white('Status: '), chalk.green(link.status));
            console.log('');

        }else{
            console.log(chalk.white('Title: '), chalk.magenta(link.title)) 
            console.log(chalk.white('Url: '), chalk.red(link.url)), 
            console.log(chalk.white('Path: '), chalk.grey(link.path)), 
            console.log(chalk.white('Status: '), chalk.red(link.status))
            console.log('');
        }})
    
        }else if(options.stats){
            console.log(chalk.cyan('Total: '), chalk.cyan(links.totalLinks))
            console.log(chalk.magenta('Unique: '), chalk.magenta(links.uniqueLinks)) 
            console.log('');
          

        }else if(!options.stats && !options.validate){
            links.map((link)=>{
            console.log(chalk.white('Title: '), chalk.cyan(link.title)), 
            console.log(chalk.white('Url: '), chalk.grey(link.url)), 
            console.log(chalk.white('Path: '), chalk.cyan(link.path))
        })}

    }).catch((error) => {
        if (error instanceof Error && error.message === 
            'It is not possible to continue, the file is not .md') {
          console.log(chalk.bgRed('FAIL'), chalk.red('It is not possible to continue, the file is not .md'));
        }else if(error instanceof Error && error.message ===
             'The file is empty or does not contain any links.'){
            console.log(chalk.bgRed('FAIL'), chalk.red('The file is empty or does not contain any links.'));
        }
      });
      
      
