package com.workshop1;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class ConnectionStatusModuleManager extends ReactContextBaseJavaModule {
  public ConnectionStatusModuleManager (ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "ConnectionStatusModule";
  }

  @ReactMethod
  public void checkConnectionStatus(Callback callback) {
    callback.invoke("Conectado");
  }
}
