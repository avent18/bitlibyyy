import express from 'express';
import { createShortUrl, redirectUrl, getMyUrls, deleteUrl } from '../controllers/url.controller.js';
import { isAuthenticated } from '../Middleware/isAuthenticated.js';


const urlRouter = express.Router();


urlRouter.post("/shorten", isAuthenticated,createShortUrl);
urlRouter.get("/:code", isAuthenticated, redirectUrl);
urlRouter.get("/my-urls",isAuthenticated, getMyUrls);
urlRouter.delete("/:id", isAuthenticated,deleteUrl);



export default urlRouter;