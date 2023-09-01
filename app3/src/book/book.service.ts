import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>
  ) {}

  async create(createBookDto: CreateBookDto, user: User): Promise<Book> {

    const data = Object.assign(createBookDto, {user: user._id});
    const book = await this.bookModel.create(createBookDto);
    return book;
  }

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage*(currentPage-1);
    
    const keyword = query.keyword ? {
      title: {
        $regex: query.keyword,
        $options: 'i'
      }
    } : {}
    const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
    return books;
  }

  async findOne(id: string): Promise<Book> {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestException('Please enter correct Id');
      }
      const data = await this.bookModel.findById(id);
      if (!data) {
        throw new NotFoundException('Book not found');
      }
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestException('Invalid Id Book');
      }
      const data = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
        new: true,
        runValidators: true
      });
      if (!data) {
        throw new NotFoundException('Book not found');
      }
      return data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string): Promise<Book> {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestException('Invalid Id Book');
      }
      const data = await this.bookModel.findByIdAndDelete(id);
      if (!data) {
        throw new NotFoundException('Book not found');
      }
      return data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
