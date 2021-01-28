package com.mobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class EncryptionModule extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "Encryptor";  // Name of the Native Modules.
    }

    @ReactMethod
    public void encrypt(String plainText, Promise promise) {
        try {
        // Add your encryption logic here 
        // (can use any JAVA encryption library or use default)
        String encryptedText = plainText + "This is encrypted text";
        promise.resolve(encryptedText); // return encryptedText
        } catch (Exception e) {
        promise.reject("ENCRYPTION_FAILED", "Encryption Failed");
        }
    }

    @ReactMethod
    public void decrypt(String encryptedText, Promise promise) {
        try {
        // Add your decryption logic here 
        // (can use any JAVA decryption library or use default)
        String decryptedText = encryptedText + "This is decrypted text";
        promise.resolve(decryptedText); // return decryptedText
        } catch (Exception e) {
        promise.reject("DECRYPTION_FAILED", "Decryption Failed");
        }
    }

}

