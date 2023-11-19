import { allowedOrigins } from "./allwedOrigins.js";

const corsOptions = {
    origin: (origin, callBack) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callBack(null, true)
        } else {
            callBack(new Error('Not allowed by CORS'))
        }
    },
    Credential: true,
    optionsSuccessStatus: 200
}
export default corsOptions