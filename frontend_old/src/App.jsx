
import Landing from "./components/Landing";
import Owner from "./components/Owner";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          
          <Route path='/owner' element={<Owner />}></Route>
          
          </Routes>
        
      </Router>
    </>
  )
}

export default App