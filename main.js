const readline = require('readline');
const {
    cipherText
} = require('./RC4');

const rl = readline.createInterface(process.stdin, process.stdout);
const question = function (query) {
    return new Promise((res, rej) => {
        rl.question(query, answer => {
            res(answer);
        })
    });
};

(async function main() {
    let key = '';
    while (key.length === 0) {
        key = await question('Введите ключ: ');
    }
    console.log('Ваш ключ -', key);

    let text = '';
    while (text.length === 0) {
        text = await question('\nВведите сообщение для зашифровки: ');
    }
    console.log('Ваше сообщение -', text);

    const textBytes = text.split('').map(word => {
        return word.charCodeAt(0);
    });

    const cipheredText = cipherText(textBytes, key);
    console.log('\nЗашифрованное сообщение - ', cipheredText.map(bit => String.fromCharCode(bit)).join(''));
    const decryptedText = cipherText(cipheredText, key);
    console.log('Расшифрованное сообщение - ', decryptedText.map(bit => String.fromCharCode(bit)).join(''));

    rl.close();
})();