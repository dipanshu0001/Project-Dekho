const ProjectModel = require("../Model/UserProject");
const cloudinary = require("cloudinary");
const userModel = require("../Model/UserModel");
const { sendMailToSubscribers } = require("./Additional_features_project.js");
// const fetch = require('node-fetch');
// const request = require('request');
const axios = require("axios");
// const UserModel = require('../Model/UserModel');
const AddProject = async (req, res) => {
  const file = req.files.Image;
  const {
    Name,
    Description,
    Github_react,
    Github_node,
    Contact,
    Uid,
    Deployed_link,
    Industry,
    Monetized,
    Build,
    Minprice,
    Maxprice,
  } = req.body;
  console.log(req.body);
  if (
    !Name ||
    !Description ||
    !Contact ||
    !Deployed_link ||
    !Industry ||
    !Monetized ||
    !Build ||
    !Minprice ||
    !Maxprice ||
    !Uid
  ) {
    return res.status(400).send({ message: "Fill All Fileds", type: 2 });
  } else if (!Github_react && !Github_node) {
    return res.status(400).send({ message: "Fill Github Links", type: 2 });
  }
  try {
    let value = Github_react !== "" && Github_node !== "";
    const uploader_user = await userModel.findOne({ Uid: Uid });
    // console.log(uploader_user)
    let latest_id = "";
    cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) console.log(err);
      const new_document = new ProjectModel({
        Uid: Uid,
        Name,
        Description,
        Github_react,
        Github_node,
        Contact,
        Deployed_link,
        Image: result.url,
        isFullStack: value,
        Build: parseInt(Build),
        Industry,
        Monetized,
        Minprice: parseInt(Minprice),
        Maxprice: parseInt(Maxprice),
      });
      new_document
        .save()
        .then((savedDocument) => {
          latest_id = savedDocument._id.toString();
          sendMailToSubscribers(
            uploader_user.Gmail,
            uploader_user.Followers,
            uploader_user.Username,
            uploader_user.Uid,
            savedDocument._id.toString()
          );

          // console.log(latest_id);
        })
        .catch((error) => {
          console.log("error while saving new project", error);
        });
    });

    // console.log(uploader_user.Followers)
    res.status(200).send({ message: "Project Uploaded Sucessfully", type: 1 });
  } catch (e) {
    // console.log(e.message)
    res.status(500).send({ message: "Internal Server Error", type: 3 });
  }
};
const UpdateProject = async (req, res) => {

  const {
    Name,
    Description,
    Github_react,
    Github_node,
    Contact,
    Uid,
    Deployed_link,
    Industry,
    Monetized,
    Build,
    Minprice,
    Maxprice,
    _id,
  } = req.body;
  
  if (
    !Name ||
    !Description ||
    !Contact ||
    !Deployed_link ||
    !Industry ||
    !Monetized ||
    !Build ||
    !Minprice ||
    !Maxprice ||
    !Uid
  ) {
    return res.status(400).send({ message: "Fill All Fileds", type: 2 });
  } else if (!Github_react && !Github_node) {
    return res.status(400).send({ message: "Fill Github Links", type: 2 });
  }

  try {
    let value = Github_react !== "" && Github_node !== "";
    
    console.log("hello2")
   
    
    
    
    if(req.files!==null)
    {
      const file = req.files.Image;
      var save ;
      cloudinary.v2.uploader.upload(file.tempFilePath, async(err, result) => {
        console.log("hello3")  
        if (err) console.log(err);
        save = result.url;
        const uploaded_project =  await ProjectModel.findOne({ _id: _id });
        let new_document = await  uploaded_project.updateProject({
          Uid: Uid,
          Name: Name,
          Description: Description,
          Github_react: Github_react,
          Github_node: Github_node,
          Contact: Contact,
          Deployed_link,
          Image: result.url,
          isFullStack: value,
          Build: parseInt(Build),
          Industry: Industry,
          Monetized: Monetized,
          Minprice: parseInt(Minprice),
          Maxprice: parseInt(Maxprice),
        });
        await uploaded_project.save();
        return res.status(200).send({ message: "Project Uploaded Sucessfully", type: 1,data:new_document });
        
        

      });
    }else
    {
      
        console.log("hello4")  
        
        const uploaded_project =  await ProjectModel.findOne({ _id: _id });
         
        let new_document =await uploaded_project.updateProject({
          Uid: Uid,
          Name: Name,
          Description: Description,
          Github_react: Github_react,
          Github_node: Github_node,
          Contact: Contact,
          Deployed_link,
          isFullStack: value,
          Build: parseInt(Build),
          Industry: Industry,
          Monetized: Monetized,
          Minprice: parseInt(Minprice),
          Maxprice: parseInt(Maxprice),
        })
        await uploaded_project.save();
        return res.status(200).send({ message: "Project Uploaded Sucessfully", type: 1 });
      
    }
    


    // console.log(uploader_user.Followers)
    
  } catch (e) {
     console.log(e.message)
    res.status(500).send({ message: "Internal Server Error", type: 3 });
  }
};

const GetrepoContent = async (url) => {
  const result = await axios.get(url);
  return result;
};

const GetPackageData = async (link) => {
  const result = await axios.get(link);
  return result;
};

const CheckReactRepoMiddleware = async (req, res, next) => {
  const { link } = req.body;
  // console.log(link)
  if (!link) return res.send("empty ");
  try {
    // console.log(link)
    const regexlink = /github.com\/([\w-]+)\/([\w-]+)/;
    // !extracting owener name and repo name
    const match = link.match(regexlink);
    // !if match id null means repos link is not properly entered
    // console.log(match)
    if (match == null) {
      return res.status(401).send({ message: "Invalid link", type: 3 });
    }
    // console.log(`token ${process.env.GITHUB_TOKEN}`)
    const owner_name = match[1];
    const repo = match[2];
    const url = `https://api.github.com/repos/${owner_name}/${repo}`;
    // console.log(owner);
    // console.log(repo);

    // !Make a request to GitHub API to fetch repository details

    const response = await axios.get(url);
    const { data } = response;

    // !Make  request to fetch repository contents it will give content stored in that repository
    // const contentsResponse = await axios.get(`https://api.github.com/repos/${owner_name}/${repo}/contents`);
    const contentsResponse = await GetrepoContent(
      `https://api.github.com/repos/${owner_name}/${repo}/contents`
    );
    const { data: contentsData } = contentsResponse;

    // !Find package.json file in contents
    const packageJson = contentsData.find(
      (file) => file.name === "package.json"
    );
    console.log(packageJson);
    // !Check if package.json exists in repo contents
    if (!packageJson) {
      return res.status(404).json({
        message: "Repository does not contain react related project",
        type: 3,
      });
    }

    // !Fetch package.json content with help of download_url
    const packageJsonContentResponse = await GetPackageData(
      packageJson.download_url
    );
    const { data: packageJsonContent } = packageJsonContentResponse;
    const { dependencies } = packageJsonContent;

    // ! Now checking if react is their in dependencies object or not

    if ("react" in dependencies) {
      next();
    } else {
      return res.status(404).json({
        message: "React Repository does not contain code related to React",
        type: 3,
      });
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 404) {
      return res
        .status(404)
        .json({ message: "React Repository is Private", type: 3 });
    }
    res.status(500).json({ error: error.message });
  }
};

const CheckNodeRepoMiddleware = async (req, res, next) => {
  try {
    const { link } = req.body;
    const regexlink = /github.com\/([\w-]+)\/([\w-]+)/;
    // !extracting owener name and repo name
    const match = link.match(regexlink);
    // !if match id null means repos link is not properly entered
    if (match == null) {
      return res.status(400).send({ message: "Invalid link", type: 1 });
    }
    const owner_name = match[1];
    const repo = match[2];
    const url = `https://api.github.com/repos/${owner_name}/${repo}`;

    // !Make a request to GitHub API to fetch repository details
    const response = await axios.get(url);
    const { data } = response;

    // !Make  request to fetch repository contents it will give content stored in that repository
    const contentsResponse = await GetrepoContent(
      `https://api.github.com/repos/${owner_name}/${repo}/contents`
    );
    const { data: contentsData } = contentsResponse;

    // !Find package.json file in contents
    const packageJson = contentsData.find(
      (file) => file.name === "package.json"
    );

    // !Check if package.json exists in repo contents
    if (!packageJson) {
      return res.status(404).json({
        message:
          "Node Repository does not contain Express or Node related project",
        type: 3,
      });
    }

    // !Fetch package.json content with help of download_url
    const packageJsonContentResponse = await GetPackageData(
      packageJson.download_url
    );
    const { data: packageJsonContent } = packageJsonContentResponse;
    const { dependencies } = packageJsonContent;

    // ! Now checking if react is their in dependencies object or not
    if ("express" in dependencies) {
      console.log(dependencies)
      // return res.status(200).json({ message: "Repository contains code related to Express" ,type:1});
      next();
    } else {
      return res.status(404).json({
        message:
          "Node Repository does not contain code related to Express or Node ",
        type: 3,
      });
    }
  } catch (error) {
    // console.log(error.response.status);
    if (error.response.status === 404) {
      return res
        .status(404)
        .json({ message: "Node Repository is Private", type: 3 });
    }
    // console.log(error);
    // console.error("Error checking repository:", error.message);
    res.status(500).json({ error: error.message });
  }
};
const CheckReactRepo = async (req, res) => {
  res.send({ message: "React Repo contain React related Code", type: 1 });
};
const CheckNodeRepo = async (req, res) => {
  res.send({ message: "Node Repo contain Node related Code", type: 1 });
};
const Get_User = async (req, res) => {
  try {
    const { uid } = req.body;
    // console.log(req.body)
    const result = await userModel.findOne(
      { Uid: uid },
      { Refreshtoken: 0, Password: 0 }
    );
    return res.status(200).send({ user: result });
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error", type: 2 });
  }
};
const SaveProject = async (req, res) => {
  try {
    const { _id, Uid } = req.body; //! _id ---> Project ki _id jo save kerna hai,Uid --> User ki Uid jiske SavedProjects mai push kerni hai ye _id
    const userData = await userModel.findOne({ Uid });
    const newSavedProjects = await userData.handleSave(_id);
    await userData.save();
    res.status(200).send({
      message: "Project saved successfully",
      type: 1,
      newSavedProjects,
    });
  } catch (Err) {
    // console.log(Err.message)
    res.status(500).send({ message: "Internal Server Error", type: 2 });
  }
};
const unSaveProject = async (req, res) => {
  try {
    const { _id, Uid } = req.body; //! _id ---> Project ki _id jo save kerna hai,Uid --> User ki Uid jiske SavedProjects mai push kerni hai ye _id
    const userData = await userModel.findOne({ Uid });
    const newSavedProjects = await userData.handleUnSave(_id);
    await userData.save();
    res.status(200).send({
      message: "Project Removed from Saved List successfullly",
      type: 1,
      newSavedProjects,
    });
  } catch (Err) {
    console.log(Err.message);
    res.status(500).send({ message: "Internal Server Error", type: 2 });
  }
};

const userFollow = async (req, res) => {
  const { Login_user_id, type, Uid, issubscribe, Gmail ,ProfileImage,Username} = req.params;
  // console.log(req)
  // console.log(req.params);
  console.log(req.params, "params");
  try {
    const login_user_detail = await userModel.findOne({ Uid: Login_user_id });
    const user_detail = await userModel.findOne({ Uid: Uid });
    console.log(login_user_detail.Username, user_detail.Username);
    // console.log(user_detail,"userdetails")
    if (type === "0") {
      const updated_login_user_following_list =
        await login_user_detail.handleFollowing(
          Uid,
          user_detail.ProfileImage,
          user_detail.Username
        );
      const updated_user_follower_list = await user_detail.handleFollowers(
        Login_user_id,
        Gmail,
        ProfileImage,
        Username
      );
      return res.status(200).json({
        message: `Following  ${user_detail.Username}`,
        type: 1,
        new_list: updated_login_user_following_list,
      });
    } else if (type === "1") {
      const updated_login_user_following_list =
        await login_user_detail.handleUnFollowing(Uid);
      const updated_user_follower_list = await user_detail.handleUnFollowers(
        Login_user_id,
        Gmail
      );
      console.log(updated_user_follower_list);
      return res.status(200).json({
        message: `Unfollowed ${user_detail.Username}`,
        type: 1,
        new_list: updated_login_user_following_list,
      });
    } else if (type === "2") {
      const updated_user_follower_list = await user_detail.handleSubscribeBoth(
        Login_user_id,
        issubscribe,
        Gmail
      );
      const updated_login_user_following_list =
        await login_user_detail.handleFollowing(
          Uid,
          user_detail.ProfileImage,
          user_detail.Username
        );
      return res.status(200).json({
        message: `Following and subcribed to${user_detail.Username}`,
        type: 1,
        new_list: updated_login_user_following_list,
      });
    } else {
      const updated_user_follower_list = await user_detail.handleSubscribeBoth(
        Login_user_id,
        issubscribe,
        Gmail
      );
      return res.status(200).json({
        message: `Unsubcribed to${user_detail.Username}`,
        type: 1,
        new_list: login_user_detail.Following,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error please try again later",
      type: 3,
    });
  }
};

module.exports = {
  AddProject,
  UpdateProject,
  CheckReactRepo,
  CheckNodeRepo,
  CheckReactRepoMiddleware,
  CheckNodeRepoMiddleware,
  Get_User,
  SaveProject,
  unSaveProject,
  userFollow,
};

// const express = require('express');
// const axios = require('axios');

// const app = express();
// app.use(express.json());

// app.post('/checkRepoForReactAndNode', async (req, res) => {
//   try {
//     const { repoLink } = req.body; // Assuming repoLink is provided in the request body

//     // Make a request to GitHub API to fetch repository details
//     const response = await axios.get(repoLink);
//     const { data } = response;

//     // Extract relevant information from response
//     const { owner, name } = data;

//     // Make another request to fetch repository contents

//     // Determine if repository contains code related to React and Node.js
//     if (reactFiles.length > 0 && nodeFiles.length > 0) {
//       res.status(200).json({ message: 'Repository contains code related to React and Node.js' });
//     } else {
//       res.status(200).json({ message: 'Repository does not contain code related to React and Node.js' });
//     }

//   } catch (error) {
//     console.error('Error checking repository:', error.message);
//     res.status(500).json({ error: 'Error checking repository' });
//   }
// });

// const CheckRepo = async (req, res) => {

//     const { link } = req.body;
//     if (!link) return res.status(400).send({ message: "link is empty" })
//     const regexlink = /github.com\/([\w-]+)\/([\w-]+)/;
//     const match = link.match(regexlink);
//     console.log(match)
//     if (match) {
//         const owner = match[1];
//         const repo = match[2];
//         const url = `https://api.github.com/repos/${owner}/${repo}`;

//         // try {
//         //     const result = await fetch(url);
//         //     const UserData = await result.json();
//         //     console.log(UserData)
//         //     const isPrivate = UserData.private;

//         //     res.send(isPrivate);

//         // } catch (e) {
//         //     res.status(500).send({ message: "Internal Server Error", type: 3 })
//         // }
//     let owner_comp;

//         request(
//             {
//                 url: url,
//                 headers: {
//                     'User-Agent': 'request',
//                     Authorization: `token ${process.env.GITHUB_TOKEN}`,
//                 },
//             },
//             (error, response, body) => {
//                 if (error) {
//                     return res.status(500).send('Error retrieving data from GitHub API.');
//                 }

//                 const data = JSON.parse(body);
//                 console.log(data.size)
//                 if(data.message=="Not Found")return res.send({message:"Repo is Private",type:3});
//                 const user = data.owner;
//                 if(data.size===0)return res.send({message:"Repo is empty",type:3})
//                 // res.send(user)
//                 owner_comp=user;
//                 console.log(user);
//             }
//         );
//         try{
//             const contentsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents`);
//             const { data: contentsData } = contentsResponse;
//             const reactFiles = contentsData.filter(file => (file.name.endsWith('.jsx') || file.name.endsWith('.tsx')) || (file.type === 'file' && file.content.includes('React')));
//             const nodeFiles = contentsData.filter(file => (file.name.endsWith('.js') || file.name.endsWith('.ts')) || (file.type === 'file' && file.content.includes('require(\'express\')')));
//             console.log(reactFiles,"react and node files",nodeFiles)
//             res.send(reactFiles,nodeFiles);

//         }catch(e){
//             console.log(e.message)
//         }
//     }
//     else return res.status(400).send({ message: "Invalid Github URL", type: 3 });
// }

// const check_size=
// const callback=(err,value)=>{
//     if(err)console.log(err)
//     return value
// }
