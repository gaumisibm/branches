import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout  from './components/Logout';
import NotFound from './components/NotFound';
import {Routes,Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/login" element={<Login />}  />
        <Route path="/contact" element={<Contact />}  />
        <Route path="/about" element={<About />}  />
        <Route path="/signup" element={<Signup />}  />
        <Route path="/logout" element={<Logout />}  />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
