import { Button } from "semantic-ui-react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";

const App = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} element={route.element} exact />
        );
      })}
    </Routes>
  );
};

export default App;
