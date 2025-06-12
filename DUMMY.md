# Spare Parts Inventory Management System

A web-based inventory management system built using the **MERN Stack** during a 1-month internship at **SCADA Bhawan, SBPDCL**.  
This application simplifies tracking and managing spare parts in industrial environments, offering real-time updates and low stock alerts.

A comprehensive web application designed to help businesses, workshops, and manufacturing units efficiently track, manage, and organize their spare parts inventory. This system provides real-time stock tracking, supplier management, and low-stock alerts to minimize downtime and enhance operational efficiency.

---

## 📅 Internship Duration

**1 Month**

---

## 👥 Team Members

| Name                | Roll Number    | Responsibility                  |
|---------------------|----------------|----------------------------------|
| Rahul Raj           | 22155135024     | Frontend + Backend Development   |
| Pallavi Rani        | 22155135028     | Styling, Testing                 |
| Prince Kumar Sharma | 22155135060     | Logic Development                |
| Anupriya Rani       | 23155135905     | Documentation                    |

---

## 📍 Internship Location

**SCADA Bhawan, SBPDCL**

---

## 1. Introduction

In SCADA-based and industrial setups, timely availability of spare parts is critical for continuous operation. Traditionally, spare part inventories were managed manually, leading to inefficiencies like delays, stockouts, and overstocking.

This project offers a **digital inventory solution** using the **MERN Stack** that streamlines the process by enabling real-time tracking, alerts for low stock, and an intuitive web interface.

---

## 2. Objective

- Build a user-friendly interface to manage spare part inventory  
- Allow adding new parts with relevant details  
- Enable quantity adjustments with proper validation  
- Display alerts when stock falls below a defined threshold  
- Maintain a real-time synchronized view across all users

---

## 3. Technology Stack

| Component | Technology            |
|----------|------------------------|
| Frontend | React.js + Tailwind CSS|
| Backend  | Node.js + Express.js   |
| Database | MongoDB                |
| Version Control | Git & GitHub     |

---

## 4. Features

### ➤ Add New Part  
A form to input part details:
- Part Name  
- Quantity  
- Machine  
- Location  

Data is added to the database and reflected immediately in the inventory list.

### ➤ View Inventory  
All parts are listed in a structured, scrollable table. Each entry shows:
- Part Name  
- Quantity  
- Associated Machine  
- Storage Location  

### ➤ Quantity Adjustment  
- `+` and `−` buttons to increase or decrease the quantity  
- Real-time sync with both frontend and MongoDB  

### ➤ Low Stock Alert  
- If a part's quantity is **≤ 5**, a low stock warning appears at the top  
- A red badge is shown next to that part in the list

---

## 5. MongoDB Schema

```json
{
  "partName": "Motor Bearing",
  "quantity": 3,
  "machine": "Boiler Unit #1",
  "location": "Store Room A",
  "addedOn": "2025-06-03T12:00:00Z"
}
```

## 6. Real-World Applications
This system is suitable for:

1. College laboratories managing tools and devices
2. Industrial warehouses maintaining critical components
3. Power stations tracking spare parts for maintenance
4. SCADA systems needing digital asset tracking

## 7. Future Scope
1. Implement authentication with Admin and Worker roles
2. Email notifications for critical stock levels
3. Export inventory data to PDF or Excel
4. QR code scanning to fetch part data
5. Dashboard with analytics on part usage and trends

## 8. Conclusion
This project demonstrates how a simple, scalable web application can optimize inventory operations in real-world environments. By leveraging the MERN stack, we created a responsive system that automates manual processes, reduces errors, and ensures efficient spare parts management.

---







## 📸 Screenshots / Live Demo

<!-- Add some high-quality screenshots of your project here! -->
**Website Pages**
![Login Page Screenshot]([link-to-your-login-screenshot.png])

**Dashboard**
![Dashboard Screenshot]([link-to-your-dashboard-screenshot.png])

**Parts List**
![Parts List Screenshot]([link-to-your-parts-list-screenshot.png])

**Live Demo:** [Link to your live demo]

---

## ✨ Features

-   **Interactive Dashboard:** Get a quick overview of total parts, low-stock items, recent activity, and key metrics.
-   **Part Management:** Seamlessly add, edit, and delete spare parts with detailed information like Part Number, Name, Description, and Location.
-   **Inventory Control:** Easily update stock levels (stock in/out) and track a complete history of every transaction.
-   **Supplier Management:** Add, view, and manage information for all your parts suppliers in one place.
-   **Categories & Locations:** Organize parts by custom categories (e.g., Engine, Electronics) and physical storage locations (e.g., Rack A-1) for easy retrieval.
-   **Advanced Search & Filtering:** Instantly find any part using a powerful search function that filters by name, part number, category, or location.
-   **Low Stock Alerts:** Receive automatic email or in-app notifications when a part's quantity falls below a predefined minimum level.
-   **User Roles & Permissions:** Secure your application with different user roles (e.g., Admin, Manager, Staff) with specific access permissions.
-   **Reporting & Analytics:** Generate detailed reports on stock levels, inventory usage, and transaction history. Export reports to PDF or CSV formats.
-   **Responsive Design:** Fully functional and visually appealing on all devices, including desktops, tablets, and mobile phones.

---



## 🚀 Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

Make sure you have the following software installed on your system:
-   [Node.js (v16 or higher)](https://nodejs.org/)
-   [MongoDB (if applicable)](https://www.mongodb.com/try/download/community)
-   `git`

### Installation

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/[your-github-username]/[your-repo-name].git
    cd [your-repo-name]
    ```

2.  **Backend Setup**
    Navigate to the backend directory and install dependencies.
    ```sh
    cd backend
    npm install
    ```
    -   Create a `.env` file by copying the example file.
        ```sh
        cp .env.example .env
        ```
    -   Update the `.env` file with your environment variables (database connection string, JWT secret, etc.).
        ```env
        PORT=8000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_key
        ```

3.  **Frontend Setup**
    Navigate to the frontend directory and install dependencies.
    ```sh
    cd ../frontend
    npm install
    ```
    -   If your frontend requires environment variables (like the API base URL), create a `.env.local` file.
        ```env
        VITE_API_BASE_URL=http://localhost:5001/api
        ```

4.  **Run the Application**
    -   **Start the Backend Server:** (from the `backend` directory)
        ```sh
        npm run dev
        ```
    -   **Start the Frontend Development Server:** (from the `frontend` directory)
        ```sh
        npm run dev # or npm start
        ```

    Open your browser and navigate to `http://localhost:3000` (or your configured frontend port) to see the application in action!

---

## 📋 API Endpoints

This project exposes a REST API. Here are some of the main endpoints:

| Method | Endpoint              | Description                      | Access    |
| :----- | :-------------------- | :------------------------------- | :-------- |
| `GET`  | `/api/parts`          | Get a list of all spare parts    | Private   |
| `POST` | `/api/parts`          | Add a new spare part             | Private   |
| `GET`  | `/api/parts/:id`      | Get details of a specific part   | Private   |
| `PUT`  | `/api/parts/:id`      | Update a specific part           | Private   |
| `DELETE`| `/api/parts/:id`      | Delete a specific part           | Admin     |
| `POST` | `/api/users/login`    | Log in a user and get a token    | Public    |
| `POST` | `/api/users/register` | Register a new user              | Public    |

*For complete API documentation, you can link to a [Postman Collection] or Swagger documentation here.*

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute, please follow these steps:
1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

---

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

---

## 📧 Contact

[Rahul Raj] - [@rahulophile] - [rahultime2018@gmail.com]

Project Link: [https://github.com/[your-github-username]/[your-repo-name]](https://github.com/[your-github-username]/[your-repo-name])