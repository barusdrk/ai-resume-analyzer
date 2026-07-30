import { Schema, model, Types } from "mongoose";

const ApplicationSchema = new Schema({
  user:{type:Types.ObjectId,ref:"User",required:true},
  resume:{type:Types.ObjectId,ref:"Resume",required:true},
  job:{type:Types.ObjectId,ref:"Job",required:true},
  matchScore:{type:Number,default:0},
  atsScore:{type:Number,default:0},
  keywordMatchScore:{type:Number,default:0},
  status:{
    type:String,
    enum:["draft","submitted","interview","offer","rejected"],
    default:"draft",
  },
  coverLetter:String,
  rewrittenResume:String,
  interviewQuestions:[{
    category:String,
    question:String,
  }],
},{timestamps:true});

export default model("Application",ApplicationSchema);
