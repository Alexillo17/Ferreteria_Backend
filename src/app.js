import express from "express";
import cors from "cors";
import morgan from "morgan";

import productRoutes from "./routes/products.routes.js";
import categoryRoutes from "./routes/categoria.routes.js"
import proveedorRoutes from "./routes/proveedor.routes.js"
import facturaRoutes from "./routes/factura.routes.js"

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", productRoutes,categoryRoutes,proveedorRoutes,facturaRoutes);


export default app;