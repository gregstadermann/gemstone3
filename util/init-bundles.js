#!/usr/bin/env node
'use strict';

const cp = require('child_process');
const fs = require('fs');
const os = require('os');
const readline = require('readline');

const gitRoot = cp.execSync('git rev-parse --show-toplevel').toString('utf8').trim();
process.chdir(gitRoot);

async function prompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question('Do you want to install the example bundles? [Y/n] ', resolve);
  });
}

async function main() {

  try {
    let answer = await prompt();

    if (answer === 'n') {
      throw 'foo';
    }
  } catch (err) {
    console.log('Done.');
    process.exit(0);
  }

  const githubPath = 'https://github.com/gregstadermann/';
  const defaultBundles = [
    'https://github.com/gregstadermann/areas',
    'https://github.com/gregstadermann/channels',
    'https://github.com/gregstadermann/combat',
    'https://github.com/gregstadermann/commands',
    'https://github.com/gregstadermann/debug',
    'https://github.com/gregstadermann/effects',
    'https://github.com/gregstadermann/input-events',
    'https://github.com/gregstadermann/lib',
    'https://github.com/gregstadermann/npc-behaviors',
    'https://github.com/gregstadermann-player-events',
    'https://github.com/gregstadermann/quests',
    'https://github.com/gregstadermann/simple-crafting',
    'https://github.com/gregstadermann/vendor-npcs',
    'https://github.com/gregstadermann/player-groups',
    'https://github.com/gregstadermann/progressive-respawn',
    'https://github.com/gregstadermann/telnet-networking',
    'https://github.com/gregstadermann/websocket-networking',
  ];
  const enabledBundles = [];

  const modified = cp.execSync('git status -uno --porcelain').toString();
  if (modified) {
    console.warn('You have uncommitted changes. For safety setup-bundles must be run on a clean repository.');
    process.exit(1);
  }

  // add each bundle as a submodule
  for (const bundle of defaultBundles) {
    const bundlePath = `bundles/${bundle}`;
    cp.execSync(`npm run install-bundle ${bundle}`);
  }
  console.info('Done.');

  console.info('Enabling bundles...');
  const ranvierJsonPath = __dirname + '/../ranvier.json';
  const ranvierJson = require(ranvierJsonPath);
  ranvierJson.bundles = defaultBundles.map(bundle => bundle.replace(/^.+\/([a-z\-]+)$/, '$1'));
  fs.writeFileSync(ranvierJsonPath, JSON.stringify(ranvierJson, null, 2));
  console.info('Done.');

  cp.execSync('git add ranvier.json');

  console.info(`
-------------------------------------------------------------------------------
Example bundles have been installed as submodules. It's recommended that you now
run the following commands:

  git commit -m "Install bundles"

You're all set! See https://gregstadermann.com for guides and API references
`);

  process.exit(0);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
