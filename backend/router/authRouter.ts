import express, { Router } from "express";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import { knex } from "../utils/knex";

const app = express();
const port = 3000;

export const authRouter = Router();
const authService = new AuthService(knex);

let authController = new AuthController(authService);

authRouter.post("/register", authController.register);

// Define the login route
app.post('/Login', (req:any, res:any) => {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // Perform the login logic
  if (email === 'admin@admin.com' && password === '123') {
    // If the login is successful, send a success response
    res.status(200).json({ message: 'Login successful' });
  } else {
    // If the login fails, send an error response
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});