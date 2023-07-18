import "./Searchbar.css";
import {
    useState
} from 'react';

const Searchbar = () => {

    const [ searchingText, setSearchingText ] = useState("");

    return (
        <section>
            <div className="container searchbar_container">
                <input 
                type="text"
                value={searchingText}
                onChange={(e)=>setSearchingText(e.target.value)}
                placeholder="Search by name, email or role" ></input>
            </div>
        </section>
    )

}
export default Searchbar;