import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const SwiperProvider = ({
  children,
  data,
  navigation,
  pagination,
  slidesPerView,
  autoplay,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={{
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
      spaceBetween={15}
      slidesPerView={slidesPerView ? slidesPerView : 2}
      navigation={navigation ? navigation : false}
      pagination={pagination ? pagination : false}
      autoplay={autoplay ? { delay: 1200 } : false}
      className="w-full h-full "
    >
      {data.map((el, idx) => (
        <SwiperSlide key={el.id}>
          {React.cloneElement(children, { data: el })}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperProvider;
