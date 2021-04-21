import { Console } from "winston/lib/winston/transports";

const bodyParser = require("body-parser");
const app = require("express")();
const winston = require("winston");
app.use(bodyParser.json());

export const CreateLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "./Error-logs/" + "error.log",
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});
app.post("/generateerrorlog", async (req, res) => {
  try {
    const logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: "./Error-logs/" + "error.log",
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.timestamp(),
            winston.format.json()
          ),
        }),
      ],
    });
    const consoler = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });

    if (req.query.error) {
      await logger.error({
        error: req.query.error,
        metaInformation: req.rawHeaders,
      });
      await consoler.error(`${req.query.error}`);
    }
    res.send({
      success: true,
      message: `log file generated successfully`,
    });
  } catch (error) {
    console.log("error", error);
    res.send({
      success: false,
      message: `error: ${error}`,
    });
  }
});

module.exports = app;
