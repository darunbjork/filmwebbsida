import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movie-form');
    const movieIdInput = document.getElementById('movie-id');
    const moviesTableBody = document.getElementById('movies-table-body');
    const cancelEditButton = document.getElementById('cancel-edit');

    const refreshMovies = async () => {
        const movies = await getMovies();
        moviesTableBody.innerHTML = '';
        movies.forEach(movie => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${movie.title}</td>
                <td>${movie.year}</td>
                <td>${movie.director}</td>
                <td>
                    <button class="edit-btn" data-id="${movie._id}">Redigera</button>
                    <button class="delete-btn" data-id="${movie._id}">Radera</button>
                </td>
            `;
            moviesTableBody.appendChild(row);
        });
    };

    const resetForm = () => {
        movieForm.reset();
        movieIdInput.value = '';
    };

    movieForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const movieData = {
            title: document.getElementById('title').value,
            year: document.getElementById('year').value,
            director: document.getElementById('director').value,
            genre: document.getElementById('genre').value.split(',').map(g => g.trim()),
            rating: document.getElementById('rating').value,
            imageUrl: document.getElementById('imageUrl').value,
            description: document.getElementById('description').value,
        };

        const movieId = movieIdInput.value;

        if (movieId) {
            await updateMovie(movieId, movieData);
        } else {
            await createMovie(movieData);
        }

        resetForm();
        await refreshMovies();
    });

    moviesTableBody.addEventListener('click', async (e) => {
        const target = e.target;
        const movieId = target.dataset.id;

        if (target.classList.contains('delete-btn')) {
            if (confirm('Är du säker på att du vill radera den här filmen?')) {
                await deleteMovie(movieId);
                await refreshMovies();
            }
        }

        if (target.classList.contains('edit-btn')) {
            const movieData = await getMovieById(movieId);
            if (movieData) {
                document.getElementById('movie-id').value = movieData._id;
                document.getElementById('title').value = movieData.title;
                document.getElementById('year').value = movieData.year;
                document.getElementById('director').value = movieData.director;
                document.getElementById('genre').value = movieData.genre.join(', ');
                document.getElementById('rating').value = movieData.rating;
                document.getElementById('imageUrl').value = movieData.imageUrl;
                document.getElementById('description').value = movieData.description;
            }
        }
    });

    cancelEditButton.addEventListener('click', () => {
        resetForm();
    });

    refreshMovies();
});
