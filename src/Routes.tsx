import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import SecondPage from "./pages/SecondPage";
import FirstPage from "./pages/FirstPage";
/**
 * @Component
 * @View
 * Check if the page is authenticated to be visited by the user
 */
function PrivateRoute({ children }) {
  const auth = localStorage.getItem("user");
  return auth ? <>{children}</> : <Navigate to="/" />;
}

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FirstPage />}></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <SecondPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
