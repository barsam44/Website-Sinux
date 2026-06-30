---
sidebar_position: 2
title: Building
---

# Building

With the [dependencies installed](./dependencies), clone the repository and build.

```bash
git clone https://github.com/SinuxProject/Sinux.git
cd Sinux
```

## Build kernel + userspace

```bash
# Build kernel + userspace
make

# Build bootable ISO and create disk image (first time only)
make iso
```

## Make targets

| Target | Description |
| --- | --- |
| `make` | Build kernel + userspace |
| `make iso` | Build ISO + create `sinux.img` (first time) |
| `make run-bios` | Force BIOS mode |
| `make run-uefi` | Force UEFI mode |
| `make run-serial` | Headless, output to terminal |
| `make run-debug` | Debug mode with QEMU interrupt log |

Once built, head to [Running](./running) to boot Sinux in QEMU.
