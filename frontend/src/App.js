import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './component/hedder/hedder';
import Signup from './pages/signUp1';
import Jobpage from './pages/jobpage';
import SignUpPage2 from './pages/signUp2';
import ProtectedRoute from './component/protectedroutes'; 

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route 
          path="/verify" 
          element={
            <ProtectedRoute requiresToken={false}>
              <SignUpPage2 />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jd" 
          element={
            <ProtectedRoute requiresToken={true}>
              <Jobpage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}
export default App;
