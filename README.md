# React Native DevOps Task Manager

A small Android/iOS sample app intended for learning mobile CI/CD. It includes a task dashboard, task creation, and status cycling.

## Important: create the native project first

This starter contains the application source and CI workflow examples. Generate the native React Native project using the current Community CLI, then copy these files into it.

```powershell
npx @react-native-community/cli@latest init DevOpsTaskManager
cd DevOpsTaskManager
```

Copy `App.tsx`, `.github/`, and this README into the generated project, replacing files when prompted. Keep the generated `android/`, `ios/`, `package.json`, Gradle wrapper, and native configuration.

Install dependencies and run Android:

```powershell
npm install
# Start an Android emulator or connect an Android phone with USB debugging enabled
npm start
# In a second terminal:
npm run android
```

## iOS build

A native React Native iOS build requires macOS and Xcode. Windows can develop and build Android, but cannot run Xcode or produce a native iOS IPA locally. The included GitHub Actions example runs on a macOS runner.

## CI workflow

The sample workflow runs Android debug build on Ubuntu and iOS simulator build on macOS. Before using it, confirm that the generated project's Gradle and Xcode configuration are compatible with the runner image and installed toolchain. Add signing credentials only when moving to device distribution/TestFlight.

## DevOps extension plan

1. GitHub push / pull-request trigger.
2. Install dependencies and run tests/lint.
3. Build Android APK/AAB.
4. Build iOS simulator app / signed IPA on macOS.
5. Store artifacts in GitHub Actions artifacts or AWS S3.
6. Use Jenkins as an orchestrator if required by the project.
7. Add Docker for compatible CI helper services; do not try to run Xcode in a Linux container.
8. Optionally deploy a separate backend API to AWS/Kubernetes. Kubernetes is not needed to deliver the mobile binaries.

This is a demo app. It does not include real authentication, a backend, or production data storage.
