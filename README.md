# المهنكر للمحاسبة

تطبيق محاسبة متقدم مبني باستخدام React Native.

## الميزات

-   إدارة العملاء والموردين
-   إدارة المنتجات والأصناف
-   إنشاء فواتير البيع والشراء
-   تتبع الديون والمستحقات
-   دعم اللغة العربية والإنجليزية
-   دعم الوضع الليلي والنهاري

## متطلبات التشغيل

-   Node.js 18 أو أحدث
-   npm أو yarn
-   بيئة تطوير React Native (JDK, Android SDK)

## التثبيت

1.  **استنساخ المستودع:**
    ```bash
    git clone https://github.com/AHMAD1ll/AlMuhankarAccounting.git
    cd AlMuhankarAccounting
    ```

2.  **تثبيت التبعيات:**
    ```bash
    npm install
    ```

## تشغيل التطبيق (للتطوير)

### على جهاز Android متصل

1.  تأكد من أن جهازك متصل ومفعل به وضع تصحيح USB.
2.  قم بتشغيل الأمر التالي لتثبيت التطبيق على جهازك وبدء خادم التطوير:

    ```bash
    npx react-native run-android
    ```

## البناء للإنتاج (عبر GitHub Actions)

يتم بناء التطبيق وإنشاء النسخ النهائية (APK) تلقائياً عبر GitHub Actions عند رفع التغييرات إلى المستودع. يمكن تنزيل النسخة النهائية من قسم "Artifacts" في صفحة الـ Action المكتملة.

## التقنيات المستخدمة

-   React Native
-   TypeScript
-   React Navigation
-   React Native Paper
-   WatermelonDB (قاعدة بيانات محلية)
-   Zustand (إدارة الحالة)
-   i18next (الترجمة)
