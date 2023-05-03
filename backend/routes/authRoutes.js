// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const authKeys = require("../lib/authKeys");
import passport from "passport"
import jwt from "jsonwebtoken"
import authKeys from "../lib/authKeys";
import express from "express"

// const User = require("../db/User");
// const JobApplicant = require("../db/JobApplicant");
// const Recruiter = require("../db/Recruiter");

import express from "express"
import mongoose from "mongoose"
// const mongoose = require("mongoose");
import jwtAuth from "../lib/jwtAuth"
// const jwtAuth = require("../lib/jwtAuth");

import User from "../db/User"


// const User = require("../db/User");
import JobApplicant from "../db/JobApplicant"

// const JobApplicant = require("../db/JobApplicant");

import Recruiter from "../db/Recruiter"
// const Recruiter = require("../db/Recruiter");
// import Job from "../db/Job"
// import Application from "../db/Application"
// import Rating from "../db/Rating"

const router = express.Router();



router.post("/signup", (req, res) => {
  const data = req.body;
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  user
    .save()
    .then(() => {
      const userDetails =
        user.type == "recruiter"
          ? new Recruiter({
              userId: user._id,
              name: data.name,
              contactNumber: data.contactNumber,
              bio: data.bio,
            })
          : new JobApplicant({
              userId: user._id,
              name: data.name,
              education: data.education,
              skills: data.skills,
              rating: data.rating,
              resume: data.resume,
              profile: data.profile,
            });

      userDetails
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
            type: user.type,
          });
        })
        .catch((err) => {
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

export default router;