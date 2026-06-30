---
sidebar_position: 1
title: نمای کلی
---

# نمای کلی معماری

Sinux به زیرسیستم‌های کاملاً مجزا تقسیم می‌شود. کد وابسته به معماری در `arch/` قرار دارد، در حالی که منطق قابل حمل هسته، مدیران حافظه، درایوها و فضای کاربر جداگانه نگهداری می‌شوند.

## درخت کد منبع

```
sinux/
├── arch/x86_64/        کد وابسته به معماری (GDT، IDT، PIC، PIT، فراخوان سیستمی، بوت)
├── kernel/
│   ├── core/           kernel_main، panic، تجزیه‌کننده‌ی multiboot2
│   ├── proc/           مدیریت فرایند، بارگذار ELF، زمان‌بند، حالت کاربر
│   ├── fs/             VFS، ramfs، ext2، procfs
│   ├── ipc/            pipeها و سیگنال‌ها
│   └── syscall/        جدول ارسال فراخوان سیستمی
├── mm/                 مدیران حافظه‌ی فیزیکی (PMM) و مجازی (VMM)
├── drivers/            VGA، سریال، کیبورد، TTY، ATA
├── lib/                string، printk، io.h
├── userspace/
│   ├── libc/           کتابخانه‌ی C کمینه
│   └── hello/          برنامه‌ی نمونه‌ی فضای کاربر
├── boot/               grub.cfg، linker.ld
└── scripts/            iso.mk، qemu.mk، mkdisk.sh
```

## خلاصه‌ی زیرسیستم‌ها

| زیرسیستم | مسئولیت |
| --- | --- |
| `arch/x86_64` | راه‌اندازی سطح‌پایین CPU: GDT، IDT، PIC، PIT، ورود فراخوان سیستمی، بوت استاب |
| `kernel/core` | نقطه‌ی ورود، مدیریت panic، تجزیه‌ی Multiboot2 |
| `kernel/proc` | فرایندها، زمان‌بند، بارگذار ELF64، انتقال‌های ring-3 |
| `kernel/fs` | انتزاع VFS روی ramfs، ext2 و procfs |
| `kernel/ipc` | pipeها و تحویل سیگنال |
| `kernel/syscall` | جدول ارسال فراخوان سیستمی (ABI لینوکس x86_64) |
| `mm` | مدیریت حافظه‌ی فیزیکی (PMM) و مجازی (VMM) |
| `drivers` | متن VGA، سریال COM1، کیبورد PS/2، TTY، ATA PIO |
| `userspace` | libc کمینه و برنامه‌های نمونه |

برای دیدن نحوه‌ی بالا آمدن هسته به [روند بوت](./boot-flow) مراجعه کنید، یا به
[چیدمان حافظه](./memory-layout) بپرید.
