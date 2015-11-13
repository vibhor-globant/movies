import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

var movies_str = document.getElementById("movie-data").innerHTML;
var movies = JSON.parse(movies_str)
var totalPages = document.getElementById("total-pages-data").innerHTML;
ReactDOM.render(<App allMovies={movies} totalPages={totalPages}/>, document.getElementById("app"));
