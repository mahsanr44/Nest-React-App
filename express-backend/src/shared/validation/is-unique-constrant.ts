import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsUniqueConstraintInput } from "./is-unique";
import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({name:'IsUniqueConstraint', async: true})
@Injectable()
export class IsUniqueConstrant implements ValidatorConstraintInterface{
    
    constructor(private readonly entityManager:EntityManager){}
    
    async validate(
        value: any, 
        validationArguments: ValidationArguments
        ): Promise<boolean> {

            const {tableName, column}:IsUniqueConstraintInput=validationArguments.constraints[0];

            const exist = await this.entityManager
            .getRepository(tableName )
            .createQueryBuilder(tableName)
            .where({[column]:value})
             .getExists();

            console.log(exist)
            
            return exist ? false:true;
        }
    
    defaultMessage?(validationArguments?: ValidationArguments): string{
        return 'The Record You Enter is Already Exist!';
    }
} 