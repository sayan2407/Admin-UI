import {Routes, Route} from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Dashboard from './Component/Dashboard/Dashboard';
import NotFound from './Component/NotFound/NotFound';
import Footer from './Component/Footer/Footer';

const App = () => {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="*" element ={<NotFound/>}></Route>
        </Routes>
        <Footer/>
        </>
    )
}

export default App;