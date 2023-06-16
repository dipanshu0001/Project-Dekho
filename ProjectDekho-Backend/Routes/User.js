const express = require('express');
const Router = express.Router();
const { AddProject, CheckReactRepo,CheckNodeRepoMiddleware,Get_User,CheckReactRepoMiddleware,CheckNodeRepo,SaveProject,unSaveProject,userFollow, UpdateProject} = require('../Controller/User_functions.js')


Router.post('/Addproject', AddProject)
      .post('/UpdateProject',UpdateProject)
      .post('/CheckReactRepo',CheckReactRepoMiddleware, CheckReactRepo)
      .post('/CheckNodeRepo',CheckNodeRepoMiddleware, CheckNodeRepo)
      .post('/Get_User',Get_User)
      .post('/SaveProject', SaveProject)
      .post('/unSaveProject', unSaveProject)
      .post('/Followers/:Login_user_id/:type/:Uid/:issubscribe/:Gmail',userFollow)
module.exports = Router;