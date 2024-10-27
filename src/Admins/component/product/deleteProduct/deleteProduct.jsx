import { Fragment, useContext } from "react"
import { useHttpClinet } from "../../../../utils/hooks/http-hook";
import { AuthContext } from "../../../../context/auth.context";
import Button from "../../../../component/others/button/button";
import LoadingSpinner from "../../../../component/others/loading-sppiner/loadingSppiner";
import BackDrop from "../../../../component/others/backDrop/backDrop";
import ErrorModal from "../../../../component/others/modal/error/error";
import './deleteProduct.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const DeleteModal=({onClick,id})=>{
  const navigate=useNavigate();
  const{token}=useContext(AuthContext)
  const { error,clearError,isLoading,sendRequest} = useHttpClinet();
  const deleteHandler=async(event)=>{
    event.preventDefault();

    try{
         await sendRequest(process.env.REACT_APP_BACKEND_URL + `/api/product/${id}`,'DELETE',null,{
          authorization:'Bearer '+ token
        })
    }
    catch(error){}
    toast(`Item delete`);
    navigate("/controlPage/Products")

  }
    return (
        <Fragment>
          {error && <BackDrop />}
          {error && <ErrorModal data={error} onClick={clearError} />}   

        <div className="modal">
        {isLoading && <LoadingSpinner asOverlay />}
      <header className='modal-header'>
        <h2>Are you sure ?</h2>
        </header>
        <form>
        <div className='modal-content'>
        <p>Do you want to process and delete this product ? Please note that it can't be undone thereafter</p>
        </div>
        <footer className='modal-footer'>
          <Button inverse onClick={onClick}>close</Button>
          <Button inverse onClick={deleteHandler}>Delete</Button>
        </footer>
      </form>
    </div>
      </Fragment>
        )
}
export default DeleteModal