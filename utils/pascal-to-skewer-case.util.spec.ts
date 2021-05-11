import { pascalCaseToSkewerCase, pascalCaseToWordList } from './pascal-to-skewer-case.util';

class CrazyLifeComponent {}
class VclExampleDemoComponent {}

describe('pascal-to-skewer-case.util', () => {
	it("should work normally even if it doesn't pass PascalCase text", () => {
		const output = 'god_b28-!->ok';
		const entry = pascalCaseToSkewerCase(output);

		expect(entry).toStrictEqual(output);
	});

	it('should covert PascalCase to skewer-case', () => {
		const entry = pascalCaseToSkewerCase(CrazyLifeComponent.name);
		const entryList = pascalCaseToWordList(CrazyLifeComponent.name);

		const output = 'crazy-life-component';
		const outputList = ['crazy', 'life', 'component'];

		expect(entry).toStrictEqual(output);
		expect(entryList).toStrictEqual(outputList);
	});

	it('should covert PascalCase to Skewer-Case with config forceLowerCase:false', () => {
		const entry = pascalCaseToSkewerCase(VclExampleDemoComponent.name, {
			forceLowerCase: false
		});
		const entryList = pascalCaseToWordList(VclExampleDemoComponent.name, {
			forceLowerCase: false
		});
		const output = 'Vcl-Example-Demo-Component';
		const outputList = ['Vcl', 'Example', 'Demo', 'Component'];

		expect(entry).toStrictEqual(output);
		expect(entryList).toStrictEqual(outputList);
	});

	it('should convert PascalCase to skewer-case with removed words', () => {
		const ignoreWords = ['comPonEnt', 'demo', 'vcl'];
		const entry = pascalCaseToSkewerCase(VclExampleDemoComponent.name, {
			ignoreWords
		});
		const entryList = pascalCaseToWordList(VclExampleDemoComponent.name, {
			ignoreWords
		});
		const output = 'example';
		const outputList = ['example'];

		expect(entry).toStrictEqual(output);
		expect(entryList).toStrictEqual(outputList);
	});
});
