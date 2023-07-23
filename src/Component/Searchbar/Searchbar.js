import "./Searchbar.css";
import {
    useState
} from 'react';

const Searchbar = ({searchEmployees}) => {

    const [debounceTime, setDebounceTime] = useState(null);


    const debounceSearch = (event, debounceTimeOut) => {

        const keyword = event.target.value;
    
        if ( debounceTimeOut ) {
          clearTimeout(debounceTimeOut);
        }
    
        const timeout = setTimeout( () => {
            searchEmployees(keyword);
        }, 500);
        setDebounceTime(timeout);
      }

    return (
        <section>
            <div className="container searchbar_container">
                <input 
                type="text"
                onChange={(e)=> debounceSearch(e, debounceTime)}
                placeholder="Search by name, email or role" ></input>
            </div>
        </section>
    )

}
export default Searchbar;