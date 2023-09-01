import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schemas/user.schema";


export enum Category {
    ADVENTURE = 'Adventure',
    CLASSIC = 'Classic',
    CRIME = 'CRIME',
    FANTASY = 'Fantasy',
}

@Schema({timestamps: true})
export class Book {
    @Prop()
    title: string;

    @Prop()
    descriptions: string;

    @Prop()
    author: string;

    @Prop()
    price: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
    
}

export const BookSchema = SchemaFactory.createForClass(Book)
