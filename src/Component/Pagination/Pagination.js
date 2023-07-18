
import './Pagination.css';

const Pagination = ({ employees, rowsPerPage, setCurrentPage, currentPage }) => {
    console.log('employees=> ', employees);
  const page_count = Math.ceil(employees.length / rowsPerPage);
  console.log('page_count ', page_count);

  const changePage = (index) => {
    console.log('index=> ' , index);
    setCurrentPage(index+1);
  }


  const buttons = Array.from({ length: page_count }, (_, index) => (
    <button disabled={ index+1 === currentPage } className={ (index+1===currentPage) ? "selected_page pagination_button" : "pagination_button"} onClick={() => changePage(index)} key={index + 1}>{index + 1}</button>
  ));

  return (
    <>
        <div>{buttons}</div>
    </>
  
  )
};

export default Pagination;
