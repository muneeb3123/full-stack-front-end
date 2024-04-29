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

  const [carData, setCarData] = useState({
    name: '',
    finance_fee: '',
    option_to_purchase_fee: '',
    total_amount_payable: '',
    duration: '',
    apr: '',
    color: '',
    image: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewCar(carData))
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCarData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="finance_fee" placeholder="Finance Fee" onChange={handleChange} required />
        <input type="number" name="option_to_purchase_fee" placeholder="Option To Purchase Fee" onChange={handleChange} required />
        <input type="number" name="total_amount_payable" placeholder="Total Amount Payable" onChange={handleChange} required />
        <input type="text" name="duration" placeholder="Duration" onChange={handleChange} required />
        <input type="number" name="apr" placeholder="APR" step={0.01} onChange={handleChange} />
        <select id="color" name="color" required onChange={handleChange}>
          <option value="" disabled defaultValue>Select a color</option>
          <option value="color1">Color1</option>
          <option value="color2">Color2</option>
          <option value="color2">Color3</option>
          <option value="color2">Color4</option>
          <option value="color2">Color5</option>
        </select>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        <textarea
          name="description"
          placeholder="Description"
          className="description"
          onChange={handleChange}
          required
        />
        <button type="submit">Add New Car</button>
      </form>

      <Link to="/cars">Back to Cars</Link>
    </section>
  );
};

export default AddNewCar;
