import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import PrivateRoute from './util/PrivateRoute';
import AuthorizedRoute from './util/AuthorizedRoute';
import City from './components/City/City';
import Weather from './components/Weather/Weather';
import FishSpots from './components/FishSpots/FishSpots';
import SuggestedSpots from './components/SuggestedSpots/SuggestedSpots';
import Landscapes from './components/Landscapes/Landscapes';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import { cityRoutes } from './util/routes';

function App() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-zinc-300">
                <Navigation />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/city" element={<City />} />
                    <Route path={cityRoutes.weather} element={<Weather />} />
                    <Route
                        path={cityRoutes.fishSpots}
                        element={<FishSpots />}
                    />
                    <Route
                        path={cityRoutes.suggestedSpots}
                        element={<SuggestedSpots />}
                    />
                    <Route
                        path="/login"
                        element={
                            <PrivateRoute navigateTo="/">
                                <Login />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile/:username"
                        element={
                            <AuthorizedRoute navigateTo="/login">
                                <Profile />
                            </AuthorizedRoute>
                        }
                    />
                    <Route path="/landscapes" element={<Landscapes />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
        </>
    );
}

export default App;
