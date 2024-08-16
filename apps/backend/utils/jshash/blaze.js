/*
    BlazeHash (64-bit) - still experimental and subject to change.
    (c) 2018-2024 bryc (github.com/bryc)
    License: Public domain. Attribution appreciated.
    Intended for blazing fast hashing of byte arrays. Produces two uncorrelated 32-bit hashes in parallel.
*/

exports.blazeHash = (key, seed = 0) => {
	let h1 = 0xcafebabe ^ seed, h2 = 0xdeadbeef ^ seed, i = 0;
	for(let b = key.length & -8; i < b; i += 8) {
		h1 ^= key[i+3] << 24 | key[i+2] << 16 | key[i+1] << 8 | key[i  ];
		h2 ^= key[i+7] << 24 | key[i+6] << 16 | key[i+5] << 8 | key[i+4];
		h1 ^= Math.imul(h2 ^ (h2 >>> 15), 0xca9b4735);
		h2 ^= Math.imul(h1 ^ (h1 >>> 16), 0x38b34ae5);
	}
	switch(key.length & 7) {
		case 7: h2 ^= key[i+6] << 16;
		case 6: h2 ^= key[i+5] << 8;
		case 5: h2 ^= key[i+4];
		case 4: h1 ^= key[i+3] << 24;
		case 3: h1 ^= key[i+2] << 16;
		case 2: h1 ^= key[i+1] << 8;
		case 1: h1 ^= key[i];
			h1 ^= Math.imul(h2 ^ (h2 >>> 15), 0xca9b4735);
			h2 ^= Math.imul(h1 ^ (h1 >>> 16), 0x38b34ae5);
	}
	h1 ^= key.length ^ h2;
	h1 ^= Math.imul(h1 ^ (h2 >>> 15), 0x735a2d97);
	h2 ^= Math.imul(h2 ^ (h1 >>> 15), 0xcaf649a9);
	h1 ^= h2 >>> 16; h2 ^= h1 >>> 16;
	return [h1 >>> 0, h2 >>> 0];
	//return 2097152 * (h2 >>> 0) + (h1 >>> 11);
}
