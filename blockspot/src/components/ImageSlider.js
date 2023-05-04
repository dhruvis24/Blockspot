import React, { useState, useEffect } from 'react';
import sStyles from "./modules/Slider.module.css";
import SliderBox from './SliderBox';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(1);
  const [delay, setDelay] = useState(4000);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCounter) => (prevCounter+1)%length);
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setDelay(8000);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setDelay(8000);
  };

  useEffect(() => {
    if (delay===8000) {
      const timer = setTimeout(() => {
        setDelay(4000);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [delay])

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className={sStyles.slider}>

      <div style={{
          width: "0",
          height: "0", 
          borderTop: "19px solid transparent",
          borderBottom: "19px solid transparent", 
          borderRight: "32px solid #38B6FF"
        }} className={sStyles.leftArrow} onClick={prevSlide}></div>

      <div style={{
          width: "0",
          height: "0", 
          borderTop: "19px solid transparent",
          borderBottom: "19px solid transparent",
          borderLeft: "32px solid #38B6FF"
        }} className={sStyles.rightArrow} onClick={nextSlide}></div>


      
      {slides.map((slide, index) => {
        if (index!==current-1 && (current===0 && index!==length-1)) return (null)
        return (
          <div
            className={sStyles.backSlide1}
            key={index}
          >
            {(index===current-1 || (current===0 && index===length-1)) && (
              <SliderBox name={slide.name} link={slide.link} industry={slide.industry} imgLink={slide.imgLink} description={slide.description} key={index} />
            )}
          </div>
        );
      })}

      {slides.map((slide, index) => {
        if (index !== current) return (null)

        return (
          <div
            className={sStyles.slide}
            key={index}
          >
            {index === current && (
              <SliderBox name={slide.name} link={slide.link} industry={slide.industry} imgLink={slide.imgLink} description={slide.description} key={index}/>
            )}
          </div>
        );
      })}

      {slides.map((slide, index) => {
        if (index!==(current+1)%length) return (null)

        return (
          
          <div
            className={sStyles.backSlide2}
            key={index}
          >
            {index === (current+1)%length && (
              <SliderBox name={slide.name} link={slide.link} industry={slide.industry} imgLink={slide.imgLink} description={slide.description} key={index}/>
            )}
          </div>
        );
      })}

    </section>
  );
};

export default ImageSlider;