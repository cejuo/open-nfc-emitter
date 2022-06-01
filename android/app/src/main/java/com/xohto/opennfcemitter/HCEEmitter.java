package com.xohto.opennfcemitter;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class HCEEmitter extends ReactContextBaseJavaModule {
    public static String message = "{valid: false}";

    public  HCEEmitter(ReactApplicationContext context){
        super(context);
    }

    @ReactMethod
    public void sendMessage(String message) {
        HCEEmitter.message = message;
    }

    @NonNull
    @Override
    public String getName() {
        return "HCEEmitter";
    }
}
