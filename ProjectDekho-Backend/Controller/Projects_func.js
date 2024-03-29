const projectModel = require('../Model/UserProject')
const userModel = require('../Model/UserModel')
const ReportModal=require('../Model/Report_project')

const getAllProjects = async (req, res) => {
    const {limit}=req.params
    try {
        // console.log(limit)
        const allProjects = await projectModel.find({}, { Github_react: 0, Github_node: 0 }).limit(parseInt(limit));
        res.status(200).json(allProjects);
    } catch (error) {

        res.status(500).json({ error: error.message })
    }
}

const Get_ParticularProject = async (req, res) => {
    const { _id } = req.body
    // console.log(req.body)
    try {
        const result = await projectModel.findOne({ _id: _id })
       
        return res.status(200).send({ project: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server error", type: 2 })
    }
}

const Get_ParticularProject_User = async (req, res) => {
    const _id = req.params.id;
   
    
    try {
        const result = await projectModel.find({ Uid: _id })
       
        return res.status(200).send({  result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server error", type: 2 })
    }
}
const Get_Saved_Projects = async (req, res) => {
    const data = req.body;
    
    try {
        const obj =[];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const result = await projectModel.findOne({ _id: element.Project_id })
            
            obj.push(result)
            
        }

        return res.status(200).send( obj )
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server error", type: 2 })
    }
}


const comment_section_handler = async (req, res) => {
    try {
        console.log(req.params);
        const id = req.params.id
        const userid = req.params.user
        // console.log(id)
        // console.log(req.body)
        const projectDetails = await projectModel.findOne({ _id: id })
        const finduser_who_comment = await userModel.findOne({ Uid: userid })
        await projectDetails.comment_handle(finduser_who_comment.Uid, req.body.comment);
        await projectDetails.save();
        const result = await projectModel.findOne({ _id: id })
        res.status(200).json({ new_comments: result.comments })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const like_count_handler = async (req, res) => {
    try {
        const id = req.params.id
        const bool = req.params.check
        const userid = req.params.user
        // console.log(req.params)
        // console.log(typeof(bool));
        if (bool === "1") {
            // console.log(bool)

            const liked_project = await projectModel.findOne({ _id: id })
            const finduser_who_liked_project = await userModel.findOne({ Uid: userid })
            // console.log(finduser_who_liked_project)
            const alllikedPeople = liked_project.likePeople;
            //!CHECKING IF USER HAS ALREADY LIKED THEN DONT INCREASE THE LIKE AND PUSH SAME INSIDE IT AGAIN
            for (let index = 0; index < alllikedPeople.length; index++) {
                // console.log(finduser_who_liked_project.Uid)
                if (finduser_who_liked_project.Uid === alllikedPeople[index].Uid) {
                    console.log("alreadyPresent")
                    return res.status(500).json("already liked ");
                }
            }
            const dislikearray = liked_project.dislikePeople;
            // const new_dislike = dislikearray.filter(ele => ele.Uid !== userid)
            // const disliked = { dislikePeople: new_dislike }
            // await projectModel.updateOne({ _id: id }, { dislikePeople: disliked }, { new: true })
            const new_liked_project = await finduser_who_liked_project.increaseCount(liked_project._id)
            await finduser_who_liked_project.save();

            // console.log(finduser_who_liked_project)
            const result = await liked_project.increaseCount(finduser_who_liked_project.Uid, finduser_who_liked_project.Username);
            // console.log(result.length,"like ka count")
            await liked_project.save();
            res.status(200).json({ message: "Like count increased successfully", count: result.length, new_liked_project })
        } else if (bool === "0") {
            const disliked_project = await projectModel.findOne({ _id: id })
            const finduser_who_disliked_project = await userModel.findOne({ Uid: userid })
            const allldisikedPeople = disliked_project.dislikePeople;

            for (let index = 0; index < allldisikedPeople.length; index++) {
                // console.log(finduser_who_disliked_project.Uid)
                if (finduser_who_disliked_project.Uid === allldisikedPeople[index].Uid) {
                    // console.log("alreadyPresent")
                    return res.status(500).json("already disliked ");
                }

            }
            // const likearray = disliked_project.likePeople;
            // console.log(likearray);
            // const new_like = likearray.filter(ele => ele.Uid !== userid)
            // const liked = { likePeople: new_like }
            // console.log(liked);
            // await projectModel.updateOne({ _id: id }, { likePeople: liked }, { new: true })
            const new_liked_project = await finduser_who_disliked_project.decreaseCount(disliked_project._id)
            await finduser_who_disliked_project.save();
            const result = await disliked_project.decreaseCount(finduser_who_disliked_project.Uid, finduser_who_disliked_project.Username);
            // console.log(result,"dislike ka count");
            await disliked_project.save();

            res.status(200).json({ message: "dislike count increased successfully", count: result.length, new_liked_project })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const find_already_disliked = async (req, res) => {
    const { user_uid, _id } = req.body;
    // console.log(req.body,"called")
    // console.log(req.params,"called")
    try {
        const result = await projectModel.findOne({ _id: _id });
        // console.log(result)
        const dislikePeople = result.dislikePeople;
        // console.log(likedpeople)
        for (let i = 0; i < dislikePeople.length; i++) {
            if (dislikePeople[i].Uid == user_uid) {
                // console.log("called")
                return res.status(200).send({ dislike: 1 });
            }
        }
        res.status(200).send({ dislike: 0 });
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message, type: 2 });
    }
}
const find_already_liked = async (req, res) => {
    const { user_uid, _id } = req.body;
    try {
        const result = await projectModel.findOne({ _id: _id });
        // console.log(result)
        const likedpeople = result.likePeople;
        // console.log(likedpeople)
        for (let i = 0; i < likedpeople.length; i++) {
            if (likedpeople[i].Uid == user_uid) {
                return res.status(200).send({ like: 1 });
            }
        }
        res.status(200).send({ like: 0 });
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message, type: 2 });
    }
}

const handleviewcount = async (req, res) => {
    const { user_id,_id } = req.body;
    try {
        // await projectModel.updateMany(
        //     {}, // Empty filter to match all documents
        //     { $set: { Vieweduser: [] } },
        //     {new:true} // Empty array to be inserted
        // )
        const result = await projectModel.findOne({ _id })
        // console.log(result.Viewduser)
        // // await projectModel.updateOne({_id:_id},{$set:{Viewcount:result.Viewcount+1}},{new:true});
        const user = result.Vieweduser.find(ele => ele.Uid === user_id)
        if (user !== undefined) return  res.send("already view user");
        const new_viewed_list = await result.addNewViewer(user_id);
        // console.log(new_viewed_list)
        res.status(200).send({ message: "view count increased successfully", new_list_length: new_viewed_list.length })
        // res.status(200).send({ message: "view count increased successfully", new_list_length: 10 })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const handleReportProject=async(req,res)=>{
const{user_logged_uid,report_reason,project_id,project_user_uid}=req.body;
console.log(req.body);
const new_report= new ReportModal({
    user_id:user_logged_uid,
    report_reason:report_reason,
    project_id:project_id,
    project_user_uid:project_user_uid
})
new_report.save().then(savedDocument=>console.log(savedDocument)).catch
return res.send({message:"Reported Successfully",type:2})
}
module.exports = {
    getAllProjects,
    like_count_handler,
    comment_section_handler,
    find_already_liked,
    find_already_disliked,
    Get_ParticularProject,
    Get_ParticularProject_User,
    Get_Saved_Projects,
    handleviewcount,
    handleReportProject
}