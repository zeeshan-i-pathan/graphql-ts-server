import { Error } from "../types/resolver-types";
import { ValidationError } from "yup";
const formatYupErrors = (err: ValidationError) => {
    const errors: Error[] = [];
    err.inner.forEach((e: ValidationError) => {
        errors.push({path: e.path || "unknown_path",message: e.message})
    })
    return errors;
}

export default formatYupErrors;