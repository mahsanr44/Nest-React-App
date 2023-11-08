import { query } from "@/lib/db";
import { ResultSetHeader } from "mysql2"; // Import the required type

export async function POST(request: Request) {
  try {
    const { taskname } = await request.json();
    const updateTasks = (await query({
      query: "INSERT INTO todos (taskname) VALUES (?)",
      values: [taskname],
    })) as ResultSetHeader;

    const result = updateTasks.affectedRows;
    return Response.json({
      message: "Task successfully Added",
      data: taskname,
    });
  } catch (error) {
    console.log("errrr", error);
    return Response.json({
      error: error,
    });
  }
}

export const GET = async (request: Request) => {
  // get all tasks
  try {
    const result = await query({
      query: "SELECT * FROM todos",
      values: [],
    });

    return Response.json({
      result: result,
    });
  } catch (error) {
    return Response.json({
      error: error,
    });
  }
};

export const DELETE = async () => {
  try {
    const result = (await query({
      query: "DELETE FROM todos",
      values: [],
    })) as ResultSetHeader;
    const newresult = result.affectedRows;

    console.log(newresult);
    return Response.json({
      result: newresult,
    });
  } catch (error) {
    return Response.json({
      error: error,
    });
  }
};
