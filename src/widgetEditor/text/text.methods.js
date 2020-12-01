const l10n = require('./l10n');

const textMethods = {
    l10n(textKey) {
        let lang = 'ru';
        let text = textKey || '';

        if (l10n[textKey]) {
            text = l10n[textKey][lang];
        }

        return text;
    }
};

export default textMethods;