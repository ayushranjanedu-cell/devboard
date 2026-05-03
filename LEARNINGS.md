# What I Learned This Week

## Day 1 - Raw Node.js
- HTTP server receives requests and sends responses
- req contains everything about the request
- res is used to send back data
- JSON.stringify converts objects to strings because HTTP only sends text

## Day 2 - Express
- Express removes the need for manual if/else routing
- Middleware runs between request and response
- next() passes the request to the next function
- Routes direct traffic, controllers do the work

## Day 3 - MongoDB
- MongoDB stores data as documents that look like JS objects
- Mongoose Schema is a blueprint for your data
- Data persists even after server restarts
- Task.find() gets all documents from a collection

## Day 4 - Authentication
- Passwords are hashed with bcrypt before storing
- JWT has 3 parts: Header.Payload.Signature
- protect middleware checks token before route runs
- req.user contains the logged in user's data

## Day 5 - WebSockets
- HTTP closes connection after response
- WebSocket keeps connection open permanently
- io.emit() broadcasts to all connected clients
- Real-time updates without page refresh

## Day 6 - Security
- Helmet adds security headers automatically
- Rate limiting prevents brute force attacks
- Validation rejects bad data before it hits controllers
- Global error handler catches everything in one place

## Week Summary
Built a complete backend API from scratch with:
- Authentication and authorization
- Real database with MongoDB
- Real-time features with WebSockets
- Production security layer