import express from 'express';
import cors from 'cors';
import {getAllRestaurants, getRestaurantById, updateRestaurant, addRestaurant, deleteRestaurant} from './restaurants.js' ;

const app = express();
app.use(cors());
app.use(express.json())





//ROUTES

app.get('/restaurants', getAllRestaurants);
app.get('/restaurants/:restaurantId', getRestaurantById)
app.patch('/restaurants/:restaurantId', updateRestaurant)
app.post('/restaurants', addRestaurant)
app.delete('/restaurants/:restaurantId', deleteRestaurant)

app.listen(3030, () => {
    console.log('Now listening on http://localhost:3030...');
});