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

        }else{
            console.log(chalk.white('Title: '), chalk.magenta(link.title)), 
            console.log(chalk.white('Url: '), chalk.red(link.url)), 
            console.log(chalk.white('Path: '), chalk.grey(link.path)), 
            console.log(chalk.white('Status: '), chalk.red(link.status))
        }})
    
        }else if(options.stats){
            console.log(chalk.cyan('Total: '), chalk.cyan(links.totalLinks))
            console.log(chalk.magenta('Unique: '), chalk.magenta(links.uniqueLinks)) 
          

        }else if(!options.stats && !options.validate){
            links.map((link)=>{
            console.log(chalk.white('Title: '), chalk.cyan(link.title)), 
            console.log(chalk.white('Url: '), chalk.grey(link.url)), 
            console.log(chalk.white('Path: '), chalk.cyan(link.path))
        })}

    })
      
