import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../scenes/Home';
import LoginPage from '../scenes/Login';
import { PrivateRoute } from './PrivateRoute';
// import NotFoundPage from './pages/NotFoundPage';

export default function RoutesApp() {
    return(
        <Router>
        <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/Home" element={<HomePage />} />
              </Route>
               <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    )
}