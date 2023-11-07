module.exports = (sequelize: { define: (arg0: string, arg1: { taskname: { type: any; }; }) => any; }, Sequelize: { STRING: any; }) => {
    const Task = sequelize.define("todos", {
      taskname: {
        type: Sequelize.STRING,
      },
    });
  
    return Task;
  };