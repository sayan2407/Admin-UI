import {Routes, Route} from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Dashboard from './Component/Dashboard/Dashboard';

const App = () => {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
        </Routes>
        </>
    )
}

export default App;