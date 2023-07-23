import "./Dashboard.css";

import Searchbar from "../Searchbar/Searchbar";
import TableData from "../TableData/TableData";
import { 
    useEffect,
    useState
 } from "react";

import { useSnackbar } from "notistack";
import axios from "axios";
import api from "./apiData.js";

const Dashboard = () => {

   const [ employees, setEmployees ] = useState([]);
   const [ fillteredEmployee, setFillteredEmployee ] = useState([]);
   const { enqueueSnackBar } = useSnackbar();


   /**
    * Perform API Call In userEffect Hook
    */
  useEffect(()=>{
    fetchEmployees();
  }, [])

  /**
   * API is https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json
   * use axios to get data and save it to users and fillteredUsers
   */
  const fetchEmployees = async() => {
    try {
      const response = await axios.get(api);
     
      setEmployees( response.data );
      setFillteredEmployee( response.data );

    } catch( error ) {
      let errorMessage = "";
      if ( error.response && error.response.status === 500 ) {
        errorMessage = error.response.message; 
      } else {
        errorMessage = "Something went wrong!!";
      }
      enqueueSnackBar( errorMessage, {variant: "error"} );
    }
  }

    const handleSetEmployees = (emps) => {
      setFillteredEmployee(emps);
      setEmployees(emps);
    }

    const handleSearch = (keyword) => {
      if (!keyword) {
        setFillteredEmployee(employees);
      } else {
        const filtered = employees.filter(
          (emp) =>
            emp.name.toLowerCase().includes(keyword.toLowerCase()) ||
            emp.email.toLowerCase().includes(keyword.toLowerCase()) ||
            emp.role.toLowerCase().includes(keyword.toLowerCase())
        );
        setFillteredEmployee(filtered);
      }
    }

    return (
        <>
        <Searchbar searchEmployees={handleSearch}/>
        <TableData employees={fillteredEmployee} setEmployees={handleSetEmployees}/>
        </>
    )

}

export default Dashboard;