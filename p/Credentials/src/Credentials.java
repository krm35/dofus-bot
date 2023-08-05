// https://github.com/ProjectBlackFalcon/DatBot/blob/master/DatBot.Interface/src/protocol/network/Crypto.java
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import javax.crypto.Cipher;


public class Credentials {

    private static final int AES_KEY_LENGTH = 32;

    private static final String publicKey =
            "MIIBUzANBgkqhkiG9w0BAQEFAAOCAUAAMIIBOwKCATIAgucoka9J2PXcNdjcu6CuDmgteIMB+rih" +
                    "2UZJIuSoNT/0J/lEKL/W4UYbDA4U/6TDS0dkMhOpDsSCIDpO1gPG6+6JfhADRfIJItyHZflyXNUj" +
                    "WOBG4zuxc/L6wldgX24jKo+iCvlDTNUedE553lrfSU23Hwwzt3+doEfgkgAf0l4ZBez5Z/ldp9it" +
                    "2NH6/2/7spHm0Hsvt/YPrJ+EK8ly5fdLk9cvB4QIQel9SQ3JE8UQrxOAx2wrivc6P0gXp5Q6bHQo" +
                    "ad1aUp81Ox77l5e8KBJXHzYhdeXaM91wnHTZNhuWmFS3snUHRCBpjDBCkZZ+CxPnKMtm2qJIi57R" +
                    "slALQVTykEZoAETKWpLBlSm92X/eXY2DdGf+a7vju9EigYbX0aXxQy2Ln2ZBWmUJyZE8B58CAwEA" +
                    "AQ==";

    public static byte[] encrypt(byte[] encryptedKey, String login, String password, String salt) throws Exception {
        byte[] decryptedKey = decryptReceivedKey(encryptedKey);
        return encryptCredentials(decryptedKey, login, password, salt);
    }

    private static byte[] decryptReceivedKey(byte[] receivedKey) {
        byte[] resultKey = null;
        try {
            byte[] decodedKey = Base64.getDecoder().decode(publicKey);
            X509EncodedKeySpec spec = new X509EncodedKeySpec(decodedKey);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            RSAPublicKey pk = (RSAPublicKey) kf.generatePublic(spec);

            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.DECRYPT_MODE, pk);
            resultKey = cipher.doFinal(receivedKey);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultKey;
    }

    private static byte[] encryptCredentials(byte[] key, String login, String password, String salt) throws Exception {
        byte[] encryptedCredentials = null;
        ByteArrayOutputStream ous = new ByteArrayOutputStream();
        DataOutputStream buffer = new DataOutputStream(ous);
        buffer.write(salt.getBytes());
        buffer.write(generateRandomAESKey());
        buffer.writeByte((byte) login.length());
        buffer.write(login.getBytes());
        buffer.write(password.getBytes());
        try {
            KeyFactory kf = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec x509 = new X509EncodedKeySpec(key);
            RSAPublicKey publicKey = (RSAPublicKey) kf.generatePublic(x509);

            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);
            encryptedCredentials = cipher.doFinal(ous.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return encryptedCredentials;
    }

    private static byte[] generateRandomAESKey() throws IOException, IllegalArgumentException, SecurityException {
        ByteArrayOutputStream ous = new ByteArrayOutputStream();
        DataOutputStream array = new DataOutputStream(ous);
        for (int i = 0; i < AES_KEY_LENGTH; ++i)
            array.writeByte((byte) Math.floor(Math.random() * 256));
        return ous.toByteArray();
    }

    public static String hex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte aByte : bytes) {
            result.append(String.format("%02x", aByte));
        }
        return result.toString();
    }

    public static byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }

    public static void main(String[] args) throws Exception {
        byte[] key = hexStringToByteArray(args[0]);
        System.out.print(hex(encrypt(key, "   ", args[2], args[1])));
    }
}