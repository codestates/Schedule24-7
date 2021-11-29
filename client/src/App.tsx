import { FC } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroupRoutes from "./routes/GroupRoute";

const App: FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/group" element={<GroupRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

