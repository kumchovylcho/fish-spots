import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './util/PrivateRoute';
import City from './components/City/City';
import Weather from './components/Weather/Weather';
import FishSpots from './components/FishSpots/FishSpots';
import SuggestedSpots from './components/SuggestedSpots/SuggestedSpots';
import Landscapes from './components/Landscapes/Landscapes';

function App() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-zinc-300">
                <AuthProvider>
                    <Navigation />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/city" element={<City />} />
                            <Route path="/city/weather" element={<Weather />} />
                            <Route path="/city/fish-spots" element={<FishSpots />} />
                            <Route path="/city/suggested-spots" element={<SuggestedSpots />} />
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
                        <Route
                            path="/landscapes"
                            element={<Landscapes />}
                        />
                    </Routes>
                </AuthProvider>

                <Footer />
            </div>
        </>
    );
}

export default App;
