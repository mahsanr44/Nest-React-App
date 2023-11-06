import { IsNotEmpty, IsString, Validate } from "class-validator";
import { IsUnique } from "src/shared/validation/is-unique";
import { IsUniqueConstrant } from "src/shared/validation/is-unique-constrant";

export class CreateTodoDto {

  @IsString()
  @IsNotEmpty()
  // @Validate(IsUniqueConstrant)
  @IsUnique({tableName: "todos", column: "taskname"})
  taskname: string;

}
