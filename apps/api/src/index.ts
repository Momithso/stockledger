import express from "express";
import fs from 'fs'
import mainRoutes from './routes/routes'
import { database, system } from "./utils/logger";
import cors from "cors"
import helmet from "helmet";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {userModel} from "./models/user.model";
import {signJwt} from "./utils/jwt";
import {JwtPayloadUser} from "./interfaces/authenticate.type";

export const app = express();
export const PORT = process.env.PORT || 3000;
export const rootPath = process.cwd();

const mongoHost = process.env.MONGO_HOST || "localhost";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoDatabase = process.env.MONGO_DATABASE || "stockledger";
const mongoUsername = process.env.MONGO_ROOT_USERNAME || "root";
const mongoPassword = process.env.MONGO_ROOT_PASSWORD || "password";

/**
 * Start server
 */
async function start() {
  try {

    /**
     * Connect to database
     */
    database.info('Connecting to MongoDB');
    let connected = false;
    for (let i = 0; i < 3; ++i) {
      try {
        await mongoose.connect(
            `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`,
            {
              authSource: "admin",
              user: mongoUsername,
              pass: mongoPassword,
            }
        )
        connected = true;
        break;
      } catch (error) {
        database.error('Error connecting to MongoDB', error)
        database.info(`Attempt ${i+1}: Trying to reconnect to MongoDB`)
      }
    }

    if (!connected) {
      system.error('Starting API Failed: max reconnects to MongoDB reached');
      process.exit(1);
      return;
    }

    database.info('Connected to MongoDB');

    /**
     * Read JWT Keys
     */
    const privateKey = fs.readFileSync(rootPath + "/jwtES512.key", "utf-8");
    const publicKey = fs.readFileSync(rootPath + "/jwtES512.key.pub", "utf-8");
    app.locals.jwt = { privateKey, publicKey };
    system.info('JWT Keys loaded');

    /**
     * Create root user if not exists
     */
    let rootUser = await userModel.findOne({ email: process.env.ROOT_EMAIL || "root@example.com" });
    if (!rootUser) {
      const hashedPassword = await bcrypt.hash(process.env.ROOT_PASSWORD || "password", 10);
      const newRootUser = new userModel({
        name: process.env.ROOT_USERNAME || "root",
        email: process.env.ROOT_EMAIL || "root@example.com",
        password: hashedPassword,
        permissions: true
      });
      rootUser = await newRootUser.save();
      system.info('Root user created');
    } else {
      system.info('Root user already exists');
    }

    /**
     * Print jwt token for root user
     */
    const jwtPayload: JwtPayloadUser = {
        type: "user",
        _id: rootUser._id.toString(),
        email: rootUser.email
    };
    const token = signJwt(jwtPayload, app.locals.jwt.privateKey, '1d');
    system.info(`JWT Token for root user: ${token} (expires in 1 day)`);

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
    app.use('/api', mainRoutes);
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