
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/");
  }
  return (
    <>
        <div className="not_found">
            <h1> 404 Not Found Page</h1>
            <p>This page isn't exist</p>
            <button onClick={goToMainPage}>Go To Main Page</button>
        </div>
    </>

  )
}

export default NotFound