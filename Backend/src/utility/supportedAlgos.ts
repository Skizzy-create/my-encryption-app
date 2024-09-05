// here we will have an array of supported symmetric encryption algorithms

const supportedAlgos = ["aes-128-cbc", "aes-192-cbc", "aes-256-cbc", "des-cbc", "des-ede-cbc", "des-ede3-cbc", "desx-cbc", "bf-cbc", "cast-cbc", "rc2-cbc", "rc4", "rc4-40", "rc4-hmac-md5", "seed-cbc", "camellia-128-cbc", "camellia-192-cbc", "camellia-256-cbc", "idea-cbc", "aria-128-cbc", "aria-192-cbc", "aria-256-cbc", "sm4-cbc"];
// and a obejct of supported symmetric encryption algorithms , for better algos inputs

const supportedAlgosObj = {
    'AES256': 'aes-256-cbc',
    'AES192': 'aes-192-cbc',
    'AES128': 'aes-128-cbc',
    'DES': 'des-cbc',
    'DES-EDE': 'des-ede-cbc',
    'DES-EDE3': 'des-ede3-cbc',
    'DESX': 'desx-cbc',
    'BF': 'bf-cbc',
    'CAST': 'cast-cbc',
    'RC2': 'rc2-cbc',
    'RC4': 'rc4',
    'RC4-40': 'rc4-40',
    'RC4-HMAC-MD5': 'rc4-hmac-md5',
    'SEED': 'seed-cbc',
    'CAMELLIA-128': 'camellia-128-cbc',
    'CAMELLIA-192': 'camellia-192-cbc',
    'CAMELLIA-256': 'camellia-256-cbc',
    'IDEA': 'idea-cbc',
    'ARIA-128': 'aria-128-cbc',
    'ARIA-192': 'aria-192-cbc',
    'ARIA-256': 'aria-256-cbc',
    'SM4': 'sm4-cbc'
};

export {
    supportedAlgos,
    supportedAlgosObj
}