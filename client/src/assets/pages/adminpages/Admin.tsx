import { useContext, useEffect } from "react";
import axios from 'axios';
import Product from "../../components/Product";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from "../../components/ProductForm";
import AuthContext from "../../context/AuthContext";

function Admin() { 
  const context = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://testing-react-235m.onrender.com/admin/get-product');
        const data = res.data ? res.data : [];
        context?.setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

{context?.showform ?(
      <div className="z-3 position-absolute w-75" style={{right:"12.5%", top:"8%"}}>
        <ProductForm setProduct={context?.setProduct} product={context?.product} />
      </div>
    ):(
      <></>
    )}

      <div className="container mt-2">
        <div className="row bg-dark text-light rounded mb-3">
          <div className="col-3 text-center fw-bold">Images</div>
          <div className="col-2 text-center fw-bold">Name</div>
          <div className="col-2 text-center fw-bold">Price</div>
          <div className="col-2 text-center fw-bold">Quantity</div>
          <div className="col-3 text-center fw-bold">Action</div>
        </div>

        <div className='overflow-y-scroll overflow-x-hidden' style={{ height: "80vh" }}>
          {context?.product.map((value, index) => (
            <div className="row bg-light my-2 p-2 shadow-sm rounded" key={value._id}>
              <Product
                key={index}
                image={"https://www.pexels.com/photo/black-and-gray-pentax-bridge-camera-on-white-surface-821651/"}
                name={value.productname}
                price={value.productprice}
                quantity={value.productquantity}
                identity={value._id}
                statevar={context?.product}
                statefunc={context?.setProduct}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Admin;
