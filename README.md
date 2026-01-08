# 🚀 Task Intelligence — Professional Desktop Task Manager

**Task Intelligence** is a sophisticated desktop application designed for modern workflow management. Built with a "Data-First" philosophy, this project leverages the power of **Electron**, **Vue 3**, and **SQLite** to deliver a high-performance solution with professional-grade architecture.

---

## ✨ Key Features

- **🎨 Glassmorphism UI** — Stunning translucent Dark Mode with modern design aesthetics
- **🏢 Professional Architecture** — DTOs, Entities, and Service Layer
- **⚡ High Performance** — Lightning-fast local SQLite3 database without external dependencies
- **🔒 Secure Communication** — Electron Context Isolation and Preload scripts for secure Frontend-Backend bridge
- **🎬 Smooth Animations** — Vue 3 TransitionGroup with fluid visual feedback

---

## 🛠 Technology Stack

- **Frontend:** [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool:** [Vite](https://vitejs.dev/) (Ultra-fast HMR)
- **Backend:** [Electron](https://www.electronjs.org/) (Desktop Environment)
- **Database:** [SQLite3](https://sqlite.org/) (Local Storage)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Type Safety)

---

## 📁 Project Structure

```
task-intelligence/
├── src/
│   ├── main/
│   │   ├── database/          # DB connection & table schema
│   │   ├── entity/            # Database models
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── services/          # Business logic layer
│   │   ├── preload.ts         # Secure "Bridge"
│   │   └── main.ts            # Application bootstrapper
│   ├── renderer/              # Vue 3 application (Frontend)
│   └── vite.config.ts         # Vite configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ix1osbek/Pro-Task-Manager.git
cd pro-task-manager
```

### 2️⃣ Install Dependencies

```bash
# Install all dependencies
npm install

# Install frontend dependencies
cd src/renderer && npm install && cd ../..
```

### 3️⃣ Run the Application

#### Single Terminal (Recommended):
```bash
npm run dev
```

#### Dual-Terminal Method:

**Terminal 1 — Frontend:**
```bash
npm run frontend
```

**Terminal 2 — Backend:**
```bash
npm run backend
```

---

## 💻 System Compatibility

Task Intelligence runs seamlessly across all major platforms:

- 🪟 **Windows** (10, 11 and newer)
- 🍎 **macOS** (Intel and Apple Silicon)
- 🐧 **Linux** (Ubuntu, Debian, Fedora, etc.)

---

## 🏗️ Production Build — Creating Distributable

### Build for Windows (.exe):
```bash
npm run build:win
```
*Output: `.exe` file in `dist/` folder*

### Build for macOS (.dmg):
```bash
npm run build:mac
```

### Build for Linux (.deb):
```bash
npm run build:linux
```

Share the generated installers with friends—they can install it like any regular application!

---

## 🔧 Development Tips

### Enable Hot Reload
```bash
npm run dev
```
Both frontend and backend changes reload automatically.

### Run Database Migrations
```bash
npm run migrate
```

### Type Checking
```bash
npm run type-check
```

---

## 📚 Architecture Guide

### Service Layer
All business logic resides in `src/main/services/`. Services communicate with the Frontend using DTOs.

### DTO Pattern
Use Data Transfer Objects for secure and type-safe communication between Frontend and Backend.

### Entity Layer
Each database table is represented by an `Entity` class in the Entity Layer.

---

## 🐛 Troubleshooting

**Issue:** Dependencies won't install
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Frontend port is already in use
```bash
npm run dev -- --port 5174
```

**Issue:** Database errors
Delete and reinitialize the SQLite database:
```bash
rm data/tasks.db
npm run dev
```

---

## 👨‍💻 About the Author

**Developer:** [Ixlosbek Erkinov]

**GitHub:** [@ix1osbek](https://github.com/ix1osbek)

**Focus:** Node.js developer


## 🤝 Contributing

Before contributing:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ Support

If you find this project helpful, please give it a **Star**! 🌟

---

**Next Step:** Create a production build and distribute your application as `.exe`, `.deb`, or `.dmg` files!