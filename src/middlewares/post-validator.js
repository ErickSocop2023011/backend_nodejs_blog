import { body, param } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { handleErrors } from "../middlewares/handle-error.js";

export const validCourse = [
    'Technology',
    'Workshop',
    'Supervised Practice'
]

export const createPostValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters long"),
    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters long"),
    body("course")
        .notEmpty()
        .withMessage("Course is required")
        .custom((value) => {
            if(!validCourse.includes(value)) {
                throw new Error(`Course must be one of the following: ${validCourse.join(", ")}`);
            }
            return true;
        }),
    validateFields,
    handleErrors
];


export const filterPostsValidator = [
    param("course")
        .optional()
        .isIn(["Technology", "Workshop", "Supervised Practice"])
        .custom((value) => {
            if(!validCourse.includes(value)) {
                throw new Error(`Course must be one of the following: ${validCourse.join(", ")}`);
            }
            return true;
        }),
    param("title")
        .optional()
        .isString()
        .withMessage("Title must be a string"),
    param("sortByDate")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("Invalid sort option (asc or desc)"),
    validateFields,
    handleErrors
];

export const getPostByIdValidator = [
    param("pid")
        .notEmpty()
        .withMessage("Post ID is required")
        .isMongoId()
        .withMessage("Invalid Post ID format"),
    validateFields,
    handleErrors
]

export const addCommentValidator = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
    body("text")
        .notEmpty()
        .withMessage("Text is required")
        .isLength({ min: 1 })
        .withMessage("Text must be at least 1 character long"),
    validateFields,
    handleErrors
];
