import express, { json, Request, Response } from "express";
import fs from 'fs'
import mainRoutes from './routes/routes'
import { api, database, system } from "./utils/logger";
import cors from "cors"
import helmet from "helmet";
import mongoose from "mongoose";

export const app = express();
export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.MONGO_URI || "<>";
export const rootPath = process.cwd();

/**
 * Start server
 */
async function start() {
  try {

    /**
     * Connect to database
     */
    database.info('Connecting to MongoDB');
    await mongoose.connect(DB_URI);
    database.info('Connected to MongoDB');

    /**
     * Create collections
     */

    /**
     * Read JWT Keys
     */
    const privateKey = fs.readFileSync(rootPath + "/jwtRS256.key", "utf-8");
    const publicKey = fs.readFileSync(rootPath + "/jwtRS256.key.pub", "utf-8");
    app.locals.jwt = { privateKey, publicKey };
    system.info('JWT Keys loaded');

    /**
     * Middlewares
     */
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded());

    /**
     * Main Router
     */
    app.use('/api/v1', mainRoutes);
    system.info("Routes loaded")

    /**
     * Listener
     */
    app.listen(PORT, () => {
      system.info(`App listening on port ${PORT}`);
    });
  } catch (err) {
    system.error('Starting API Failed:', err);
    process.exit(1);
  }
}
await start();