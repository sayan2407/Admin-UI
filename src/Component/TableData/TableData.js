
import Footer from "../Footer/Footer";
import Pagination from "../Pagination/Pagination";
import "./TableData.css";

import { useState } from "react";

const TableData = ({employees, setEmployees}) => {
    // console.log('employees ', employees);
    const columnName = ["Name", "Email", "Role", "Actions"];
    const [ selectedEmployees, setSelectedEmployess ] = useState([]);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

  const [ isAllChecked, setIsAllChecked ]  = useState(false);



    const selectHandle = ( event, emp ) => {
        const isChecked = event.target.checked;
        let updatedSelectedEmp = [];

        if ( isChecked ) {
            updatedSelectedEmp = [ ...selectedEmployees, emp ];
        } else {
            setIsAllChecked(false);
            updatedSelectedEmp = selectedEmployees.filter( existingEmp => existingEmp.id !=emp.id );

        }

        setSelectedEmployess( updatedSelectedEmp );
    }

    const selectedAllEmployes = ( event ) => {
        const isChecked = event.target.checked;
        let updatedSelectedEmployess = [];

        if ( isChecked ) {
            setIsAllChecked( true );
            setSelectedEmployess(employees.slice((currentPage-1) * rowsPerPage, (currentPage-1) * rowsPerPage + rowsPerPage));
            // updatedSelectedEmployess = [...selectedEmployees];
        } else {
            setIsAllChecked( false );
            setSelectedEmployess([]);

        }

        // setSelectedEmployess(updatedSelectedEmployess);
    }

    const deleteSeletected = () => {
        // employees = employees.filter(emp)
     console.log('selectedEmployees ', selectedEmployees);
     employees = employees.filter(emp=> !selectedEmployees.includes(emp));
     setSelectedEmployess([]);
     setIsAllChecked(false);
     setEmployees(employees);
    //  console.log('employees ', employees);

        
    }

    const handleCurrentPage = (page) => {
        console.log( page);
        setCurrentPage(page);

    }

    return (
        <section>
        <div className="container">
            <table>
                <tbody>
                    <tr>
                        <th><input checked={isAllChecked} onChange={(event) => selectedAllEmployes(event)} type="checkbox"></input></th>
                        {columnName.map(col => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                    {employees.slice((currentPage-1) * rowsPerPage, (currentPage-1) * rowsPerPage + rowsPerPage).map(emp => (
                        <tr key={emp.id} className={ ( isAllChecked || selectedEmployees.includes(emp) ) ? "selected" : "" }>
                            <td><input checked = { (isAllChecked || selectedEmployees.includes(emp) ) ? true : false } type="checkbox" onChange={(event) => selectHandle(event, emp)} /></td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.role}</td>
                            <td>Two Buttons</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <section className="table_footer">
                <button onClick={deleteSeletected} className="deleted_btn"> Delete Selected </button>
                <Pagination currentPage={currentPage} employees={employees} rowsPerPage={rowsPerPage} setCurrentPage = {handleCurrentPage}/>
            </section>
        </div>
        <Footer/>

    </section>
    )

}

export default TableData;