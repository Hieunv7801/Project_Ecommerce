import React from "react";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="http://songlongmedia.com/media/lib/2089_tai-nghe-bluetooth-fiio-eh3nc-songlongmedia27.jpg"
              alt=""
              srcset=""
            />
          </div>
          <div class="carousel-item">
            <img
              src="http://songlongmedia.com/media/lib/2089_tai-nghe-bluetooth-fiio-eh3nc-songlongmedia27.jpg"
              alt=""
              srcset=""
            />
          </div>
          <div class="carousel-item">
            <img
              src="http://songlongmedia.com/media/lib/2089_tai-nghe-bluetooth-fiio-eh3nc-songlongmedia27.jpg"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-target="#carouselExampleControls"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-target="#carouselExampleControls"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}
