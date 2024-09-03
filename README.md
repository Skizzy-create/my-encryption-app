# My Encryption App

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Mongoose](https://img.shields.io/badge/Mongoose-6.x-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-Vue.js-orange)

## Overview

My Encryption App is a web application designed to provide users with a secure and user-friendly way to encrypt and decrypt messages. Users can select an encryption algorithm, enter a message, and receive an encrypted string. The app also offers the ability to generate a QR code containing the encrypted data and the algorithm used, which can be decrypted by scanning through the website.

## Features

- **User Authentication:** Secure login and registration with JWT-based authentication.
- **Message Encryption:** Choose from various algorithms to encrypt messages.
- **QR Code Generation:** Generate a QR code with encrypted data and algorithm details.
- **Message Decryption:** Decrypt messages using the selected algorithm or by scanning the QR code.
- **File Encryption (Upcoming in v1.1):** Encrypt and decrypt files securely.

## Getting Started

### Backend

The backend of this application is built using Node.js, Express, and Mongoose, and is written in TypeScript. It handles user authentication, encryption/decryption logic, and database interactions.

#### How to Run the Backend

1. **Navigate to the Backend Directory:**
   ```bash
   cd backend
   ```
2. **Compile TypeScript:**
   ```bash
   tsc -b
   ```
3. **Run the Server:**
   ```bash
   cd dist
   node server.js
   ```

For detailed technical documentation on the backend, visit the [Backend Documentation](./backend/README.md).

### Frontend

The frontend is built with Vue.js and is responsible for the user interface, including the input forms, displaying encrypted messages, and scanning QR codes.

#### How to Run the Frontend

1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend
   ```
2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

For detailed technical documentation on the frontend, visit the [Frontend Documentation](./frontend/README.md).

## Project Structure

```plaintext
my-encryption-app/
│
├── backend/
│   ├── dist/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── .gitignore
└── README.md (this file)
```

## License

This project is licensed under the MIT License.
