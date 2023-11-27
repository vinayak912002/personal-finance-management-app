import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Category from './Category';
import Home from './Home';
import Expenses from './Expenses';

// Home component for the "/" route
const HomeRoute = () => {
  return <Home />;
};

// Category component for the "/categories" route
const CategoryRoute = () => {
  return <Category />;
};

// Expenses component for the "/expenses" route
const ExpensesRoute = () => {
  return <Expenses />;
};

// App component to route the application
const App = () => {
  // In a functional component, there's no need for state

  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<HomeRoute />} />

        {/* Route for the categories page */}
        <Route path="/categories" element={<CategoryRoute />} />

        {/* Route for the expenses page */}
        <Route path="/expenses" element={<ExpensesRoute />} />
      </Routes>
    </Router>
  );
};

export default App;