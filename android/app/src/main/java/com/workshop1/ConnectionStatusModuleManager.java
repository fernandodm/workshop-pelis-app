package com.workshop1;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.net.ConnectivityManager;
import android.net.NetworkInfo;

public class ConnectionStatusModuleManager extends ReactContextBaseJavaModule {
  private ConnectivityManager connectivity;

  public ConnectionStatusModuleManager (ReactApplicationContext reactContext) {
    super(reactContext);
    connectivity = (ConnectivityManager) reactContext.getSystemService(reactContext.CONNECTIVITY_SERVICE);
  }

  @Override
  public String getName() {
    return "ConnectionStatusModule";
  }

  @ReactMethod
  public void checkConnectionStatus(Callback callback) {

    NetworkInfo activeNetwork = connectivity.getActiveNetworkInfo();
    boolean isConnected = activeNetwork != null &&
                          activeNetwork.isConnectedOrConnecting();
    callback.invoke(isConnected);
  }
}
