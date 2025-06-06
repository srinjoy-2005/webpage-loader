const { Command } = require('commander');
const { saveCommand } = require('./save');

const program = new Command();

program
    .name('webpage-loader')
    .description('CLI tool for downloading and saving webpage HTML')
    .version('1.0.0');


program
    .command('save <url>')
    .description('Fetch HTML content and save it to a file')
    .action(saveCommand);

program.parse(process.argv);