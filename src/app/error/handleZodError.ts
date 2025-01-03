import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

const handleZodError = (err: ZodError) => {
    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
        console.log(issue);
        return {
          path: issue?.path[issue?.path.length - 1],
          message: issue?.message
        }
      });
    const statusCode=500
    return {
        statusCode,
        message:'Zod Validation error',
        errorSource
    }
}

export default handleZodError