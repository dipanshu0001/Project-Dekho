    const express = require('express');
const Router = express.Router();
const { getAllProjects,
    like_count_handler,
    comment_section_handler,
    find_already_liked,
    find_already_disliked,
    Get_ParticularProject,
    Get_ParticularProject_User,
    handleviewcount,
    Get_Saved_Projects,
    handleReportProject
} = require('../Controller/Projects_func')
const {
    getTopLiked,
    getDistinctIndustry,
    getData
} = require('../Controller/Additional_features_project')

Router.get('/allProjects/:limit', getAllProjects)
    .post('/likecount/:id/:check/:user', like_count_handler)
    .post('/comment/:user/:id', comment_section_handler)
    .post('/Already_liked', find_already_liked)
    .post('/Already_disliked', find_already_disliked)
    .post('/Get_ParticularProject', Get_ParticularProject)
    .post('/Get_Saved_Projects',Get_Saved_Projects)
    .get('/Get_ParticularProject_User/:id',Get_ParticularProject_User)
    .post('/Viewcount', handleviewcount)
    .get('/MostLiked',getTopLiked)
    .get('/DistinctIndustry',getDistinctIndustry)
    .post('/FilteredData',getData)
    .post('/ReportProject',handleReportProject)


module.exports = Router