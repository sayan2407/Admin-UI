
import './Pagination.css';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';


const Pagination = ({ employees, rowsPerPage, setCurrentPage, currentPage }) => {
    console.log('employees=> ', employees);
  const page_count = Math.ceil(employees.length / rowsPerPage);
  console.log('page_count ', page_count);

  const changePage = (index) => {
    console.log('index=> ' , index);
    setCurrentPage(index+1);
  }

  const setFirstPage = () => {
    setCurrentPage(1);
  }

  const goToPrevPage = (prevPage) => {
    setCurrentPage( prevPage - 1 );
  }

  const setLastPage = () => {
    setCurrentPage(page_count);
  }

  const goToNextPage = (prevPage) => {
    setCurrentPage( prevPage + 1 );
  }

  const buttons = Array.from({ length: page_count }, (_, index) => (
    <button disabled={ index+1 === currentPage } className={ (index+1===currentPage) ? "selected_page pagination_button" : "pagination_button"} onClick={() => changePage(index)} key={index + 1}>{index + 1}</button>
  ));

  return (
    <>
     
      <div>
        <button onClick={setFirstPage} disabled={ currentPage === 1 } className="pagination_button">
          <FiChevronsLeft/>
        </button>
        <button onClick={() => goToPrevPage(currentPage)} disabled={ currentPage === 1 } className="pagination_button">
          <FiChevronLeft/>
        </button>
        {buttons}
        <button onClick={()=>goToNextPage(currentPage)} disabled={ currentPage === page_count } className="pagination_button">
          <FiChevronRight/>
        </button>
        <button onClick={setLastPage} disabled={ currentPage === page_count } className="pagination_button">
          <FiChevronsRight/>
        </button>
      </div>

    </>
  
  )
};

export default Pagination;
