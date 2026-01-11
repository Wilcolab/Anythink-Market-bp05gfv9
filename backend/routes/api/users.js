var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");
var User = mongoose.model("User");
var auth = require("../auth");
const { sendEvent } = require("../../lib/event");

/**
 * GET /api/user
 * Requires authentication (auth.required).
 * Responds with the authenticated user's auth JSON.
 *
 * Success:
 *   200 { user: UserAuthJSON }
 * Failure:
 *   401 if user not found
 * Errors are forwarded to next(err)
 */
router.get("/user", auth.required, async function(req, res, next) {
  try {
    const user = await User.findById(req.payload.id);
    if (!user) {
      return res.sendStatus(401);
    }
    return res.json({ user: user.toAuthJSON() });
  } catch (err) {
    return next(err);
  }
});

/**
 * PUT /api/user
 * Requires authentication (auth.required).
 * Body: { user: { username?, email?, bio?, image?, password? } }
 * Updates only provided fields and returns the updated user's auth JSON.
 *
 * Success:
 *   200 { user: UserAuthJSON }
 * Failure:
 *   401 if user not found
 * Errors are forwarded to next(err)
 */
router.put("/user", auth.required, async function(req, res, next) {
  try {
    const user = await User.findById(req.payload.id);
    if (!user) {
      return res.sendStatus(401);
    }

    // only update fields that were actually passed...
    if (typeof req.body.user.username !== "undefined") {
      user.username = req.body.user.username;
    }
    if (typeof req.body.user.email !== "undefined") {
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.bio !== "undefined") {
      user.bio = req.body.user.bio;
    }
    if (typeof req.body.user.image !== "undefined") {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== "undefined") {
      user.setPassword(req.body.user.password);
    }

    await user.save();
    return res.json({ user: user.toAuthJSON() });
  } catch (err) {
    return next(err);
  }
});

/**
 * POST /api/users/login
 * Body: { user: { email, password } }
 * Authenticates using passport-local. On success returns the user's auth JSON with JWT.
 *
 * Success:
 *   200 { user: UserAuthJSON }
 * Failure:
 *   422 if email or password missing or authentication fails.
 * Errors are forwarded to next(err)
 */
router.post("/users/login", function(req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

/**
 * POST /api/users
 * Body: { user: { username, email, password } }
 * Creates a new user, saves to DB and emits 'user_created' event.
 *
 * Success:
 *   200 { user: UserAuthJSON }
 * Errors are forwarded to next(err)
 */
router.post("/users", async function(req, res, next) {
  try {
    var user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);

    await user.save();
    sendEvent('user_created', { username: req.body.user.username });
    return res.json({ user: user.toAuthJSON() });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
