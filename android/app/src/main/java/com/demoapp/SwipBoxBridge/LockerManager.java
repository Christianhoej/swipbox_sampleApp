package com.demoapp.SwipBoxBridge;

/*
 * Created by Zubair Akber on 11/10/2019
 * zubair.akber@outlook.com
 */

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.demoapp.communications.dataModels.DataModelCompartments;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.demoapp.communications.CompartmentInterface;
import com.demoapp.communications.CompartmentPresenter;
import com.swipbox.infinity.ble.sdk.LockerCallback;
import com.swipbox.infinity.ble.sdk.LockerConstants;
import com.swipbox.infinity.ble.sdk.SwipBoxLockerManager;
import com.swipbox.infinity.ble.sdk.utils.BleUtils;
import com.swipbox.infinity.ble.sdk.utils.Logger;

import java.util.HashMap;
import java.util.Map;

public class LockerManager extends ReactContextBaseJavaModule implements LockerCallback, CompartmentInterface {

    /* Param Strings */
    private static final String PARAM_UID = "uid";
    private static final String PARAM_TOKEN = "token";
    private static final String PARAM_STATUS = "status";
    private static final String PARAM_ERROR_CODE = "errorCode";
    private static final String PARAM_COMPARTMENT_ID = "compartmentId";
    private static final String PARAM_IS_AUTHENTICATED = "isAuthenticated";
    private static final String PARAM_COMPARTMENT_STATE = "compartmentState";
    private static final String PARAM_AUTHENTICATION_TOKEN = "authenticationToken";
    private static final String PARAM_AUTHENTICATION_RESPONSE = "authenticationResponse";

    /* SwipBox Related Events */
    private static final String EVENT_ERROR = "onError";
    private static final String EVENT_TOKEN_AVAILABLE = "onTokenAvailable";
    private static final String EVENT_STATUS_AVAILABLE = "onStatusAvailable";
    private static final String EVENT_CONNECTION_STATUS_CHANGED = "onConnectionStatusChanged";
    private static final String EVENT_COMPARTMENT_STATUS_CHANGED = "onCompartmentStatusChanged";
    private static final String EVENT_AUTHENTICATION_STATUS_CHANGED = "onAuthenticationStatusChanged";

    /* API Related Events */
    private static final String EVENT_API_ERROR = "onApiError";
    private static final String EVENT_API_DATA_AVAILABLE = "onApiDataAvailable";

    /** Name of the class that will be used in react native */
    private static final String NAME = "LockerManager";

    /** Locker manager object that is responsible for communication with SwipBox hardware */
    private SwipBoxLockerManager swipBoxLockerManager;

    /** Presenter object that is responsible for fetching and presenting data */
    private CompartmentPresenter compartmentPresenter;


    /* Primary Constructor */
    LockerManager(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        swipBoxLockerManager = SwipBoxLockerManager.getInstance(getReactApplicationContext(), this, LockerManager.class.getName());
        swipBoxLockerManager.startScan();
        compartmentPresenter = new CompartmentPresenter(this);
    }

    private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        constants.put("STATUS_DEVICE_TIME_OUT", LockerConstants.STATUS_DEVICE_TIME_OUT);
        constants.put("STATUS_DEVICE_NOT_FOUND", LockerConstants.STATUS_DEVICE_NOT_FOUND);
        constants.put("STATUS_COMPARTMENT_OPEN", LockerConstants.STATUS_COMPARTMENT_OPEN);
        constants.put("ERROR_CODE_EXPIRE_TOKEN", LockerConstants.ERROR_CODE_EXPIRE_TOKEN);
        constants.put("STATUS_DEVICE_CONNECTED", LockerConstants.STATUS_DEVICE_CONNECTED);
        constants.put("STATUS_COMPARTMENT_CLOSE", LockerConstants.STATUS_COMPARTMENT_CLOSE);
        constants.put("STATUS_DEVICE_OUT_OF_RANGE", LockerConstants.STATUS_DEVICE_OUT_OF_RANGE);
        constants.put("ERROR_CODE_DATA_NOT_RETRIEVED", 3);
        return constants;
    }

    @ReactMethod
    public void getData(String uid) {
        compartmentPresenter.getCompartments(uid.toUpperCase());
    }

    @ReactMethod
    public void connect(String uid) {
        swipBoxLockerManager.connect(uid);
    }

    @ReactMethod
    public void disconnect(String uid) {
        swipBoxLockerManager.disconnect(uid);
    }

    @ReactMethod
    public void startScan() {
        swipBoxLockerManager.startScan();
    }

    @ReactMethod
    public void stopScan() {
        swipBoxLockerManager.stopScan();
    }

    @ReactMethod
    public void authenticate(String uid, String challenge, String response) {
        Logger.logEvent("Zubair", "authentication initiated");
        swipBoxLockerManager.authenticate(uid, challenge, response);
    }

    @ReactMethod
    public void openCompartment(String uid, String token) {
        Logger.logEvent("Zubair", "open compartment initiated");
        swipBoxLockerManager.openCompartment(uid, token);
    }

    @Override
    public void onConnectionStatusChanged(String s, int i) {
        Logger.logEvent("Zubair connection status changed", "" + i  + ", name: " + this.getName());

        WritableMap params = Arguments.createMap();
        params.putString(PARAM_UID, s);
        params.putInt(PARAM_STATUS, i);
        sendEvent(getReactApplicationContext(), EVENT_CONNECTION_STATUS_CHANGED, params);
    }

    @Override
    public void onAuthenticationStatusChanged(String s, boolean b) {
        Logger.logEvent("Zubair authentication status changed", "" + b);

        WritableMap params = Arguments.createMap();
        params.putString(PARAM_UID, s);
        params.putBoolean(PARAM_IS_AUTHENTICATED, b);
        sendEvent(getReactApplicationContext(), EVENT_AUTHENTICATION_STATUS_CHANGED, params);
    }

    @Override
    public void onCompartmentStatusChanged(String s, int i, int i1) {
        Logger.logEvent("Zubair compartment status changed", i + ", " + i1);

        WritableMap params = Arguments.createMap();
        params.putString(PARAM_UID, s);
        params.putInt(PARAM_COMPARTMENT_ID, i);
        params.putInt(PARAM_COMPARTMENT_STATE, i1);
        sendEvent(getReactApplicationContext(), EVENT_COMPARTMENT_STATUS_CHANGED, params);
    }

    @Override
    public void onStatusAvailable(String s, byte[] bytes) {
        Logger.logEvent("Zubair status available", BleUtils.convertToHexString(bytes));

        WritableMap params = Arguments.createMap();
        params.putString(PARAM_UID, s);
        params.putString(PARAM_STATUS, BleUtils.convertBytesToBase64(bytes));
        sendEvent(getReactApplicationContext(), EVENT_STATUS_AVAILABLE, params);

    }

    @Override
    public void onTokenAvailable(String s, String s1) {
        Logger.logEvent("Zubair token available", s1);

        WritableMap params = Arguments.createMap();
        params.putString(PARAM_UID, s);
        params.putString(PARAM_TOKEN, s1);
        sendEvent(getReactApplicationContext(), EVENT_TOKEN_AVAILABLE, params);
    }

    @Override
    public void onError(String s, int i) {
        Logger.logEvent("Zubair error", i + "");

        WritableMap params = Arguments.createMap();
        params.putString(PARAM_UID, s);
        params.putInt(PARAM_ERROR_CODE, i);
        sendEvent(getReactApplicationContext(), EVENT_ERROR, params);
    }

    @Override
    public void onDataAvailable(DataModelCompartments dataModelCompartments) {
        if (dataModelCompartments != null && dataModelCompartments.getData().getTokens().size() != 0) {
            WritableMap params = Arguments.createMap();
            params.putString(PARAM_TOKEN, dataModelCompartments.getData().getTokens().get(0).getToken());
            params.putString(PARAM_AUTHENTICATION_TOKEN, dataModelCompartments.getData().getTokens().get(0).getAuth().get(0).getChallenge());
            params.putString(PARAM_AUTHENTICATION_RESPONSE, dataModelCompartments.getData().getTokens().get(0).getAuth().get(0).getResponse());
            sendEvent(getReactApplicationContext(), EVENT_API_DATA_AVAILABLE, params);
        } else
            onError();
    }

    @Override
    public void onError() {
        WritableMap params = Arguments.createMap();
        params.putString(PARAM_ERROR_CODE, "3");
        sendEvent(getReactApplicationContext(), EVENT_API_ERROR, params);
    }
}
