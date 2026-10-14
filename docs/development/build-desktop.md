# Building the desktop client

Target: Windows-first, built **off Craft**.

## Dependencies

- MSVC (`cl`), CMake 3.21+, Ninja.
- Qt 6 (Core, Gui, Widgets minimal, Network, Quick + QuickControls2 + Qt Quick
  Compiler, DBus, Svg).
- KDE Frameworks 6 - **minimal set only**: `KConfig`, `KCoreAddons`,
  `KDBusAddons`, `KCrash`, `KI18n`, `KSyntaxHighlighting` (if needed).
  Everything else is removed on Windows (see
  [desktop architecture](../architecture/desktop.md)).

> Building Qt6 + KF6 on Windows without Craft is the R-1 risk. This document is
> completed with the proven recipe once the M1 spike concludes; the recipe and
> any dead ends are recorded here so they are not repeated.

## Configure & build

```powershell
cmake -S . -B build -G Ninja `
  -DCMAKE_BUILD_TYPE=RelWithDebInfo `
  -DCMAKE_PREFIX_PATH="$env:QT_ROOT;$env:KF6_ROOT" `
  -DBUILD_TESTING=ON
cmake --build build
ctest --test-dir build --output-on-failure
```

## Quality gates

- `clang-format --dry-run --Werror`
- `clang-tidy` + `cppcheck`
- warnings-as-errors; ASan/UBSan on a CI debug job.

## Packaging

MSIX/installer with code signing; the installer directory is added to Windows
Defender exclusions per the startup-performance plan.
