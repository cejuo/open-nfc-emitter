package com.xohto.opennfcemitter;

import android.nfc.cardemulation.HostApduService;
import android.os.Bundle;
import android.util.Log;

public class HostCardEmulatorService extends HostApduService {
    @Override
    public byte[] processCommandApdu(byte[] commandApdu, Bundle extras) {
        return HCEEmitter.message.getBytes();
    }

    @Override
    public void onDeactivated(int reason) {
        Log.i("OPENNFC", "Deactivated: " + reason);
    }
}