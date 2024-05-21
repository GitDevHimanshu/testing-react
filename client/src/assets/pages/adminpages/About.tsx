import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ProductForm from "../../components/ProductForm";
const About = () => {
  const context = useContext(AuthContext);
  return (
    <div className="container">
      {context?.showform ?(
      <div className="z-3 position-absolute w-75" style={{right:"12.5%", top:"8%"}}>
        <ProductForm setProduct={context?.setProduct} product={context?.product} />
      </div>
    ):(
      <></>
    )}
      <h1 className="mt-5">About Us</h1>
      <div className="row">
        <div className="col-md-8">
          <p>
            Welcome to our website! We are dedicated to providing you with the
            best experience possible.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed
            augue eget leo dignissim posuere. Curabitur luctus vel lorem nec
            aliquet. Nam fringilla erat vitae libero venenatis, vel placerat
            lorem feugiat. Maecenas vitae condimentum mauris. Integer in semper
            dolor. Donec vitae arcu ac risus commodo vehicula nec in purus. Sed
            in erat nisi. Quisque tincidunt libero id tristique dignissim.
            Vivamus vel tellus et ligula dictum ullamcorper in a lacus.
          </p>
          <p>
            Suspendisse potenti. Nulla vitae tellus eget lectus pellentesque
            ullamcorper. Mauris vitae metus nec quam fermentum sagittis. Morbi
            id malesuada lorem. Fusce vel massa eu justo finibus tincidunt.
            Vivamus commodo velit eget erat dictum venenatis. Nullam eleifend
            purus eget ipsum consequat, nec volutpat quam ultricies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
