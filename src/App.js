import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

import Login from "./components/FormLayout";
import Forms from "./components/Forms";
import Register from "./components/Register";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Forms />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/signup" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </Fragment>
  );
}

export default App;
