function validateBeforeExecute(string, cb) {
	if (typeof string === 'string') {
		return cb();
	} else {
		throw new Error(`Englobity error ocurred formatting a string: string required, ${typeof string} found`);
	}
}

function capitalizeFirstLetter(string) {
	return validateBeforeExecute(
		string,
		() => string.charAt(0).toUpperCase() + string.slice(1)
	);
}

function normalizeQuotes(string) {
	return validateBeforeExecute(string, () => string.replace(/"/g, ''));
}

function splitFrom(key, string) {
	return validateBeforeExecute(string, () => string.split(key)[0]);
}

export const stringHelper = {
	capitalizeFirstLetter,
	normalizeQuotes,
	splitFrom,
};
