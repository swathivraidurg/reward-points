import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./components/Transactions/Transactions";
import CustomersList from "./components/Customers/CustomersList";
import Navbar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Transactions />}></Route>
          <Route path="/customerbyMonth" element={<CustomersList />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
