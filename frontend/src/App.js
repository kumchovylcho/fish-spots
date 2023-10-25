import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './util/PrivateRoute';
import Varna from './components/Varna/Varna';
import Burgas from './components/Burgas/Burgas';

function App() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-zinc-300">
                <AuthProvider>
                    <Navigation />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/varna" element={<Varna />} />
                        <Route path="/burgas" element={<Burgas />} />
                        <Route
                            path="/login"
                            element={
                                <PrivateRoute navigateTo="/">
                                    <Login />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PrivateRoute navigateTo="/">
                                    <Register />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </AuthProvider>

                <Footer />
            </div>
        </>
    );
}

export default App;
