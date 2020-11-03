const express = require("express");
const router = express.Router();
const db = require("../../models");

const Question = db.question;

router.get("/questions/:question_id", async (req, res) => {
  try {
    const questionId = parseInt(req.params.question_id, 10);
    const question = await Question.findByPk(questionId);
    if (question === null) {
      res.status(404).json({});
    } else {
      let { id, name, options, correct_option, points } = question;
      res.status(200).json({
        id,
        name,
        options,
        correct_option,
        quiz: question.quizId,
        points,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      reason: err.message,
    });
  }
});

router.post("/questions", async (req, res) => {
  try {
    const { name, options, correct_option, quiz, points } = req.body;
    const question = await Question.create({
      name,
      options,
      correct_option,
      points,
      quizId: quiz,
    });

    res.status(201).json({
      id: question.id,
      name: question.name,
      options: question.options,
      correct_option: question.correct_option,
      quiz: question.quizId,
      points: question.points,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      reason: err.message,
    });
  }
});

module.exports = router;
