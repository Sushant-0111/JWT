import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Login from './routes/login';
import Menu from './routes/menu';
import { AuthProvider } from './context/useAuth';
import PrivateRoute from './components/private_route';
import Register from './routes/register';


function App() {
  return (
   
      <Router>
        <AuthProvider>

        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<PrivateRoute>
            <Menu/>
          </PrivateRoute> } />
        </Routes>
        </AuthProvider>
      </Router>
   

  );
}

export default App;
