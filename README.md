# Personal Expense Tracker - Frontend

This is the **frontend** of the Personal Expense Tracker web application built with **Next.js** **React.js** and **Tailwind CSS**. Users can register, login, add/edit/delete expenses, categorize them, and view spending analytics.

The frontend is deployed on **Vercel**: https://expense-tracker-frontend-liard.vercel.app

---

## Features

- **Authentication**
  - User registration and login
  - Protected routes
  - Logout functionality

- **Expense Management**
  - Add, edit, delete expenses
  - Categorize expenses (Food, Transport, Entertainment, etc.)
  - Filter expenses by category or date range

- **Dashboard & Analytics**
  - Total spending summary
  - Spending by category (charts)
  - Recent transactions
  - Monthly spending trends

- **UI/UX**
  - Fully responsive design with Tailwind CSS
  - Clean, modern interface
  - Loading states and error handling
  - Form validation feedback

---

## Tech Stack

- **Frontend:** Next.js,React.js, Redux Toolkit, Tailwind CSS, Axios  
- **Charts:** Chart.js  
- **Authentication:** Cookie-based sessions  
- **API Requests:** Axios to backend REST API  

---

## Folder Structure

```

frontend/
│
├─ public/
│
├─ src/
│  ├─ components/        # Reusable UI components
│  ├─ app/             # Application pages (Dashboard, Login, Register)
│  ├─ redux/             # Redux slices and store setup
│
├─ package.json
└─ tailwind.config.js

````

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/frontend.git
cd frontend
````

2. **Install dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env.local` file in the root and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

> Replace with your backend URL if deployed.

4. **Run Locally**

```bash
npm run dev
```

The app should now be running at [http://localhost:3000](http://localhost:3000).

5. **Build for Production**

```bash
npm run build
npm run start
```

---

## Usage

* Register a new account or login with existing credentials.
* Add new expenses with details like amount, category, and description.
* View dashboard analytics including total spending, recent transactions, and charts.
* Edit or delete existing expenses.
* Filter expenses by category or date range.

## License

This project is for educational purposes and personal portfolio use.

```


