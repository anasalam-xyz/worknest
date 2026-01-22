# WorkNest

WorkNest is a task & project management web app designed to help individuals and small teams **organize work, track progress, and stay focused** — all in one clean dashboard.

Built with a developer-first mindset, WorkNest balances **simplicity, performance, and scalability**, making it suitable both as a real-world product and a personal/team project.

---

## Features

* **Authentication & Authorization**
  Secure user signup/login with protected routes.

* **Project Management**
  Create, update, and manage multiple projects from a single dashboard.

* **Task Tracking**
  Add tasks to projects, track completion status, and monitor overall progress.

* **Dynamic Progress Bars**
  Visual progress indicators that adapt based on task completion levels.

* **Clean & Responsive UI**
  Minimal, distraction-free interface built for productivity.

* **Deployed & Production-Ready**
  Frontend and backend deployed separately with proper environment handling.

---

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or Atlas)
* Git

---

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/anasalam-xyz/worknest.git
   cd worknest
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_secret_key>
   ```

   Start the backend:

   ```bash
   npm run dev
   ```

3. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   npm run dev
   ```

---

## Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| MONGO_URI  | MongoDB connection string |
| JWT_SECRET | Secret key for JWT        |
| PORT       | Backend server port       |

---

## Future Improvements

* Dark mode
* AI to prioritize tasks
* Notifications & reminders
* Task deadlines
* Optimizations

---

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

Built as a real-world project to practice full-stack development, system design, and clean UI patterns.
If you find this project useful or inspiring, feel free to ⭐ the repo! and reach out.
