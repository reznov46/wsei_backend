export const stringToBool = (input?: string): boolean | null => {
	if (input === 'true') {
		return true;
	}

	if (input === 'false') {
		return false;
	}

	return null;
};
