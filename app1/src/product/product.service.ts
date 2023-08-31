import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductSchema, ProductDocument } from './schemas/product.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) public model: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    var model = new this.model(createProductDto);
    let data = await model.save();
    return data;
  }

  async findAll() {
    let data = await this.model.find()
    return data;
  }

  async findOne(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new NotFoundException('Invalid ProductID');
      }
      let data = await this.model.findById(id);
      if (!data) {
        throw new NotFoundException('Product not found');
      }
      return data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new NotFoundException('Invalid Product ID');
      }
      let data = await this.model.findByIdAndUpdate(id, updateProductDto, {
        new: true,
        runValidators: true,
      });
      if (!data) {
        throw new NotFoundException('Product not found');
      }
      return data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new NotFoundException('Invalid Product ID');
      }
      let data = await this.model.findByIdAndDelete(id);
      if (!data) {
        throw new NotFoundException('Product not found');
      }
      return data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}
