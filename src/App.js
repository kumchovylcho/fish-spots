import { Route, Routes } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
    return (
    <>
        <Navigation/>

        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>

        <Footer/>
    </>
    );
}

export default App;
