# Building the Android app

## Prerequisites

- JDK 17, Android SDK, Android NDK (r26+), Gradle (wrapper committed).

## Build

```bash
./gradlew assembleDebug
./gradlew testDebugUnitTest
./gradlew lint
```

## Native (FreeRDP)

FreeRDP plus OpenSSL and OpenH264 are built for `arm64-v8a` and `x86_64` and
packaged into the APK. The JNI bridge exposes `RemoteSessionProvider` to Kotlin.

```mermaid
flowchart LR
  Kotlin --> JNI --> FreeRDP --> X[host]
```

## Quality gates

- `ktlint` + `detekt` + Android Lint
- JUnit + coverage (JaCoCo)
- Instrumented tests where needed

## Notes

- Certificate pinning uses the fingerprint from the control plane.
- Ephemeral credentials are never persisted.
