
const text = document.querySelector('#text'),
			cripto = document.querySelector('#cripto'),
			decripto = document.querySelector('#decripto'),
			key = document.querySelector('#keyWord'),
			goBtn = document.querySelector('#go'),
			comText = document.querySelector('#compdited-text');

// Функция шифрования текста с помощью шифра Виженера
function vigenereEncrypt(plainText, keyword) {
  let encryptedText = "";
  let keywordIndex = 0;

  for (let i = 0; i < plainText.length; i++) {
    let plainCharCode = plainText.charCodeAt(i);

    // Проверяем, является ли символ буквой
    if (isLetter(plainCharCode)) {
      let keywordCharCode = keyword.charCodeAt(keywordIndex % keyword.length);
      let keywordOffset = getAlphabetOffset(keywordCharCode);
      let encryptedCharCode = (plainCharCode - 1040 + keywordOffset) % 32 + 1040;
      encryptedText += String.fromCharCode(encryptedCharCode);
      keywordIndex++;
    } else {
      encryptedText += plainText[i]; // Оставляем символы, которые не являются буквами без изменений
    }
  }

  return encryptedText;
}

// Функция дешифрования текста с помощью шифра Виженера
function vigenereDecrypt(encryptedText, keyword) {
  let decryptedText = "";
  let keywordIndex = 0;

  for (let i = 0; i < encryptedText.length; i++) {
    let encryptedCharCode = encryptedText.charCodeAt(i);

    // Проверяем, является ли символ буквой
    if (isLetter(encryptedCharCode)) {
      let keywordCharCode = keyword.charCodeAt(keywordIndex % keyword.length);
      let keywordOffset = getAlphabetOffset(keywordCharCode);
      let decryptedCharCode = (encryptedCharCode - 1040 - keywordOffset + 32) % 32 + 1040;
      decryptedText += String.fromCharCode(decryptedCharCode);
      keywordIndex++;
    } else {
      decryptedText += encryptedText[i]; // Оставляем символы, которые не являются буквами без изменений
    }
  }

  return decryptedText;
}

// Вспомогательная функция для проверки, является ли код символа буквой
function isLetter(charCode) {
  return (charCode >= 1040 && charCode <= 1071) || (charCode >= 1072 && charCode <= 1103);
}

// Вспомогательная функция для получения порядкового номера буквы в алфавите
function getAlphabetOffset(charCode) {
  return (charCode >= 1072) ? charCode - 1072 : charCode - 1040;
}

function mainCripto() {
	if(cripto.checked == true) {
		comText.value = vigenereEncrypt((text.value).toLowerCase(), key.value);
	};
	if(decripto.checked == true) {
		comText.value = vigenereDecrypt((text.value).toLowerCase(), key.value);
	}
}

goBtn.addEventListener('click', ()=> {mainCripto();})


