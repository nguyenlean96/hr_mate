import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo//config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  "scheme": process.env.APP_SCHEME,
  "name": "hr_mate",
  "slug": "hr_mate",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/images/icon.png",
  "platforms": [
    "ios",
    "android",
    "web"
  ],
  "userInterfaceStyle": "automatic",
  "newArchEnabled": true,
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.annl96.hr-mate"
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/images/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    },
    "package": "com.annl96.hrmate"
  },
  "web": {
    "bundler": "metro",
    "output": "static",
    "favicon": "./assets/images/favicon.png"
  },
  "plugins": [
    "expo-router",
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/splash-icon.png",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      }
    ],
    "expo-secure-store"
  ],
  "experiments": {
    "typedRoutes": true
  }
})