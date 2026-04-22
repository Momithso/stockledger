import express from "express";
import { OpenAPIV3_1 } from 'openapi-types';

export interface RouterRoute {
    router: express.Router;
    docs?: OpenAPIV3_1.PathsObject;
}