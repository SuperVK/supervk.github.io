const RSAKeys = require('node-rsa')
let key = new RSAKeys()
try {
    if(privatekey.value != '') key.importKey(privatekey.value, 'pkcs1-private-pem')
    if(publickey.value != '') key.importKey(publickey.value, 'pkcs1-public-pem')
} catch(e) {
    
}

generate.addEventListener('click', function () {
    key.generateKeyPair(1024)
    privatekey.value = key.exportKey('pkcs1-private-pem')
    publickey.value = key.exportKey('pkcs1-public-pem')
})

loadprivate.addEventListener('click', function () {
    key.importKey(privatekey.value, 'pkcs1-private-pem')
})

loadpublic.addEventListener('click', function () {
    key.importKey(publickey.value, 'pkcs1-public-pem')
})

encrypt.addEventListener('click', function () {
    encrypted.value = key.encrypt(plaintext.value, 'base64')
    assymetricError.value = ''
})

decrypt.addEventListener('click', function () {
    try {
        plaintext.value = key.decrypt(encrypted.value)
        assymetricError.innerHTML = ''
    } catch(e) {
        plaintext.value = ''
        assymetricError.innerHTML = 'ERROR: incorrect key'
    }
})

sign.addEventListener('click', function () {
    signature.value = key.sign(plaintextSign.value, 'base64')
})

verify.addEventListener('click', function () {
    try {
        validility.innerHTML = 'Valid:' + key.verify(plaintextSign.value, signature.value, 'utf8', 'base64')
    } catch(e) {
        validility.innerHTML = 'Error, weird key'
    }
})

