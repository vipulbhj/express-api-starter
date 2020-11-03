const express = require("express");
const router = express.Router();
const db = require("../../models");

const Quiz = db.quiz;

router.get("/quiz/:quiz_id", async (req, res) => {
  try {
    const quizId = parseInt(req.params.quiz_id, 10);
    const quiz = await Quiz.findByPk(quizId);
    if (quiz === null) {
      res.status(404).json({});
    } else {
      res.status(200).json({
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      reason: err.message,
    });
  }
});

router.get("/quiz-questions/:quiz_id", async (req, res) => {
  try {
    const quizId = parseInt(req.params.quiz_id, 10);
    const quiz = await Quiz.findByPk(quizId, {
      include: {
        model: db.question,
        attributes: [
          "id",
          "name",
          "options",
          "correct_option",
          "points",
          ["quizId", "quiz"],
        ],
      },
    });
    if (quiz === null) {
      res.status(404).json({});
    } else {
      res.status(200).json({
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        questions: quiz.questions,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      reason: err.message,
    });
  }
});

router.post("/quiz", async (req, res) => {
  try {
    const { name, description } = req.body;
    const quiz = await Quiz.create({
      name,
      description,
    });
    res.status(201).json({
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      reason: err.message,
    });
  }
});

module.exports = router;
