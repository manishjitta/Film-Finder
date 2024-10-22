import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=e0ee85a6';


const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedTerm = useDebounce(searchTerm, 300);
    const [selectedMovie, setSelectedMovie] = useState(null); 

    const searchMovies = async (title) => {
        if (title) {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search || []); 
        }
    };

    useEffect(() => {
        if (debouncedTerm) {
            searchMovies(debouncedTerm);
        }
    }, [debouncedTerm]); 

    useEffect(() => {
        searchMovies('John Wick'); 
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie); 
    };

    const handleCloseDetail = () => {
        setSelectedMovie(null); 
    };

    return (
        <div className="app">
            <h1>Film Finder</h1>

            <div className="search">
                <input
                    placeholder="Search For Movies and Series"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {movies.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <button className="movie-button" onClick={() => handleMovieClick(movie)} key={movie.imdbID}>
                            <MovieCard movie={movie} />
                        </button>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No Movies found</h2>
                </div>
            )}

            {selectedMovie && (
                <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
            )}
        </div>
    );
};

export default App;
