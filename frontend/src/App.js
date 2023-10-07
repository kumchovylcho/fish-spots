import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './util/PrivateRoute';


function App() {

    useEffect(() => {
        document.body.style.backgroundColor = '#D4D4D8';

      }, []);

    return (
    <>
    <div className="flex flex-col min-h-screen">
        <AuthProvider>
            <Navigation/>

            <Routes>
            
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={
                                            <PrivateRoute navigateTo="/">
                                                <Login/>
                                            </PrivateRoute>
                                            }
                                            />
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </AuthProvider>

        <Footer/>
    </div>
    </>
    );
}

export default App;
