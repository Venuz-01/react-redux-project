import React from "react";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";

     
function CarouselComp() {
  return (
    <div id="mainCarousel" class="carousel slide mt-4"  data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={banner1} class="d-block w-100 carousel-img" alt="Banner 1" />
        </div>
        <div class="carousel-item">
          <img src={banner2} class="d-block w-100 carousel-img" alt="Banner 2" />
        </div>
        <div class="carousel-item">
          <img src={banner3} class="d-block w-100 carousel-img" alt="Banner 3" />
        </div>
      </div>

     
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default CarouselComp;
