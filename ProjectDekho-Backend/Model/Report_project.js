const mongoose=require('mongoose');

const ReportSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    report_reason:{
        type:String,
        required:true
    },
    project_id:{
        type:String,
        required:true
    },
    project_user_uid:{
        type:String,
        required:true
    }
})
const ReportModal=new mongoose.model("ReportDetails",ReportSchema);

module.exports = ReportModal;