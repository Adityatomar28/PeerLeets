/**
 * Centralized Global Error Handling Middleware.
 * Captures thrown/forwarded exceptions and sends standardized JSON responses.
 * Prevents raw database crashes from leaking sensitive implementation details.
 */
export default (err, req, res, next) => {
  // Log details for server-side debugging
  console.error("Centralized Error Logged:", err);

  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Gracefully handle common Prisma database exceptions
  if (err.code) {
    switch (err.code) {
      case "P2002": // Unique constraint violation
        status = 409;
        message = "Unique constraint violation: A record with this unique value already exists";
        break;
      case "P2025": // Record not found
        status = 404;
        message = "Resource not found: The target database record does not exist";
        break;
      case "P2003": // Foreign key constraint violation
        status = 400;
        message = "Database reference error: A referenced parent record was not found";
        break;
      default:
        // Generic database exception handling
        status = 500;
        message = "A database processing error occurred";
        break;
    }
  }

  res.status(status).json({
    success: false,
    message,
  });
};
