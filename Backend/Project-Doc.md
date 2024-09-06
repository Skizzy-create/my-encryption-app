### README for Encryption Web Application

---

#### Project Overview

This web application allows users to select an encryption algorithm, encrypt any message, and receive an encrypted string along with a QR code. The QR code will contain all the necessary information (data and algorithm used), and when scanned, it can be decrypted through the website. Users can also decrypt messages directly on the website. This project will be built using TypeScript, Express, Mongoose, and several other libraries to handle encryption, QR code generation, and authentication.

---

#### Project Structure
###### BACKEND
```plaintext
backend/
│
├── src/
│   ├── models/
│   │   ├── User.ts                       // Defines the User schema and model
│   │   ├── Message.ts                    // Defines the Message schema and model for storing encrypted messages
│   │   ├── QRCode.ts                     // Defines the QRCode schema and model for storing QR code data
│   │   └── File.ts                       // New: Model to store file metadata (optional)
│   │
│   ├── routes/
│   │   ├── authRoutes.ts                 // Authentication-related routes (e.g., /login, /register)
│   │   ├── encryptionRoutes.ts           // Routes related to message encryption (e.g., /encrypt)
│   │   ├── decryptionRoutes.ts           // Routes related to message decryption (e.g., /decrypt)
│   │   └── fileRoutes.ts                 // New: Routes for file encryption and decryption
│   │
│   ├── services/
│   │   ├── encryptionService.ts          // Contains business logic for encrypting messages
│   │   ├── decryptionService.ts          // Contains business logic for decrypting messages
│   │   ├── qrCodeService.ts              // Handles QR code generation and scanning
│   │   ├── fileEncryptionService.ts      // New: Contains business logic for file encryption and decryption
│   │   └── authService.ts                // Handles user authentication logic, including JWT creation
│   │
│   ├── utils/
│   │   ├── jwtUtils.ts                   // Utility functions for handling JWTs (token creation, verification)
│   │   ├── encryptionUtils.ts            // Helper functions for various encryption algorithms
│   │   ├── decryptionUtils.ts            // Helper functions for various decryption algorithms
│   │   └── fileUtils.ts                  // New: Utility functions for handling file uploads, etc.
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts             // Middleware for protecting routes that require authentication
│   │   ├── errorMiddleware.ts            // Middleware for handling errors across the application
|   |   ├── userExistsMiddleware.ts       // New: Middleware to check if a user exists in the database
│   │   └── fileUploadMiddleware.ts       // New: Middleware for handling file uploads (using Multer)
│   │
│   └── server.ts                         // Configures and starts the server
│
├── package.json                          // Dependencies and scripts for the backend
├── tsconfig.json                         // TypeScript configuration
├── .env                                  // Environment variables (e.g., DB connection string, JWT secret)
└── README.md                             // Documentation for the backend setup and usage

```

---

#### Project Plan

##### 1. **Project Setup**
   - **Install Dependencies**
     - `express` - Web framework.
     - `mongoose` - ORM for MongoDB.
     - `jsonwebtoken` - For handling JWTs.
     - `bcryptjs` - For hashing passwords.
     - `crypto` - For encryption and decryption.
     - `qrcode` - For generating QR codes.
     - `dotenv` - For environment variables.
     - `typescript` - TypeScript support.
     - `nodemon` - For auto-reloading during development.
     - `cors` - For handling CORS.
     - `body-parser` - For parsing incoming request bodies.
   - **Configure TypeScript**
     - Initialize TypeScript and configure `tsconfig.json` for the project.
   - **Initialize Express Server**
     - Setup basic Express server in `server.ts`.
   - **Connect to MongoDB**
     - Setup Mongoose connection to MongoDB in `database.js`.

##### 2. **User Authentication**
   - **Create User Model**
     - Fields: `email`, `firstName`, `lastName`, `password`, `createdAt`.
   - **Create Authentication Routes**
     - **Register**
       - Method: `POST /api/auth/register`
       - Requires: `email`, `firstName`, `lastName`, `password`, `createdAt`.
       - Action: Hash password using `bcrypt`, save user to DB, return JWT.
     - **Login**
       - Method: `POST /api/auth/login`
       - Requires: `email`, `password`.
       - Action: Validate user, return JWT.
   - **Authentication Middleware**
     - Middleware to protect routes and verify JWT.

##### 3. **Encryption & Decryption**
   - **Encryption Service**
     - **encryptMessage(algorithm: string, message: string)**
       - Utilizes `crypto` library.
       - Encrypts the message based on the selected algorithm.
       - Supported algorithms: `AES`, `RSA`, `DES`.
   - **Decryption Service**
     - **decryptMessage(algorithm: string, encryptedMessage: string)**
       - Decrypts the message based on the algorithm used.
   - **Encryption Routes**
     - **Encrypt Route**
       - Method: `POST /api/encrypt`
       - Requires: `algorithm`, `message`.
       - Action: Encrypt message and return the encrypted string.
   - **Decryption Routes**
     - **Decrypt Route**
       - Method: `POST /api/decrypt`
       - Requires: `algorithm`, `encryptedMessage`.
       - Action: Decrypt message and return the original message.

##### 4. **QR Code Generation & Scanning**
   - **QR Code Service**
     - **generateQRCode(data: string)**
       - Utilizes `qrcode` library.
       - Generates a QR code from the encrypted message and algorithm.
   - **QR Code Routes**
     - **Generate QR Code Route**
       - Method: `POST /api/qrcode`
       - Requires: `data` (encrypted message + algorithm).
       - Action: Generates QR code, returns as base64 string.
     - **Scan QR Code Route**
       - Method: `POST /api/scan`
       - Requires: `qrData` (base64 string of the QR code).
       - Action: Decrypt the data and return the original message.

## 5. Past Messages

### Message Model

#### Schema for Past Encrypted Messages
* **Fields:**
    * `userId`: The ID of the user who sent the message.
    * `originalMessage`: The original, unencrypted message.
    * `encryptedMessage`: The encrypted message.
    * `algorithm`: The encryption algorithm used.
    * `createdAt`: The timestamp of when the message was created.

#### Schema for Past Decrypted Messages
* **Fields:**
    * `userId`: The ID of the user who sent the message.
    * `originalMessage`: The original, unencrypted message.
    * `dencryptedMessage`: The decrypted message.
    * `algorithm`: The decryption algorithm used.
    * `createdAt`: The timestamp of when the message was created.

### Past Messages Route
* **Method:** `GET /api/messages`
* **Requires:** Authenticated user.
* **Action:** Fetch and return all past encrypted messages for the user.

##### 6. **Frontend Development**
   - **Landing Page**
     - Develop a responsive landing page using HTML, CSS, and JavaScript/React.
     - Display sections for encryption, decryption, and QR code generation.
   - **Encryption & Decryption Interface**
     - Form to select algorithm and input message for encryption.
     - Display encrypted message and QR code.
   - **QR Code Scanner**
     - Interface for users to scan QR codes and display decrypted messages.
   - **Past Messages**
     - Display user’s past encrypted messages and QR codes.

##### 7. **Deployment**
   - **Backend**
     - Deploy the Express application to platforms like Heroku or Vercel.
   - **Frontend**
     - Host the frontend on Netlify, Vercel, or similar platforms.
   - **Environment Variables**
     - Store all sensitive keys and configurations in `.env` files.
     - Ensure secure handling of JWT secrets, MongoDB URI, etc.

---

#### Libraries Used

- **Express**: Web framework for handling routes and middleware.
- **Mongoose**: MongoDB ORM for modeling application data.
- **JWT (jsonwebtoken)**: For authentication and authorization via JWTs.
- **BcryptJS**: For securely hashing user passwords.
- **Crypto**: Built-in Node.js module for encryption and decryption.
- **QRCode**: For generating QR codes.
- **TypeScript**: Type checking and enhancing JavaScript code.
- **Dotenv**: Managing environment variables.
- **Cors**: Handling Cross-Origin Resource Sharing.
- **Body-Parser**: Parsing incoming request bodies.
- **Nodemon**: For automatic server restarts during development.

---

### Development Notes

- **Testing**
  - Ensure to write unit tests for encryption, decryption, and QR code generation services.
  - Use tools like Jest or Mocha for testing.

- **Security**
  - Ensure secure handling of user data and encryption keys.
  - Regularly update dependencies to avoid security vulnerabilities.

- **Scalability**
  - Consider using a load balancer and database sharding if the application scales up.

---

#### Future Enhancements

- **File Encryption**: Integrate libraries like `crypto` or `node-forge` for file encryption/decryption.
- **Advanced Encryption Algorithms**: Add support for more complex encryption algorithms.
- **User Management**: Add user roles, multi-factor authentication (MFA), etc.
- **Analytics**: Track encryption/decryption usage and provide insights to users.

---

This plan outlines the step-by-step approach to building the encryption web application. Follow each step to ensure a smooth development process, and remember to keep the code modular and well-documented.
