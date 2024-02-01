import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LocalStorage from '../assets/LocalStorage';


const ShowSummary = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
        console.log('summary:: ')
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchShow();
  }, [id]);

  const handleBookTicket = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userName = e.target.elements.userName.value;
    const userEmail = e.target.elements.userEmail.value;
    const userNumber=e.target.elements.userNumber.value;

    // Save user details to local storage
    LocalStorage.setItem("userName", userName);
    LocalStorage.setItem("userEmail", userEmail);
    LocalStorage.setItem("userNumber", userNumber);


    setShowForm(false);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="showSummary" style={{display:'flex',justifyContent:'space-between'}}>
      <h1>SHOW SUMMARY</h1>
      <div className="card" style={{ width: '18rem' }}>
  <img class="card-img-top" src={show.image.original} alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">{show.name}</h5>
    <p  dangerouslySetInnerHTML={{ __html: show.summary }} className="card-text" /><a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

      
      <div className="btnContainer">
        <button type="button" class="btn btn-lg btn-primary"  onClick={handleBookTicket} >Book Ticket</button>
        <Link to="/" className="BackBtn commonBtn">
        <button type="button" class="btn btn-secondary btn-lg" disabled>Back to Show List</button>

        </Link>
      </div>
      {showForm && (
        <div className="formContainer">
        <form onSubmit={handleFormSubmit}>
          <h2 className="formHeading">Booking Form</h2>
          <p className="movieName">Movie Name: {show.name}</p>
          <label htmlFor="userName">Name:</label>
          <input type="text" id="userName" name="userName" required className="labelName" />
          <label htmlFor="userEmail">Email:</label>
          <input type="email" id="userEmail" name="userEmail" required className="labelName" />
          <label htmlFor="userNumber">Contact No:</label>
          <input type="text" id="userNumber" name="userNumber" required className="labelName" />
          
          <button type="submit" className="submitBtn commonBtn">Submit</button>
        </form>
        </div>
      )}
    </div>
    
  );
};

export default ShowSummary;