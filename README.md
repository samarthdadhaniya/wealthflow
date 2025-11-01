# 💸 WealthFlow

> **A Modern Personal Finance Dashboard**  
> Track your expenses, manage investments, and take control of your financial goals — all in one place.


## 🚀 Overview

**WealthFlow** is a modern full-stack financial management platform designed to simplify how you handle your money.  
From tracking your daily expenses to planning long-term investments, WealthFlow offers a seamless experience to help you stay financially organized and make smarter decisions.

Built with a **scalable architecture** and a **clean, intuitive interface**, the platform allows users to manage income, expenses, budgets, and investments — all in one secure and responsive dashboard.  
Its goal is to provide clarity, insights, and automation to your personal finance journey through interactive analytics and smart recommendations.

Whether you’re a student managing monthly budgets, a professional tracking investments, or someone looking to improve savings habits — **WealthFlow** gives you the tools and insights you need to stay in control of your finances.  




## ✨ Features

- 🔐 **User Authentication** – Secure login & registration system  
- 💰 **Expense Tracker** – Track and categorize your daily expenses  
- 📈 **Income Overview** – Visualize your income flow over time  
- 📊 **Budget Management** – Set monthly spending limits  
- 💹 **Investment Suggestions** – Get portfolio and mutual fund insights  
- 🧠 **AI-based Recommendations** *(coming soon)*  
- 📱 **Responsive UI** – Optimized for mobile and desktop  
- ☁️ **REST API Integration** – Robust and secure backend APIs  


## 🧱 Tech Stack

### **Frontend**

<p align="left">
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" /></a>
  <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=react&logoColor=white" alt="shadcn/ui" /></a>
  <a href="https://axios-http.com/"><img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" /></a>
</p>

---

### **Backend**

<p align="left">
  <a href="https://openjdk.org/"><img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" /></a>
  <a href="https://spring.io/projects/spring-boot"><img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" /></a>
  <a href="https://spring.io/projects/spring-security"><img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" /></a>
  <a href="https://maven.apache.org/"><img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven" /></a>
</p>


## ⚙️ Installation Guide

### 🖥️ Frontend Setup

```bash
# Clone the frontend repository
git clone https://github.com/samarthdadhaniya/wealthflow.git
cd wealthflow

# Install dependencies
npm install

# Create an environment file
cp .env.example .env

# Example:
# VITE_API_BASE_URL=http://localhost:8080/api

# Start development server
npm run dev

App runs at http://localhost:5173￼
```

## ⚙️ Backend Setup
```
# Clone the backend repository
git clone https://github.com/samarthdadhaniya/wealthflow-api.git
cd wealthflow-api

# Configure Database Connection
# Edit src/main/resources/application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/wealthflow
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

# Run the backend server
./mvnw spring-boot:run

API runs at http://localhost:8080￼
```

## 🧪 Example API Endpoints

```
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate and receive JWT
GET	/api/users/me	Fetch logged-in user profile
GET	/api/transactions	Get all user transactions
POST	/api/transactions	Add a new transaction
PUT	/api/transactions/{id}	Update a transaction
DELETE	/api/transactions/{id}	Delete a transaction
GET	/api/budgets	Get user budgets
POST	/api/suggestions	Get investment suggestions
```


🧭 Project Structure
```
WealthFlow/
│
├── frontend/ (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
└── backend/ (Spring Boot API)
    ├── src/main/java/com/wealthflow/
    ├── src/main/resources/
    ├── pom.xml
    └── application.properties
```



## 🛣️ Roadmap
	•	Financial goal tracking
	•	Advanced analytics & visual reports
	•	AI-based financial advisor
	•	Multi-currency support
	•	PDF/Excel export
	•	Notifications & reminders
	•	Mobile version (React Native/Flutter)
	•	Unit & integration testing


## 🤝 Contribution Guide
```
Contributions are welcome!
	1.	Fork this repository
	2.	Create a new branch:

git checkout -b feature/your-feature-name


	3.	Commit your changes:

git commit -m "feat: add new feature"


	4.	Push to your branch:

git push origin feature/your-feature-name


	5.	Open a Pull Request 🚀
```

## 👨‍💻 Author

Samarth Dadhaniya
Java Full Stack Developer | Java + SpringBoot
