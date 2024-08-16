# Auth Boilerplate

This repository contains an authentication boilerplate built using Node.js, TypeScript, and Express. It includes robust authentication features like JWT and Bcrypt for secure password handling, OAuth login using GitHub and Google, email verification, password reset functionality, active device session management, and more. This boilerplate is designed to be easily integrated into modern applications.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Username and Password Login:** Secure authentication using JWT and Bcrypt.
- **OAuth Login:** Seamless login using GitHub and Google accounts.
- **Email Verification:** Email verification for new accounts using JWT and Nodemailer.
- **Password Reset:** Secure password reset functionality with JWT and Nodemailer.
- **Active Device Sessions:** Manage active device sessions for user accounts.
- **Input Validation:** Validation using Zod for robust input handling.
- **Database Integration:** MongoDB with Mongoose for data management.
- **TypeScript:** Fully typed using TypeScript for better development experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14 or later)
- MongoDB installed and running
- A GitHub account for OAuth setup
- A Google account for OAuth setup
