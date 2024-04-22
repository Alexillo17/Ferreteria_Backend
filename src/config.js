import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const DB_USER = process.env.DB_USER || "Alex"; //Aqui pone tu user
export const DB_PASSWORD = process.env.DB_PASSWORD || "123"; //Aqui la contra del use de sql
export const DB_SERVER = process.env.DB_SERVER || "DESKTOP-A9P6KHA";
export const DB_DATABASE = process.env.DB_DATABASE || "BDFerreteria1";