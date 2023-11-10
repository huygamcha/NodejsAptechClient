const express = require("express");
const router = express.Router();

const {
  question1,
  question1a,
  question1b,
  question2,
  question2a,
  question2b,
  question3,
  question3a,
  question3b,
  question3c,
  question3d,
  question3e,
  question4,
  question5,
  question5a,
  question5b,
  question6,
  question7,
  question7a,
  question7b,
  question8,
  question8a,
  question8b,
  question13,
  question14,
  question15,
  question16,
  question16a,
  question17,
  question18,
  question19,
  question20,
  question21,
  question23,
} = require("./controller");

router.get("/1", question1);
router.get("/1a", question1a);
router.get("/1b", question1b);
router.get("/2", question2);
router.get("/2a", question2a);
router.get("/2b", question2b);
router.get("/3", question3);
router.get("/3a", question3a);
router.get("/3b", question3b);
router.get("/3c", question3c);
router.get("/3d", question3d);
router.get("/3e", question3e);
router.get("/4", question4);
router.get("/5", question5);
router.get("/5a", question5a);
router.get("/5b", question5b);
router.get("/6", question6);
router.get("/7", question7);
router.get("/7a", question7a);
router.get("/7b", question7b);
router.get("/8", question8);
router.get("/8a", question8a);
router.get("/8b", question8b);
router.get("/13", question13);
router.get("/14", question14);
router.get("/15", question15);
router.get("/16", question16);
router.get("/16a", question16a);
router.get("/17", question17);
router.get("/18", question18);
router.get("/19", question19);
router.get("/20", question20);
router.get("/21", question21);
router.get("/23", question23);

module.exports = router;
