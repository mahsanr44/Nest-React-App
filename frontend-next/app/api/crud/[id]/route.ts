import { query } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const result = (await query({
      query: "DELETE FROM todos WHERE id =?",
      values: [params.id],
    })) as ResultSetHeader;
    const newresult = result.affectedRows;
    return Response.json({
      result: newresult,
    });
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    // update todo with id number
    const { taskname } = await request.json();
    const result = (await query({
      query: "UPDATE todos SET taskname =? WHERE id =?",
      values: [taskname, params.id],
    })) as ResultSetHeader;
    const newresult = result.affectedRows;
    return Response.json({
      result: newresult,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: error,
    });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const result = (await query({
      query: "SELECT * FROM todos WHERE id =?",
      values: [params.id],
    })) as ResultSetHeader;
    return Response.json({
      result: result,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: error,
    });
  }
};
