#!/usr/bin/env node
import chalk from 'chalk';
import Prompt from 'commander';

/**
 * **Usage**
 *
 * ```bash
 * npx ts-node precode\publish.ts
 * ```
 * **Login**
 * ```bash
 * npm login --scope=@metacodi --registry=https://npm.pkg.github.com
 * ```
 * 
 * {@link https://docs.github.com/es/packages/working-with-a-github-packages-registry/working-with-the-npm-registry Working with the npm registry}
 */

import { TypescriptProject, Terminal, Resource, Git } from '@metacodi/precode';

Terminal.title('SSH COnnection EXAMPLE');

Prompt
  // .requiredOption('-f, --folder <folder>', 'Ruta absoluta de la carpeta i nom del component.')
  .option('-c, --commit <dir>', 'Descripció pel commit')
  .option('-v, --verbose', 'Log verbose')
  ;
Prompt.parse(process.argv);

if (Prompt.verbose) { console.log('Arguments: ', Prompt.opts()); }

Prompt.folder = Resource.normalize((Prompt.folder || process.cwd()));

const project: TypescriptProject = new TypescriptProject(Prompt.folder);
project.initialize().then(async () => {

  try {

    const sshpass = `sshpass -p X38128316ga_ ssh -o StrictHostKeyChecking=no -l metabot 51.255.174.89 -p 1714`;
    await Terminal.run(`${sshpass} "pwd; ls"`, { verbose: true });
    // await Terminal.run(`X38128316ga_`, { verbose: true });
    await Terminal.run(`${sshpass} "pm2 restart demo"`, { verbose: true });
    // await Terminal.run(`pm2 demo restart`, { verbose: true });
    // await Terminal.run(`ls`, { verbose: true });
    

  } catch (error) {
    Terminal.error(error);
  }

  Terminal.line();
});

