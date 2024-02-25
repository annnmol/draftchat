import { NextFunction, Request, Response } from "express";

const PORT = Number(process.env.PORT ?? 3005);

export async function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


export const healthCheckLogging = (request: Request, response: Response) => {
    console.log(
        `[Health Check] ---Server is running at PORT: ${PORT}`
    );
    response.send("Hello World!");
    response.end();
};

export const errorHandlingLogging = (request: Request, response: Response) => {
    const error = new Error("route not found");
    console.error(`Route not found`);
    response.status(404).json({
        message: error.message,
    });
};

export const incomingRequestLogging = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.info(
        `REQUEST METHOD: [${request.method}] - URL: [${request.url
        }] - BODY: ${JSON.stringify(request.body)}`
    );

    response.on("finish", () => {
        console.info(
            `RESPONSE METHOD: [${request.method}] - URL: [${request.originalUrl}] - STATUS: [${response.statusCode}]`
        );
    });

    next();
};