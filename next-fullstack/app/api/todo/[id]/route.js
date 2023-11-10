export const DELETE = async (req, { params }) => {
  try {
    console.log(req, "request");
    console.log("params", params);
    console.log(params.id, "id");

    return Response.json({
      Message: "Success",
      Params_Id: params.id,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: error.message,
    });
  }
};
