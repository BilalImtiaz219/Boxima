import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import orderRouter from "./routes/shoppingOrderRoutes.js";
import deliveryRouter from "./routes/deliveryRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import { authentication } from "./middleware/middleware.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

dotenv.config();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://boxima.netlify.app",
    credentials: true,
  })
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Registering routes
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/orders", orderRouter);
app.use("/api/deliveries", deliveryRouter);
app.use("/api/carts", cartRouter);

connectDB();

// Export the app for Vercel to use
export default app;
