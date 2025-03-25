

To build for android, before running `npx expo run:android`, run:

```bash
mkdir -p android && echo "sdk.dir=$ANDROID_SDK_ROOT" > android/local.properties
```

or set the `ANDROID_SDK_ROOT` environment variable.

```bash
export ANDROID_SDK_ROOT=/path/to/android/sdk
```

This is required because the Android SDK is not installed in the default location on the build server.
The `path/to/android/sdk` usually locates in:

- Windows: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
- macOS: `/Users/YOUR_USERNAME/Library/Android/sdk`