import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createNewCar } from '../../../redux/cars/AddNewCarSlice';
import './AddNewCar.css';

const AddNewCar = () => {
  const { isUser, user } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('car[name]', e.target.name.value);
    formData.append('car[finance_fee]', e.target.finance_fee.value);
    formData.append('car[option_to_purchase_fee]', e.target.option_to_purchase_fee.value);
    formData.append('car[total_amount_payable]', e.target.total_amount_payable.value);
    formData.append('car[duration]', e.target.duration.value);
    formData.append('car[apr]', e.target.apr.value);
    formData.append('car[color]', e.target.color.value);
    formData.append('car[description]', e.target.description.value);
    formData.append('car[image]', e.target.image.files[0]);
    dispatch(createNewCar(formData))
      .then((action) => {
        if (action.payload.data) {
          toast.success(action.payload.message);
          navigate('/cars');
        } else {
          toast.error(action.payload.error[0]);
        }
      })
      .catch(() => {
        toast.error('There is an error in adding a new car');
      });
  };

  useEffect(() => {
    if (isUser) {
      if (user.role !== 'admin') {
        navigate('/cars');
        toast.error('You are not logged in as an admin');
      }
    } else {
      navigate('/cars');
      toast.error('You are not logged in');
    }
  }, [isUser, user.role, navigate]);

  return (
    <section className="add-new-car-page">
      <h1 className="add-new-car-heading">Add New Car</h1>

      <form className="add-new-car-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="number" name="finance_fee" placeholder="Finance Fee" required />
        <input type="number" name="option_to_purchase_fee" placeholder="Option To Purchase Fee" required />
        <input type="number" name="total_amount_payable" placeholder="Total Amount Payable" required />
        <input type="text" name="duration" placeholder="Duration" required />
        <input type="number" name="apr" placeholder="APR" step={0.01} />
        <select id="color" name="color" required>
          <option value="" disabled defaultValue>Select a color</option>
          <option value="color1">Color1</option>
          <option value="color2">Color2</option>
          <option value="color2">Color3</option>
          <option value="color2">Color4</option>
          <option value="color2">Color5</option>
        </select>
        <input type="file" name="image" accept="image/*" />
        <textarea
          name="description"
          placeholder="Description"
          className="description"
          required
        />
        <button type="submit">Add New Car</button>
      </form>

      <Link to="/cars">Back to Cars</Link>
    </section>
  );
};

export default AddNewCar;
