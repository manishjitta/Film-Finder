import React, { useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.png'
import './MovieDetail.css'; 

const API_URL = 'http://www.omdbapi.com/?apikey=e0ee85a6'; 

const MovieDetail = ({ movie, onClose }) => {
    const [details, setDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`${API_URL}&i=${movie.imdbID}`);
                const data = await response.json();
                setDetails(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movie]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!details) {
        return <div>No details found.</div>; 
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <div className="movie-detail">
                    <img
                        src={details.Poster !== 'N/A' ? details.Poster : placeholder}
                        alt={details.Title}
                        className="movie-poster"
                    />
                    <div className="movie-info">
                        <h2>{details.Title}</h2>
                        <p><strong>IMDb Rating:</strong> {details.imdbRating}</p>
                        <p><strong>Year:</strong> {details.Year}</p>
                        <p><strong>Genre:</strong> {details.Genre}</p>
                        <p><strong>Director:</strong> {details.Director}</p>
                        <p><strong>Actors:</strong> {details.Actors}</p>
                        <p><strong>Plot:</strong> {details.Plot}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
