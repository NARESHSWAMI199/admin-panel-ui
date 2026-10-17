importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDus6j9avh8dbIHgGxzdZGbGwud5UbGDy4",
  authDomain: "push-notifications-fd978.firebaseapp.com",
  projectId: "push-notifications-fd978",
  storageBucket: "push-notifications-fd978.firebasestorage.app",
  messagingSenderId: "895756161037",
  appId: "1:895756161037:web:82cccfdb045c0ac7ae4544",
  measurementId: "G-SBLDLG9L7D"
};

firebase.initializeApp(firebaseConfig);

// 4. मेसेजिंग को सर्विस वर्कर स्कोप में एक्टिव करें
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background Message received:', payload);
  console.log(JSON.stringify(payload.notification || payload.data || payload));

  const notificationTitle =
    payload.notification?.title ||
    payload.data?.title ||
    "File export is completed.";

  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || "File is ready to download.",
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: payload.data || {},
  };

  console.log('[firebase-messaging-sw.js] Calling showNotification...');

  return self.registration.showNotification(notificationTitle, notificationOptions)
    .then(() => {
      console.log('[firebase-messaging-sw.js] ✅ showNotification SUCCESS');
    })
    .catch((err) => {
      console.error('[firebase-messaging-sw.js] ❌ showNotification FAILED:', err);
    });
});
});


