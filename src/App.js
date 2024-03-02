import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Openacc from './pages/NewPatient'
import Summary from './pages/PatientDeatail'
import Add from './pages/NewComplication'
import Register from './pages/Register'
function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/main" element={<MainPage />} />
          <Route path="/create" element={<Openacc />}/>
          <Route path="/summary" element={<Summary />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/add" element={<Add />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
