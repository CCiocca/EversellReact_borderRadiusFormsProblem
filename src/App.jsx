import { Routes, Route} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from './pages/Login';
const Customer = lazy(()=>import('./pages/Customer'));

function App() { 
  return (
    <>
        <Routes>
        <Route path="/" element={<Login />} />     
        <Route path="/customer" element={
          <Suspense fallback={<div></div>}>
          <Customer />
        </Suspense>
        } />   
      </Routes> 
    </>
  )
}

export default App
