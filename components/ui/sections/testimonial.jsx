"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { testimonials } from "@/data/site";
import TestimonialCard from "../../pages/home-1/ui/testimonial-card";

export default function Testimonial() {
  return (
    <div
      className="testimonial-section-01 overlay bg-fixed section-padding-140"
      style={{
        backgroundImage: 'url("image/AFEC/logo.png")',
      }}
    >
      <div className="container">
        <div className="testimonial-01__slider-wrapper">
          <p className="mot-presidant"> Mot Du Présidant </p>
          <div className="testimonial-01__slider">
            <Swiper
              navigation={{
                prevEl: ".ui-prev-1",
                nextEl: ".ui-next-1",
              }}
              pagination={{
                clickable: true,
                bulletClass: "ui-custom-dot-2",
              }}
              modules={[Navigation, Pagination]}
              loop={true}
              className="ui-swipper-wrapper-2"
            >
              {testimonials?.map((item, i) => (
                <SwiperSlide key={i}>
                  <TestimonialCard data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="ui-prev ui-prev-1">
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button className="ui-next ui-next-1">
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
