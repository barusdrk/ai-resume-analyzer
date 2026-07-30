import { Schema, model, Types } from "mongoose";

const ResumeSchema = new Schema({
  user:{type:Types.ObjectId,ref:"User",required:true},
  title:{type:String,default:"My Resume"},
  content:{type:String,required:true},
  filename:String,
  analysis:{
    matchScore:Number,
    atsScore:Number,
    keywordMatchScore:Number,
    strengths:[String],
    missingSkills:[String],
    matchedKeywords:[String],
    missingKeywords:[String],
    suggestions:[String],
  },
},{timestamps:true});

export default model("Resume",ResumeSchema);
