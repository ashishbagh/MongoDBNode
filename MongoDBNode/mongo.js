const { MongoClient, ServerApiVersion } = require("mongodb");
const url =
  "mongodb+srv://usename:password@practice.sgnnn.mongodb.net/retails?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const db = client.db();
    //wait for the collection to create the new product
    // and then close connection
    await db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  }
  client.close();
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  let products;
  try {
    await client.connect();
    const db = client.db();
    //wait for the collection to create the new product
    // and then close connection
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Coundn't retrive products" });
  }

  client.close();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
