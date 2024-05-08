import express from "express";
import cors from "cors";
import morgan from "morgan";

import productRoutes from "./routes/products.routes.js";
import categoryRoutes from "./routes/categoria.routes.js"
import proveedorRoutes from "./routes/proveedor.routes.js"
import facturaRoutes from "./routes/factura.routes.js"
import empleadoRoutes from "./routes/empleado.routes.js"
import clienteRoutes from "./routes/cliente.routes.js"
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/cliente",clienteRoutes);

app.use("/producto",productRoutes);

app.use("/categoria",categoryRoutes);

app.use("/proveedor",proveedorRoutes);

app.use("/factura",facturaRoutes);

app.use("/empleado",empleadoRoutes)


export default app;