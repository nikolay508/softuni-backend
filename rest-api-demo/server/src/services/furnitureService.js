import Furniture from "../models/Furniture.js";
import querystring from 'querystring';

const furnitureService = {
  getAll(filter = {}){
    const query = Furniture.find();
    
    if(filter.where){
        const qs = querystring.parse(filter.where.replaceAll('"', ''));
        query.find(qs);
    }
    return query;
  },
  getOne(furnitureId){
    return Furniture.findById(furnitureId);
  },
  create(furnitureData, userId){
    return Furniture.create({...furnitureData, _ownerId: userId});
  },
  delete(furnitureId){
    return Furniture.findByIdAndDelete(furnitureId);
  },
  update(furnitureId, furnitureData){
    return Furniture.findByIdAndUpdate(furnitureId, furnitureData, {runValidators: true});
  }
}

export default furnitureService;