import { Schema, model, Types } from "mongoose";

const JobSchema = new Schema({
  user:{type:Types.ObjectId,ref:"User",required:true},
  title:{type:String,required:true},
  company:{type:String,default:""},
  description:{type:String,required:true},
  location:{type:String,default:""},
},{timestamps:true});

export default model("Job",JobSchema);
