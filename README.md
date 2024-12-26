# Final-Lab
This repo is the final lab exam of web development

# Library Management System

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![MongoDB](https://img.shields.io/badge/MongoDB-Connected-green.svg)](https://www.mongodb.com)
[![Node.js](https://img.shields.io/badge/Node.js-v16.13.1-blue.svg)](https://nodejs.org/)

A full-stack Library Management System built with **Node.js**, **Express**, and **MongoDB**. This system manages **books**, **authors**, and **borrowers** along with the **borrowing process**, adhering to real-world library management challenges.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete for books, authors, and borrowers.
- **Business Logic**: 
  - Limit on borrowed books based on membership type.
  - Ensure borrowing rules based on book availability.
  - Author limit on books (max 5 books per author).
- **Database Integration**: MongoDB for storing data.

## Table of Contents
- [Installation](#installation)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [License](#license)

---

## Installation

### Prerequisites:
- **Node.js** - Make sure Node.js is installed. You can check if it’s installed by running:
  ```bash
  node -v

