const NIF_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
const NIF_MAX_LENGTH = 9;
const NIF_MIN_LENGTH = 8;
const NIE_LETTERS = 'XYZ';
const NIF_REGEX = /^(\d{8})([A-Z])$/i;
const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/i;
const NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/i;
const PHONE_NUMBER = /^(\+[0-9]{1,3})?(?:[0-9] ?){6,14}[0-9]$/;
const NO_DECIMAL = /^[0-9]$/i;

function validateNIF(documentId) {
  let isValid = false;

  if (!documentId) {
    return isValid;
  }

  const hasCorrectLength =
    documentId.length >= NIF_MIN_LENGTH && documentId.length <= NIF_MAX_LENGTH;

  if (hasCorrectLength) {
    const NIFLetter = documentId[documentId.length - 1].toUpperCase();
    const NIFNumber =
      parseInt(documentId.substring(0, documentId.length - 1)) % 23;

    isValid = NIFLetter === NIF_LETTERS[NIFNumber];
  }

  return isValid;
}

function validateCIF(documentId) {
  const lettersControl = 'JABCDEFGHI';
  const CIF_length = 9;
  let isValid = false;

  if (!documentId) {
    return isValid;
  }

  documentId = documentId.toUpperCase();

  if (documentId.length === CIF_length) {
    let match = documentId.match(CIF_REGEX);
    if (match !== undefined && match !== null && match.length >= 4) {
      let number = match[2],
        control = match[3];

      let digitsCIF = parseInt(number);
      if (!isNaN(digitsCIF)) {
        let sum = 0;
        let num = 0;
        for (var i = 0; i < number.length; i++) {
          num = parseInt(number[i]);
          if (i % 2 === 0) {
            num *= 2;
            sum += num < 10 ? num : num - 9;
          } else sum += num;
        }

        sum = (10 - (sum % 10)) % 10;

        let digitControl = parseInt(control);
        let controlExpected = parseInt(control);

        if (!isNaN(digitControl)) {
          controlExpected = sum.toString();
        } else {
          controlExpected = lettersControl[sum];
        }

        isValid = control === controlExpected;
      }
    }
  }

  return isValid;
}

function validateNIE(documentId) {
  if (!documentId) {
    return false;
  }

  const firstLetter = documentId[0].toUpperCase();
  const prefix = NIE_LETTERS.indexOf(firstLetter);

  if (!prefix) {
    return false;
  }

  return validateNIF(prefix + documentId.substring(1));
}

function validateCadastralReference(value) {
  
  if (!value) return true;
  if (value && value.length === 14) return true;
  if (value && value.length === 20) {
    value = value.toUpperCase();

    const ref1 = value.substring(0, 7);
    const ref2 = value.substring(7, 14);
    const car = value.substring(14, 18);
    const DC1 = value[18];
    const DC2 = value[19];

    const sRef1 = ref1 + car;
    const sRef2 = ref2 + car;

    if (DC1 === getControlDigit(sRef1) && DC2 === getControlDigit(sRef2))
      return true;
  }

  return false;
}

function getControlDigit(ref) {
  const Restos = 'MQWERTYUIOPASDFGHJKLBZXCVÑN';
  const Pesos = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  const Digits = [13, 15, 12, 5, 4, 17, 9, 21, 3, 7, 1];

  let nResultado = 0;

  for (var nIndex = 0; nIndex < ref.length; nIndex++) {
    let nBuffer = 0;
    let sBuffer = ref[nIndex];

    if (!isNaN(parseInt(sBuffer, 10))) nBuffer = parseInt(sBuffer, 10);
    else nBuffer = Pesos.indexOf(sBuffer) + 1;

    nResultado += nBuffer * Digits[nIndex];
  }

  nResultado = nResultado % 23;
  return Restos[nResultado];
}

function validatePhone(phone) {
  const phoneNumber = phone.replaceAll(/\s/g, '');
  if (!phone || !phone?.length)
    return true;
  return (PHONE_NUMBER.test(phoneNumber));
};

export const validations = {
  hourFormat: {
    name: 'hourFormat',
    cb: (value) => !isNaN(value) && value?.length <= 5,
  },
  daysFormat: {
    name: 'daysFormat',
    cb: (value) => !isNaN(value) && value?.length <= 5,
  },
  nifFormat: {
    name: 'nifFormat',
    cb: (value) => value.match(NIF_REGEX) && validateNIF(value),
  },
  cifFormat: {
    name: 'cifFormat',
    cb: (value) => value.match(CIF_REGEX) && validateCIF(value),
  },
  nieFormat: {
    name: 'nieFormat',
    cb: (value) => value.match(NIE_REGEX) && validateNIE(value),
  },
  cadastralReferenceFormat: {
    name: 'cadastralReferenceFormat',
    cb: (value) => validateCadastralReference(value),
  },
  phoneNumber: {
    name: 'phoneNumberFormat',
    cb: (value) => validatePhone(value),
  },
  noDecimal: {
    name: 'noDecimal',
    cb: (value) => value ? value.match(NO_DECIMAL) : true
  }
};
