import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";
import { User } from "../../auth/schemas/user.schema";



export class CreateBookDto {
    
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsString()
    readonly descriptions: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsEmpty({ message: "You cannot pass user id" })
    readonly user: User;
}
