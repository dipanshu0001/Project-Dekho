const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');



const UserModelSchema = new mongoose.Schema({
    Uid: {
        type: String,
        default: uuidv4
    },
    Username: {
        type: String,
        required: true
    },
    Gmail: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Refreshtoken: {
        type: String,
        // default:""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    ProfileImage: {
        type: String
    },
    likedProjects:
        [
            {
                _id:
                {
                    type: String
                }
            }
        ],
    dislikedProjects:
        [
            {
                _id:
                {
                    type: String
                }
            }
        ],
    SavedProjects: [
        {
            Project_id: {
                type: String
            }
        },
    ],
    Followers: [
        {
            User_id: {
                type: String,
            },
            Date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    Userintro: {
        type: String,
        default: "Hi, I'm $NAME$, a skilled web developer. With a passion for crafting exceptional online experiences, I specialize in transforming ideas and designs into fully functional websites and web applications. With a strong foundation in HTML, CSS, and JavaScript, I have the ability to bring life to static designs, ensuring seamless interactivity and responsiveness. I thrive on using frameworks like React, Angular, or Vue.js to develop dynamic and interactive web applications that engage users and deliver exceptional performance. My attention to detail and focus on best practices in coding, security, and optimization ensure that the websites I build are both aesthetically pleasing and highly functional"

    },
    Following: [
        {
            User_id: {
                type: String,
            },
            ProfileImage: {
                type: String
            },
            Username: {
                type: String
            },
            Date: {
                type: Date,
                default: Date.now
            }
        }
    ]

})
UserModelSchema.methods.increaseCount = async function (_id) {
    try {
        // console.log(_id)
        var new_people = { _id: _id };

        this.likedProjects.push(new_people);
        await this.save();

        return this.likedProjects;

    } catch (error) {
        console.log(error);
    }
}
UserModelSchema.methods.decreaseCount = async function (_id) {
    try {
        this.likedProjects = this.likedProjects.filter(ele => ele._id !== _id)
        // console.log(this.likedProjects,"like Projects waala scene hai ")
        await this.save();
        return this.likedProjects;
    } catch (error) {
        console.log(error);
    }

}
UserModelSchema.methods.handleSave = async function (_id) {
    try {
        let new_saved = { Project_id: _id };
        this.SavedProjects.push(new_saved);
        await this.save();
        return this.SavedProjects;
    } catch (error) {
        console.log(error)
    }
}
UserModelSchema.methods.handleUnSave = async function (_id) {
    try {
        // let new_saved={Project_id:_id};
        this.SavedProjects = this.SavedProjects.filter(ele => ele.Project_id !== _id);
        await this.save();
        return this.SavedProjects;
    } catch (error) {
        console.log(error)
    }
}
UserModelSchema.methods.handleFollowers = async function (_id) {
    try {

        const new_follower =
        {
            User_id: _id
        }
        this.Followers.push(new_follower);
        await this.save();
        return this.Followers;
    }
    catch (err) {
        console.log("error while handleFollowers", err);
    }
}
UserModelSchema.methods.handleUnFollowers = async function (_id) {
    try {
        this.Followers = this.Followers.filter(item => item.User_id !== _id);
        await this.save();
        return this.Followers;
    }
    catch (err) {
        console.log("Unfollowers time error", err);
    }
}
UserModelSchema.methods.handleFollowing = async function (Uid, ProfileImage, Username) {
    try {
        const new_following = {
            User_id: Uid,
            ProfileImage,
            Username
        }
        const already = this.Following.find(ele => ele.User_id == Uid)
        if (already !== undefined) {
            this.Following.push(new_following);
            await this.save();
        }
        return this.Following;
    }
    catch (err) {
        console.log("error while handleFollowers", err);
    }

}
UserModelSchema.methods.handleUnFollowing = async (Uid) => {
    try {
        this.Following = this.Following.filter(item => item.User_id !== Uid);
        this.save();
        return this.Following
    } catch (err) {
        console.log("UnFollowing err", err)
    }
}


const UserModel = new mongoose.model('UserDetails', UserModelSchema);

module.exports = UserModel;