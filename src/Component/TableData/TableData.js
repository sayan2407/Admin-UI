
import Pagination from "../Pagination/Pagination";
import "./TableData.css";

import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaSave, FaTimes } from 'react-icons/fa';



import { useState } from "react";

const TableData = ({employees, setEmployees}) => {
 

    const columnName = ["Name", "Email", "Role", "Actions"];
    const [ selectedEmployees, setSelectedEmployess ] = useState([]);
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [ isAllChecked, setIsAllChecked ]  = useState(false);
    const [ editingUser, setEditingUser ] = useState({});   // console.log('employees ', employees);




    const selectHandle = ( event, emp ) => {
        const isChecked = event.target.checked;
        let updatedSelectedEmp = [];

        if ( isChecked ) {
            updatedSelectedEmp = [ ...selectedEmployees, emp ];
        } else {
            setIsAllChecked(false);
            updatedSelectedEmp = selectedEmployees.filter( existingEmp => existingEmp.id !== emp.id );

        }

        setSelectedEmployess( updatedSelectedEmp );
    }

    /**
     * Select All Employees
     */
    const selectedAllEmployes = ( event ) => {

        const isChecked = event.target.checked;

        if ( isChecked ) {
            setIsAllChecked( true );
            setSelectedEmployess(employees.slice((currentPage-1) * rowsPerPage, (currentPage-1) * rowsPerPage + rowsPerPage));
        } else {
            setIsAllChecked( false );
            setSelectedEmployess([]);

        }

    }

    /**
     * Deleted Selected Function
     */
    const deleteSeletected = () => {

        if ( selectedEmployees.length ) {
            employees = employees.filter(emp=> !selectedEmployees.includes(emp));
            setSelectedEmployess([]);
            setIsAllChecked(false);
            setEmployees(employees);
        } else {
            alert("No Employee Selected");

        }     
    }

    /**
     * Page Change Method
     */
    const handleCurrentPage = (page) => {
        setCurrentPage(page);

    }

    /**
     * Editing Employes
     */
    const editEmployess = (emp) => {
        setEditingUser(emp);
    }

    /**
     * Cancel Editing Method
     */
    const cancelEditing = () => {
        setEditingUser({});

    }

    /**
     * Delete a Employe
     */
    const deleteEmploye = (emp) => {
        const filterEmployes = employees.filter((member)=> member.id !== emp.id );
        setEmployees( filterEmployes );
    }

    /**
     * Icon style
     */
    const redIconStyle = {
        'color' : 'red'
    };

    /**
     * Saved Editing Employee
     */
    const saveEditingUser = (updatedEmp) => {
        
        /**
         * Basic Validation
         */
        if ( updatedEmp.name === '' || updatedEmp.email === '' || updatedEmp.role === '' ) {
            alert("you cannot save empty");

        } else {
            const updatedEmployees = employees.map( emp => {
                if ( emp.id === updatedEmp.id ) {
                    return updatedEmp;
                }
                return emp;
            } )

            setEmployees(updatedEmployees);
            cancelEditing();

        }

    }
  

    return (
        <section>
            <div className="container">
                {
                    (employees.length === 0) ? (
                        <div>
                          <h1>No Results Found</h1>  
                        </div>
                    ) : (
                        <div className="table_container">
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
                                        <td>
                                            {
                                                (editingUser.id === emp.id) ? (
                                                    <input className="emp_editing" value={editingUser.name}  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}/>
                                                ) : (
                                                    emp.name
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                (editingUser.id === emp.id) ? (
                                                    <input className="emp_editing" value={editingUser.email}  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}/>
                                                ) : (
                                                    emp.email
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                (editingUser.id === emp.id) ? (
                                                    <input className="emp_editing" value={editingUser.role}  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}/>
                                                ) : (
                                                    emp.role
                                                )
                                            }
                                        </td>
                                        <td>
                                            { (editingUser.id === emp.id) ? (
                                                <div className="action_btn">
                                                    <button className="action_icons" onClick={() => saveEditingUser(editingUser)}>
                                                    <FaSave /> 
                                                </button>
                    
                                                <button className="action_icons" onClick={cancelEditing}>
                                                    <FaTimes style={redIconStyle} /> 
                                                </button>
                                                </div>
                                            ) : (
                                                <div className="action_btn">
                                                    <button className="action_icons" onClick={() => editEmployess(emp)}>
                                                    <FiEdit /> 
                                                </button>
    
                                                <button className="action_icons" onClick={() => deleteEmploye(emp)}>
                                                    <FiTrash2 style={redIconStyle} /> 
                                                </button>
                                                </div>
                                            ) }
                                    
    
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )
                }
             
        
                <section className="table_footer">
                    <button onClick={deleteSeletected} className="deleted_btn"> Delete Selected </button>
                    <Pagination currentPage={currentPage} employees={employees} rowsPerPage={rowsPerPage} setCurrentPage = {handleCurrentPage}/>
                </section>
            </div>
            

        </section>
    )

}

export default TableData;