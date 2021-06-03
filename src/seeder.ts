import * as chalk from 'chalk';
import * as glob from 'glob';

let SeedsPaths = glob(`${__dirname}/**/Data/*.seed.ts`, { sync: true });
SeedsPaths.forEach((seed) => {
	eval(require(`${seed}`)['default']) && console.log(`${chalk['green'](`Seed ${seed} criada com sucesso!`)}`);
});
