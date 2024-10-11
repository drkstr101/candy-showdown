/* eslint-disable @typescript-eslint/no-require-imports */
const { readFile, writeFile } = require('fs/promises');

const PACKAGE = '@g-loot/react-tournament-brackets';

/**
 * @g-loot/react-tournament-brackets@1.0.31.rc1 seems to have an incorrect value for the
 * `types` field in package.json. This path sets it to the first of possibly two correct
 * values: `dist/cjs/index.d.ts` or `dist/esm/index.d.ts`.
 */
async function main() {
  const filePath = require.resolve(`${PACKAGE}/package.json`);
  if (filePath) {
    console.log(`Patching file at: ${filePath}`);

    const res = await readFile(filePath, 'utf8');
    const pkg = JSON.parse(res);

    if (pkg['types'] === 'dist/index.d.ts') {
      // console.log(`Updating package types: 'dist/index.d.ts' => 'dist/cjs/index.d.ts'`);

      pkg['types'] = 'dist/cjs/index.d.ts';
      await writeFile(filePath, JSON.stringify(pkg, null, '\t'), { encoding: 'utf8' });

      console.log('Patch complete.');
    }
  }
}

main();
