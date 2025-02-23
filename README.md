# Timer App

## 📌 Setup Instructions

Follow these steps to set up and run the Timer App locally.

### 1️⃣ Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (Recommended: LTS version)
* [React Native CLI](https://reactnative.dev/docs/environment-setup)
* [Android Studio](https://developer.android.com/studio) (for Android emulation)

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/Surajsharma00963/timer-app.git
cd timer-app
```

### 3️⃣ Install Dependencies

```sh
npm install  # or yarn install
```

### 4️⃣ Link Dependencies

Some dependencies require linking:

```sh
npx react-native link
```

### 5️⃣ Run the App

#### For Android:

```sh
npx react-native run-android
```

---

## 🎯 Assumptions Made During Development

### 🔹 General Assumptions:

* The app is designed for Android only.
* Users need to toggle dark mode, manage timers, and view history.
* Data persistence is handled using AsyncStorage.
* Users might want to start, pause, reset, and complete timers in bulk.

### 🔹 Timer Functionality:

* Timers have unique IDs.
* A timer can be in **running, paused, stopped, or completed** states.
* A completed timer moves to the history.

### 🔹 Theme Context:

* Dark mode state is saved using AsyncStorage.
* Colors dynamically update across all screens.

### 🔹 Clearing History:

* Users need a confirmation before deleting history.
* The modal is used instead of an alert for better UX.
* Clearing history only removes completed timers but keeps active ones.

---

## 🚀 Future Improvements

* Add notifications for completed timers.
* Implement cloud sync for history backup.
* Add analytics to track timer usage.

Enjoy using the Timer App! 🎉
