interface Options {
	ignoreWords: string[];
	forceLowerCase: boolean;
}
type OptionsPartial = Partial<Options>;

const optionsIntial: Options = {
	ignoreWords: [],
	forceLowerCase: true
};

const SEPARETOR_SKEWER = '-';
const toLowerCase = (text: string) => text.toLowerCase();

const convert = (pascalCaseText: string, forceLowerCase: boolean) => {
	const formated = pascalCaseText.replace(/([a-z])([A-Z])/g, `$1${SEPARETOR_SKEWER}$2`);

	return forceLowerCase ? toLowerCase(formated) : formated;
};

const filterWords = (words: string[], removeWords: string[]) => {
	const removeWordsLower = removeWords.map(toLowerCase);

	return words.filter(word => !removeWordsLower.includes(toLowerCase(word)));
};

export const pascalCaseToWordList = (pascalCaseText: string, options: OptionsPartial = {}): string[] => {
	const optionsUpdated = { ...optionsIntial, ...options };
	const words = convert(pascalCaseText, optionsUpdated.forceLowerCase).split(SEPARETOR_SKEWER);

	return filterWords(words, optionsUpdated.ignoreWords);
};

export const pascalCaseToSkewerCase = (pascalCaseText: string, options: OptionsPartial = {}): string => {
	return pascalCaseToWordList(pascalCaseText, options).join(SEPARETOR_SKEWER);
};
