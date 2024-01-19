import { Button } from "./components/ui/button";
import Form from "./components/Form";
import Password from "./components/Password";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState, usecontext } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [userData, setUserData] = useState({
    username: null,
    nickname: null,
    mother: null,
    father: null
  })
  return (
    <UserContext.Provider value={userData}>
      <BrowserRouter>
        <>
          <Routes>
            <Route
              path="/"
              element={
                <div className="min-h-screen w-full flex justify-center items-center">
                  <Form changeData={setUserData} />
                </div>
              }
            />
            <Route
              path="/password"
              element={
                <div className=" h-screen justify-center w-full flex flex-col items-center">
                  <Password />
                </div>
              }
            />
          </Routes>
        </>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
