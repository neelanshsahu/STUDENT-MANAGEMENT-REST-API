const express = require("express");

const logger = require("./middleware/logger");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

const PORT = 3000;


// ==========================================
// MIDDLEWARE
// ==========================================

// Parse incoming JSON data
app.use(express.json());

// Custom Logger Middleware
app.use(logger);


// ==========================================
// ROUTES
// ==========================================

app.use("/students", studentRoutes);


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Student Management REST API"
    });
});


// ==========================================
// 404 ERROR HANDLER
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});