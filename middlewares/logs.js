import fs from "fs";
import path from "path";

const logData = (req, res, next) => {
  // Get the current working directory of the Node.js process
  const cwd = process.cwd();

  // Resolve the absolute path to the log file
  const logFilePath = path.resolve(cwd, "logs", "restaurant_logs.txt");

  // Create log message headers with current date and time in ISO format
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}  ${
    req.headers["user-agent"]
  } ${req.ip} ${res.statusCode}\n`;

  // Append log message to log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file : ", err);
    }
  });

  next();
};

export { logData };
