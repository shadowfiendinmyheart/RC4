// Utils
const byteCount = string => Buffer.from(string).length;
const swap = (array, first, second) => {
    [array[first], array[second]] = [array[second], array[first]];
}

// RC4
const cipherText = (textBytes, key) => {
    const N = 8;
    const blockSize = 2 ** N;
    const keyLength = byteCount(key);

    let S = [];
    const initSblock = (keyLength) => {
        for (let i = 0; i < blockSize; i++) {
            S[i] = i;
        }
        let j = 0;
        for (let i = 0; i < blockSize; i++) {
            j = (j + S[i] + key[i % keyLength].charCodeAt(0)) % blockSize;
            swap(S, i, j);
        }
    }
    initSblock(keyLength);
    
    let x = 0;
    let y = 0;
    const pseudoRandomGenerationAlgoritm = () => {
        x = (x + 1) % blockSize;
        y = (y + S[x]) % blockSize;
        swap(S, x, y);
        return S[(S[x] + S[y]) % blockSize];
    }
    
    const sipherBytes = new Array(textBytes.length);
    for (let i = 0; i < textBytes.length; i++) {
        sipherBytes[i] = textBytes[i] ^ pseudoRandomGenerationAlgoritm();
    }
    
    return sipherBytes;
}

module.exports = {
    cipherText
}
