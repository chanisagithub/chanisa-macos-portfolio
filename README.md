#  macOS Portfolio

A fully interactive, web-based portfolio designed to look and feel like Apple's macOS. This project, built with **React** and **Vite**, provides a unique and engaging way to explore my projects, skills, and contact information through a familiar desktop interface.

**Live Demo:** [**https://chanisagithub.github.io/chanisa-macos-portfolio/**](https://chanisagithub.github.io/chanisa-macos-portfolio/)

![image](https://github.com/user-attachments/assets/b3438f42-7a8e-4a64-96c4-b6c86e000940)


## ✨ Features

* **Interactive Desktop Environment:** A familiar macOS-style interface where users can open, close, minimize, and drag application windows.
* **Draggable Windows:** All application windows can be moved around the desktop.
* **Dynamic Dock & Menu Bar:** A functional top menu bar with dropdowns and a bottom dock that shows open applications.
* **Persistent State:** Window positions and open applications are saved to `localStorage`, so the layout persists between visits.
* **Responsive Design:** While optimized for desktop, the interface is usable on various screen sizes.
* **Real-time Clock:** The menu bar displays the current time, updating every second.

## 🖥️ Applications

The portfolio includes several "applications" that users can interact with:

* **📁 Project Explorer:** Browse through a list of my featured projects.
* **📄 Resume Viewer:** View and download my professional resume.
* **💬 Contact Form:** A fully functional form to send me a message directly (powered by EmailJS).
* **💻 Terminal:** A fun, simulated terminal application.
* **🗑️ Recycle Bin:** A familiar place for closed items.

## 🛠️ Tech Stack

This project was built using a modern front-end stack:

* **Framework:** [React](https://reactjs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/chanisagithub/chanisa-macos-portfolio.git](https://github.com/chanisagithub/chanisa-macos-portfolio.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd chanisa-macos-portfolio
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## ⚙️ Configuration

To enable the contact form for your own use, you need to set up a free account with [EmailJS](https://www.emailjs.com/) and update the credentials in `src/apps/ContactForm.jsx`:

```javascript
// src/apps/ContactForm.jsx

const handleSubmit = (e) => {
  e.preventDefault();

  // --- Replace with your actual EmailJS IDs ---
  const serviceID = 'YOUR_SERVICE_ID';
  const templateID = 'YOUR_TEMPLATE_ID';
  const publicKey = 'YOUR_PUBLIC_KEY';
  // -------------------------------------------
  
  // ... rest of the function
};