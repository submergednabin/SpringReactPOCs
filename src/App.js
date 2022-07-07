import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Account } from "./components/Account";
import Dashboard from "./components/Dashboard";

import Login from "./components/FormLayout";
import Forms from "./components/Forms";
import Register from "./components/Register";
import { Transaction } from "./components/Transaction";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Forms />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/signup" element={<Register />} />
        <Route path="create-account" element={<Account />} />
        <Route path="user">
          <Route path=":userId/dashboard" element={<Dashboard />} />
          <Route path=":userId/transaction" element={<Transaction />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
