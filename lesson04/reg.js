// Задание 1. Дан большой текст, в котором для оформления прямой речи
// используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.

const str = `Lorem ipsum 'dolor' sit ame't, 'consectetur' adipiscing elit`
const regexp1 = /'/g;
console.log(str.replace(regexp1, '"'));

// Задание 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка
// не заменялась на двойную.

const regexp2 = /\B'|'\B/gi;
console.log(str.replace(regexp2, '"'));
