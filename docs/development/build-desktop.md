# Building the desktop client (Windows)

Target: Windows x64, MSVC (msvc2022 ABI), Qt 6, KDE Frameworks 6.

## 1. Craft (one-time, elevated)

Craft is KDE's meta build system and package manager.

Prerequisites: Developer Mode enabled, Git, Python >= 3.9, Visual Studio 2022
with the "Desktop development with C++" workload.
Note: the Craft bootstrap does not support VS2026 yet; VS2022 is required.

```powershell
iwr https://raw.githubusercontent.com/KDE/craft/master/setup/install_craft.ps1 -OutFile $env:TEMP\install_craft.ps1
# run elevated; creates C:\CraftRoot
& $env:TEMP\install_craft.ps1 -use-defaults -root C:\CraftRoot
```

## 2. Install dependencies (prebuilt msvc2022 cache)

```powershell
. C:\CraftRoot\craft\craftenv.ps1
craft --install-deps kde/applications/kdeconnect-kde
```

## 3. Configure and build the fork

```powershell
. C:\CraftRoot\craft\craftenv.ps1
cmake -S . -B build -G Ninja -DCMAKE_PREFIX_PATH=C:\CraftRoot -DCMAKE_BUILD_TYPE=RelWithDebInfo
cmake --build build
```

Binaries land in `build/bin` (`kdeconnectd.exe`, `kdeconnect-app.exe`,
`kdeconnect-indicator.exe`, `kdeconnect-cli.exe`, plus test executables).

## 4. Run

Source craftenv first so the Qt/KF runtime DLLs are on PATH:

```powershell
. C:\CraftRoot\craft\craftenv.ps1
.\build\bin\kdeconnect-app.exe
```

## Notes

- If `git`/MinGW are on PATH they conflict with Craft; exclude them (or pin
  `[Environment] PATH` in `C:\CraftRoot\etc\CraftSettings.ini`).
- The upstream source is the `craft-blueprints-kde` repository; the
  `kdeconnect-kde` blueprint provides all dependencies.

## Tests

```powershell
ctest --test-dir build
```
