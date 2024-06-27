// Imports
// ========================================================
import { NextResponse, type NextRequest } from "next/server";

// Config CORS
// ========================================================
// /**
//  *
//  * @param origin
//  * @returns
//  */
const getCorsHeaders = (origin: string) => {
  // Default options
  const headers = {
    "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
    "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
    "Access-Control-Allow-Origin": `${process.env.DOMAIN_URL}`,
  };

  // If no allowed origin is set to default server origin
  if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

  // If allowed origin is set, check if origin is in allowed origins
  const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

  // Validate server origin
  if (allowedOrigins.includes("*")) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  // Return result
  return headers;
};

// Endpoints
// =========================================================
/**
 * Basic OPTIONS Request to simuluate OPTIONS preflight request for mutative requests
 */
export const OPTIONS = async (request: NextRequest) => {
  // Return Response
  return NextResponse.json(
    {},
    {
      status: 200,
      // headers: getCorsHeaders(request.headers.get("origin") || ""),
    }
  );
};

/**
 * Basic GET Request to simuluate LIST in LCRUD
 * @param request
 * @returns
 */
export const GET = async (request: NextRequest) => {
  // Return Response
  const resp = await fetch("https://soldic.xyz/api/extension/sentenceParser");
  const data = await resp.json();
  return NextResponse.json(
    {
      data
    },
    {
      status: 200,
      // headers: getCorsHeaders(request.headers.get("origin") || ""),
    }
  );
};

export const POST = async (request: NextRequest) => {
  // Get JSON payload
  const data = await request.json();
  console.log("data", data);

  // Return Response
  return NextResponse.json(
    {
      data,
    },
    {
      status: 200,
      // headers: getCorsHeaders(request.headers.get("origin") || ""),
    }
  );
};