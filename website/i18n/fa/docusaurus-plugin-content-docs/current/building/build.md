---
sidebar_position: 2
title: ساخت
---

# ساخت

پس از [نصب وابستگی‌ها](./dependencies)، مخزن را کلون کنید و بسازید.

```bash
git clone https://github.com/SinuxProject/Sinux.git
cd Sinux
```

## ساخت هسته + فضای کاربر

```bash
# ساخت هسته + فضای کاربر
make

# ساخت ISO بوت‌پذیر و ایجاد image دیسک (فقط دفعه اول)
make iso
```

## اهداف make

| هدف | توضیح |
| --- | --- |
| `make` | ساخت هسته + فضای کاربر |
| `make iso` | ساخت ISO + ایجاد `sinux.img` (دفعه اول) |
| `make run-bios` | اجبار به حالت BIOS |
| `make run-uefi` | اجبار به حالت UEFI |
| `make run-serial` | بدون голов، خروجی به ترمینال |
| `make run-debug` | حالت دیباگ با لاگ割込 QEMU |

پس از ساخت، به [اجرای](./running) بروید تا Sinux را در QEMU بوت کنید.
