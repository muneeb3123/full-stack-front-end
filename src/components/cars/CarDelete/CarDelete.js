import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper as SwiperDel, SwiperSlide as SwiperSlideDel } from 'swiper/react';
import { fetchAllCars } from '../../../redux/cars/CarsIndexSlice';
import CardDelete from './CardDelete';

const CarDelete = () => {
  const dispatch = useDispatch();
  const { isUser, user } = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (isUser) {
      if (user.role !== 'admin') {
        navigate('/cars');
        toast.error('You are not a admin');
      }
    } else {
      navigate('/cars');
      toast.error('You are not admin');
    }
  });

  const displayAllCarsArray = useSelector((store) => (store.allCarsReducer.allCarsArray));

  const hasCars = displayAllCarsArray.length > 0;

  return (
    <SwiperDel
      className="container-index"
      modules={[EffectFade, Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      breakpoints={{
        1400: { slidesPerView: 3 },
        900: { slidesPerView: 2 },
        500: { slidesPerView: 1 },
      }}
      navigation
      pagination={{ clickable: true }}
    >
      {hasCars ? (
        displayAllCarsArray.map((car) => (
          <div key={car.id}>
            <SwiperSlideDel>
              <CardDelete
                name={car.attributes.name}
                image={car.attributes.image_url}
                id={car.id}
                color={car.attributes.color}
              />
            </SwiperSlideDel>
          </div>
        ))
      ) : (
        <div className="no-car">
          <p>No cars to display</p>
        </div>
      )}
      <section slot="container-start" className="slot-start">
        <h1 className="index-title">List of Cars</h1>
        <p className="header-instruction">Please Select a Car to delete</p>
        <hr className="line-doted" />
      </section>
    </SwiperDel>

  );
};

export default CarDelete;
