import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom/';
import {
  Chart, Title, ArcElement, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { fetchSpecificCar } from '../../../redux/cars/CarShowSlice';
import './CarShow.css';
import rowr from '../../../images/rowright.svg';

Chart.register(
  Title, ArcElement, Legend,
);

const data = {
  labels: [],
  datasets: [{
    label: '',
    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    backgroundColor: [
      'rgba(229,16,13,255)',
      'rgba(228,107,16,255)',
      'rgba(230,147,18,255)',
      'rgba(229,188,16,255)',
      'rgba(227,223,212,255)',
      'rgba(102,187,15,255)',
      'rgba(22,146,20,255)',
      'rgba(34,108,181,255)',
      'rgba(16,62,229,255)',
      'rgba(30,34,34,255)',
      'rgba(153,21,149,255)',
      'rgba(153,21,149,255)',
    ],
    borderWidth: [0],
    cutout: 50,
    hoverBackgroundColor: [
      'rgba(229,16,13,255)',
      'rgba(228,107,16,255)',
      'rgba(230,147,18,255)',
      'rgba(229,188,16,255)',
      'rgba(227,223,212,255)',
      'rgba(102,187,15,255)',
      'rgba(22,146,20,255)',
      'rgba(34,108,181,255)',
      'rgba(16,62,229,255)',
      'rgba(30,34,34,255)',
      'rgba(153,21,149,255)',
      'rgba(153,21,149,255)',
    ],
  }],
};

const CarShow = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { carID } = location.state;

  useEffect(() => {
    dispatch((fetchSpecificCar(carID)));
  }, [dispatch, carID]);

  const car = useSelector((store) => store.specificCarReducer.specificCarArray);
  console.log(car);

  return (
    <>
      <main className="car-show-container" key={car.id}>
        <section className="car-image-container">
          <img src={car.attributes.image_url} alt={car.attributes.name} className="car-image" />
        </section>

        <section className="car-details-container">
          <div className="car-name-container">
            <h1 className="car-name">{car.attributes.name}</h1>
            <p className="deposit-details">- $200 deposit upon any car purchase</p>
          </div>
          <div className="car-details-reserve">
            <div className="purchase-details-container">
              <div className="finance-fee-container">
                <p className="finance-fee-text">Finance fee</p>
                <p className="finance-fee-value">{car.attributes.finance_fee}</p>
              </div>

              <div className="option-to-purchase-fee-container">
                <p className="option-to-purchase-fee-text">Option to purchase fee</p>
                <p className="option-to-purchase-fee-value">{car.attributes.option_to_purchase_fee}</p>
              </div>

              <div className="total-amount-payable-container">
                <p className="total-amount-payable-text">Total amount payable</p>
                <p className="total-amount-payable-value">{car.attributes.total_amount_payable}</p>
              </div>

              <div className="duration-container">
                <p className="duration-text">Duration</p>
                <p className="duration-value">{car.attributes.duration}</p>
              </div>
            </div>
            <div className="rigth-side-container">
              <div className="apr-percentage-container">
                <strong>
                  {car.attributes.apr}
                  % APR&nbsp;
                </strong>
                Representative
              </div>

              <div className="doughnut-chart-container">
                <Link to={`/cars/${car.id}/add/reservation`} className="reserve-btn">
                  Reserve
                  {' '}
                  <img src={rowr} alt="row right" className="rowr" />
                </Link>
                <Doughnut className="doughnut-chart" data={data} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CarShow;
