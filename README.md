# 💸 WealthFlow

> **A Modern Personal Finance Dashboard**  
> Track your expenses, manage investments, and take control of your financial goals — all in one place.

![WealthFlow Banner](https://user-images.githubusercontent.com/placeholder/banner.png)

---

## 🚀 Overview

**WealthFlow** is a full-stack financial management platform built to help users monitor their income, expenses, budgets, and investments with clarity.  
It brings everything related to personal finance into a single dashboard — clean, secure, and insightful.

This project includes:
- 🖥️ **Frontend (Client App):** [WealthFlow](https://github.com/samarthdadhaniya/wealthflow)  
  Built using **React, TypeScript, TailwindCSS, and Vite**
- ⚙️ **Backend (API Server):** [WealthFlow API](https://github.com/samarthdadhaniya/wealthflow-api)  
  Built using **Java Spring Boot and REST APIs**

---

## ✨ Features

- 🔐 **User Authentication** – Secure login & registration system  
- 💰 **Expense Tracker** – Track and categorize your daily expenses  
- 📈 **Income Overview** – Visualize your income flow over time  
- 📊 **Budget Management** – Set monthly spending limits  
- 💹 **Investment Suggestions** – Get portfolio and mutual fund insights  
- 🧠 **AI-based Recommendations** *(coming soon)*  
- 📱 **Responsive UI** – Optimized for mobile and desktop  
- ☁️ **REST API Integration** – Robust and secure backend APIs  

---

## 🧱 Tech Stack

### **Frontend**
- ⚡ [Vite](https://vitejs.dev/)
- ⚛️ [React](https://react.dev/)
- 🔷 [TypeScript](https://www.typescriptlang.org/)
- 🎨 [TailwindCSS](https://tailwindcss.com/)
- 🧩 [shadcn/ui](https://ui.shadcn.com/)
- 🌐 [Axios](https://axios-http.com/)

### **Backend**
- ☕ [Java 17+](https://openjdk.org/)
- 🧱 [Spring Boot](https://spring.io/projects/spring-boot)
- 🔒 [Spring Security](https://spring.io/projects/spring-security)
- 🐘 [PostgreSQL](https://www.postgresql.org/) or [MySQL](https://www.mysql.com/)
- 🧰 [Maven](https://maven.apache.org/)

---

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
