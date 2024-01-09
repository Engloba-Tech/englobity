import { stringHelper } from './string.helper';

describe('string helper should', () => {
  it('capitalize first leter', () => {
    const stringToCapitalize = 'hola que tal';
    const result = 'Hola que tal';

    const capitalized = stringHelper.capitalizeFirstLetter(stringToCapitalize);

    expect(capitalized).toEqual(result);
  });

  it('normalize quotes string', () => {
    const stringToCapitalize = '""workOrders:validations.duplicated""';
    const result = 'workOrders:validations.duplicated';

    const normalize = stringHelper.normalizeQuotes(stringToCapitalize);

    expect(normalize).toEqual(result);
  });

  it('split string from key', () => {
    const string = 'user@gmail.com';

    expect(stringHelper.splitFrom('@', string)).toBe('user');
  });

  it('trow an error if is not a string', () => {
    expect(() => stringHelper.capitalizeFirstLetter(2)).toThrowError(
      'Englobity error ocurred formatting a string: string required, number found'
    );
  });
});
