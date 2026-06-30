---
sidebar_position: 1
title: نصب وابستگی‌ها
---

# نصب وابستگی‌ها

برای ساخت و اجرای Sinux به چند بسته‌ی زنجیره‌ابزار نیاز دارید.

## الزامات سیستم

### میزبان (ماشین ساخت)

| جزء | حداقل |
| --- | --- |
| سیستم‌عامل | هر توزیع لینوکس (Arch، Ubuntu، Fedora…) |
| معماری | x86_64 |
| RAM | ۵۱۲ مگابایت آزاد |
| دیسک | ۱ گیگابایت آزاد |

### هدف (QEMU یا سخت‌افزار واقعی)

| جزء | الزام |
| --- | --- |
| CPU | x86_64 با پشتیبانی Long Mode (بعد از ~۲۰۰۳) |
| RAM | حداقل ۶۴ مگابایت، توصیه‌شده ۲۵۶ مگابایت |
| فیروزار | BIOS یا UEFI (Secure Boot باید خاموش باشد) |
| دیسک | اختیاری ATA/IDE برای ذخیره‌سازی پایدار |

## نصب بسته‌ها

### آرچ لینوکس

```bash
sudo pacman -S --needed \
    nasm grub xorriso mtools \
    qemu-system-x86 edk2-ovmf \
    gcc binutils make
```

### اوبونتو / دبیان

```bash
sudo apt install \
    nasm grub-pc-bin grub-efi-amd64-bin \
    xorriso mtools \
    qemu-system-x86 ovmf \
    gcc binutils make
```

### فدورا / RHEL

```bash
sudo dnf install \
    nasm grub2-tools xorriso mtools \
    qemu-system-x86 edk2-ovmf \
    gcc binutils make
```

پس از نصب وابستگی‌ها، به [ساخت](./build) بروید.
