import { verify, sign } from "jsonwebtoken"

const auth = {
    genToken: (id) => {
        return sign({ id }, "here is a secret key")
    },
    
    verifyToken: (token) => {
        try {
            if(!token) return false
            token = token.split(" ")[1]
            let payload = verify(token, "here is a secret key")
            return payload
        } catch (error) {
            return false
        }
    }
}

export { auth as default }
