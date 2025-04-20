#!/usr/bin/env node

const { program } = require('commander');
const { convertExtension } = require('./commands/convertExtension');
const { createPdf } = require('./commands/createPdf');

program
  .name('imgtools')
  .description('CLI tool for image batch processing')
  .version('1.0.0');

program
  .command('convert')
  .description('Convert file extensions in a directory')
  .argument('<directory>', 'Input directory containing images')
  .option('--from <ext>', 'Source extension', 'jpg')
  .option('--to <ext>', 'Target extension', 'png')
  .action(convertExtension);

program
  .command('topdf')
  .description('Convert image sequence to PDF')
  .argument('<directory>', 'Input directory containing images')
  .option('-o, --output <file>', 'Output PDF file', 'output/result.pdf')
  .action(createPdf);

program.parse(); 