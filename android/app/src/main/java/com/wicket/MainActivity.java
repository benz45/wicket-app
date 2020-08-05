package com.wicket;

// Splash screen
import android.os.Bundle;

// React native picker
// import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
// import com.facebook.react.modules.core.PermissionListener; 

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
  // private PermissionListener listener; // React native picker

  // React native picker
  // @Override
  // public void setPermissionListener(PermissionListener listener)
  // {
  //   this.listener = listener;
  // }
  // // React native picker
  // @Override
  // public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
  // {
  //   if (listener != null)
  //   {
  //     listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
  //   }
  //   super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  // }

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Wicket";
  }
}
