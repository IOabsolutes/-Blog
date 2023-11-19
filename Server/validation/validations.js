import { body } from "express-validator";
// body help check info and validate it
export const registerValidation = [
  body("fullName", "should`t be empty").notEmpty().isString(),
  body("email", "incorrect format").isEmail(),
  body("password", "should contain min 8 characters").isLength({ min: 8 }),
  body("avatarUrl ", "invalid url").optional().isString(),
];
export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 })
]

export const postCreateValidation = [
  body("title", "could`t be empty").notEmpty().isString(),
  body("text", "could`t be empty").notEmpty().isString(),
  body("tags", "incorrect format of tags").optional().isString(),
  body("image", "invalid type").optional().isString()
]

export const commentCreateValidation = [
  body('massege', 'could`t be empty').notEmpty().isLength({ min: 1 }).isString(),
  body('postId', 'the comment does`t exist').isString()
]
