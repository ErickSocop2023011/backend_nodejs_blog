import { validationResult } from "express-validator";

export const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().reduce((acc, error) => {
            if (!acc[error.param]) {
                acc[error.param] = [];
            }
            acc[error.param].push(error.msg);
            return acc;
        }, {});

        return res.status(400).json({
            success: false,
            message: "Error de validación",
            errors: formattedErrors,
        });
    }

    next();
};
