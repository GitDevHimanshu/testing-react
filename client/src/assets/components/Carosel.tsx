interface caroselprops{
    img1: string;
    identity: string;
}

function Carosel(props: caroselprops) {
  return (
    <div className="p-2">
      <div id={props.identity.slice(0,-1)} className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={props.img1} className="d-block w-100"  />
          </div>
          <div className="carousel-item">
            <img src={props.img1} className="d-block w-100"  />
          </div>
          <div className="carousel-item">
            <img src={props.img1} className="d-block w-100" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={"#" + props.identity.slice(0,-1)}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={"#" + props.identity.slice(0,-1)}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carosel;
