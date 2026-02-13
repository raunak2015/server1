const express = require("express");

const app = express();

app.use(express.json());

const data = [
{
"id": 1,
"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
"price": 109.95,
"category": "mens clothing",
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
"rating": {
"rate": 3.9,
"count": 120
}
},
{
"id": 2,
"title": "Mens Casual Premium Slim Fit T-Shirts ",
"price": 22.3,
"category": "mens clothing",
"image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
"rating": {
"rate": 4.1,
"count": 259
}
},
{
"id": 3,
"title": "Cotton Jacket",
"price": 55.99,
"category": "womens clothing",
"image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
"rating": {
"rate": 4.7,
"count": 500
}
}]

app.get("/all", (req, res) => {
  res.send(data);
});

app.get("/products/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = data.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "Invalid product id!!" });
  }

  res.status(200).json(user);
});




app.post("/product", (req, res) => {
  const newProduct = {
    id: data.length + 1,
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    rating:{
        rate: req.body.rate,
        count: req.body.count
    }
  };

  data.push(newProduct);

    res.status(201).json({
    message: "Product created",
    product: newProduct
  });
});


app.get("/category/:type", (req, res) => {
  const type = (req.params.type).toLocaleLowerCase();
  const product = data.filter(p => p.category.toLocaleLowerCase() === type);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  res.status(200).json(product);
});


app.post("/products", (req, res) => {

   const newProduct = req.body;
 
   data.push(...newProduct);

   res.status(201).json({
      message: "Product added successfully",
      product: newProduct
   });

});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});