import { TErrorSource, TGenericErrorRespons } from "../interface/error";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any) => {
    // Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];

    const errorSources: TErrorSource = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid credintial(Duplicate_Error)',
        errorSources,
    };
};

export default handleDuplicateError;