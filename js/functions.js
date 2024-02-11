//Функция для проверки, является ли строка палиндромом.
function checkPalindrome(str) {
  str = str.toLowerCase('').replaceAll(' ', '');
  const reverseStr = str.split('').reverse().join('');
  if(reverseStr === str) {
    return true;
  }
  return false;
}

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Не Палиндром');
checkPalindrome('Лёша на полке клопа нашёл');

/** Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает
 *их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
 *
*/
function findNumber(str) {
  if(typeof str === 'number') {
    str = str.toString();
  }

  let num = '';
  for (let i = 0; i <= str.length; i++) {
    if(!Number.isNaN(parseInt(str.at(i), 10))) {
      num += str.at(i);
    }
  }
  return parseInt(num, 10);
}

findNumber('2023 год');
findNumber('ECMAScript 2022');
findNumber('1 кефир, 0.5 батона');
findNumber('агент 007');
findNumber('а я томат');
findNumber(-1);
findNumber(2023);
findNumber(1.5);

/**Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с
 * добавочными символами — и возвращает исходную строку, дополненную указанными символами до
 * заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину,
 * она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
 * */
function completeStr(str, length, add) {
  const actualPad = length - str.length;
  if(actualPad <= 0) {
    return str;
  }
  return add.slice(0, actualPad % add.length) + add.repeat(actualPad / add.length) + str;
}

completeStr('1', 2, '0');
completeStr('1', 4, '0');
completeStr('q', 4, 'werty');
completeStr('q', 4, 'we');
completeStr('qwerty', 4, '0');

/** Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную
 *  длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
 *  Эта функция нам пригодится для валидации формы
 */
function checkLength(str, length) {
  return str.length <= length;
}

checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);
