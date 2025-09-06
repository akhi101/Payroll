using System;
using System.Text;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Paddings;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Modes;

namespace PayRoll.Models.Security
{
    public class BCEngine
    {
        private readonly Encoding _encoding;
        private readonly IBlockCipher _blockCipher;
        private PaddedBufferedBlockCipher _cipher;
        private IBlockCipherPadding _padding;

        public BCEngine(IBlockCipher blockCipher, Encoding encoding)
        {
            _blockCipher = blockCipher;
            _encoding = encoding;
        }

        public void SetPadding(IBlockCipherPadding padding)
        {
            if (padding != null)
                _padding = padding;
        }

        public string Encrypt(string plain, string key)
        {
            byte[] result = BouncyCastleCrypto(true, _encoding.GetBytes(plain), key);
            return Convert.ToBase64String(result);
        }

        public string H_macEncrypt(string plain, string key)
        {
            byte[] result = BouncyCastleCrypto(true, Convert.FromBase64String(plain), key);
            return Convert.ToBase64String(result);
        }

        public string Decrypt(string cipher, string key)
        {
            byte[] result = BouncyCastleCrypto(false, Convert.FromBase64String(cipher), key);
            // 🔹 Changed to GetString so you get the actual plaintext, not Base64
            return _encoding.GetString(result);
        }

        private byte[] BouncyCastleCrypto(bool forEncrypt, byte[] input, string key)
        {
            try
            {
                // 🔹 Wrap engine in CBC mode (can be replaced with CTR, ECB, etc.)
                IBlockCipherMode mode = new CbcBlockCipher(_blockCipher);

                _cipher = _padding == null
                    ? new PaddedBufferedBlockCipher(mode)
                    : new PaddedBufferedBlockCipher(mode, _padding);

                byte[] keyByte = Convert.FromBase64String(key);

                _cipher.Init(forEncrypt, new KeyParameter(keyByte));
                return _cipher.DoFinal(input);
            }
            catch (Org.BouncyCastle.Crypto.CryptoException ex)
            {
                throw new CryptoException("Encryption/Decryption failed", ex);
            }
        }
    }
}
