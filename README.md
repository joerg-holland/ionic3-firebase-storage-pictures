## How to build a Ionic-Firebase-Storage-Pictures app?

This is a Ionic-Firebase-Storage-Pictures template.

## Requirements
1. Node.js (v6.11.2 LTS) [https://nodejs.org/](https://nodejs.org/)
  ```bash
  // Verifying the installation:
  $ node --version
  ```
2. NPM (v5.3.0)
  ```bash
  $ sudo npm install -g npm@5.3.0
  ```
  ```bash
  // Verifying the installation:
  $ npm --version
  ```
3. Apache Cordova (v7.0.1)
  ```bash
  $ sudo npm install -g cordova@7.0.1
  ```
  ```bash
  // Verifying the installation:
  $ cordova --version
  ```
4. Ionic CLI (v3.9.2)
  ```bash
  $ sudo npm install -g ionic@3.9.2
  ```
  ```bash
  // Verifying the installation:
  $ ionic --version
  ```

## Android Requirements
The Android-SDKs can be installed with the Android Studio or manually with the Android SDK-Tools. If an Android-Emulator is used you must install the Android Studio. Gradle must be installed.

a) Android Studio (v2.3.3) [https://developer.android.com/studio/](https://developer.android.com/studio/)

b) Android SDK-Tools (Revision 26.0.2)
  1. Android SDK-Tools [https://developer.android.com/studio/](https://developer.android.com/studio/) (Link available at the end of the site)
  2. Unzip everything and copy the 'tools'-folder to:
   ```bash
   "C:\Android\sdk"
   ```
  3. Set the system variable (as administrator):
  ```bash
  $ sudo setx ANDROID_HOME "C:\Android\sdk" /M
  ```
  4. Add to the path variable:
  ```bash
  $ set PATH=%PATH%;C:\Android\sdk\platforms
  $ set PATH=%PATH%;C:\Android\sdk\tools
  $ set PATH=%PATH%;C:\Android\sdk\tools\bin
  ```
  5. Verifying the installation:
  ```bash
  $ sdkmanager --list
  ```
  6. Add the SDK-Platforms:
  ```bash
  $ sdkmanager "platforms;android-26"
  ```
  7 . Add the SDK-Build-Tools:
  ```bash
  $ sdkmanager "build-tools;26.0.0"
  ```

c) Gradle (v4.1) [https://gradle.org/releases/](https://gradle.org/releases/) (binary-only)
  1. Unzip everything and copy the 'tools'-folder to:
  ```bash
  "C:\Program Files\Gradle"
  ```
  2. Set the system variable (as administrator):
  ```bash
  $ sudo setx GRADLE_HOME "C:\Program Files\Gradle\bin"
  ```
  4. Add to the path variable:
  ```bash
  $ set PATH=%PATH%;C:\Program Files\Gradle\bin
  ```
  5. Verifying the installation:
  ```bash
  $ gradle --version
  ```


## How to configure Google Firebase?

1. Create a new project.

2. After that open the console of the project.

3. Click on the navigation menu on 'Database' and open the tab 'Rules'.

4. Enter the following code and save:
  ```bash
  {
    "rules": {
      ".read": true,
      ".write": true
    }
  }
  ```
5. Click on the navigation menu on 'Storage' and open the tab 'Rules'.

6. Enter the following code and save:
  ```bash
  service firebase.storage {
    match /b<yourStorageBucket>/o {
      match /{allPaths=**} {
        allow read, write;
      }
    }
  }
  ```
7. Click on the navigation menu on 'Authentication' and click on 'Web Setup' (on the Top-Right).
8. Copy your Configuration details to the file '/src/environments/environment.ts'.

## How to use this template?

To use this template, either create a new ionic project using the ionic node.js utility and follow the tutorial below, or copy the files from this repository [Ionic-Firebase-Storage-Pictures](https://github.com/jschax/ionic-firebase-storage-pictures).

Then, to run it, cd into the project `ionic-firebase-storage-pictures` and run:

1. Install the packages:
  ```bash
  $ npm install
  ```
2. Build the project:
  ```bash
  $ npm run build
  ```
3. Build the platform:
  ```bash
  $ cordova platform add android
  ```
4. Build the app:
  ```bash
  $ cordova build android
  ```
5. Deploy the app to device:
  ```bash
  $ cordova run android --device
  ```

Substitute `android` for `ios` if on a Mac.

## How to create this template?
Open the file [TUTORIAL.md](TUTORIAL.md).

## Credits
- [(23.08.2017) Paul Halliday: Ionic 3 - Store Images with Firebase Storage](https://www.youtube.com/watch?v=urFpUVjLw0Y)


## Help
### Ionic:

#### Official documentation
[https://ionicframework.com/docs/](https://ionicframework.com/docs/)

#### Josh Morony
- Website: [https://www.joshmorony.com/](https://www.joshmorony.com/)
- Youtube: [https://www.youtube.com/user/LittlejTFS](https://www.youtube.com/user/LittlejTFS)

#### Simon Reimler
- Youtube: [https://www.youtube.com/user/saimon1924](https://www.youtube.com/user/saimon1924)
- Ionic Academy: [https://ionicacademy.com/](https://ionicacademy.com/)
- devdactic: [https://devdactic.com/](https://devdactic.com/)

#### Paul Halliday
- Blog: [https://blog.paulhalliday.io/](https://blog.paulhalliday.io/?)
- Youtube: [https://www.youtube.com/channel/UCYJ9O6X1oFt7YGXpfRwrcWg](https://www.youtube.com/channel/UCYJ9O6X1oFt7YGXpfRwrcWg)

### Apache Cordova:
#### Official documentation
- [https://cordova.apache.org/docs/en/latest/](https://cordova.apache.org/docs/en/latest/)

#### Plugins supported with Ionic
- [https://ionicframework.com/docs/native/](https://ionicframework.com/docs/native/) 
