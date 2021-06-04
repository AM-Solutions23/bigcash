import * as chalk from "chalk";
import * as glob from "glob";

let SeedsPaths = glob(`${__dirname}/**/Data/*.seed.ts`, { sync: true });
(function () {
	console.log(`${chalk["blue"]("Processando seeds...")}`);
	SeedsPaths.forEach((seed) => {
		require(`${seed}`).default &&
			console.log(`${chalk["green"](`Seed ${seed} criada com sucesso!`)}`);
	});
	return true;
})();
