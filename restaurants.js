import connectDb from "./connectDb.js";

export function getAllRestaurants(req, res) {
  const db = connectDb();
  db.collection("restaurants")
    .get()
    .then((snapshot) => {
      const restaurantArray = snapshot.docs.map((doc) => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        return restaurant;
      });
      res.send(restaurantArray);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function getRestaurantById(req, res) {
  const { restaurantId } = req.params;
  if (!restaurantId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("restaurants")
    .doc(restaurantId)
    .get()
    .then((doc) => {
      let restaurant = doc.data();
      restaurant.id = doc.id;
      res.send(restaurant);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function deleteRestaurant(req, res) {
  const { restaurantId } = req.params;
  if (!restaurantId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("restaurants")
    .doc(restaurantId)
    .delete()
    .then((doc) => {
      res.send("Item deleted.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export async function addRestaurant(req, res) {
  
  if (!req.body || !req.body.name || !req.body.address) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();

  const newRestaurant = {
      name: req.body.name,
      address: req.body.address,
      rating: req.body.rating || 3.5,
      cuisine: req.body.cuisine || 'unknown'
  }
try{
  const doc = await db.collection("restaurants").add(newRestaurant)
    res.status(201).send('Restaurant Created: ' + doc.id)
} catch (err){ res.status(500).send(err)}
}








export function updateRestaurant(req, res) {
  const { restaurantId } = req.params;
  if (!restaurantId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("restaurants")
    .doc(restaurantId)
    .update(req.body)
    .then((doc) => {
      res.send("Item Updated.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
