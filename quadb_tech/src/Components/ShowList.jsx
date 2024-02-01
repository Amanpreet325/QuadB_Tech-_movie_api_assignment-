import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ShowList = () => {
  const myRef = useRef();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await response.json();
        setShows(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        console.log('load');
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="container">
      <h1>SHOW LIST</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {shows.map((show) => (
            <div key={show.show.id} className="col-md-4 mb-4">
              <div className="card" style={{ width: '18rem' }}>
                {show.show.image ? (
                  <img className="card-img-top" src={show.show.image.medium} alt={show.show.name} />
                ) : (
                  <div className="noImage card-img-top">No Image Available</div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{show.show.name}</h5>
                  <p className="card-text">{/* Additional information here if needed */}</p>
                  <Link to={`/show/${show.show.id}`} className="btn btn-primary">
                    Go to Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div ref={myRef}>Example Component</div>
    </div>
  );
};

export default ShowList;
