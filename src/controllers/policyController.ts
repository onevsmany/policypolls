import Policy from '../models/policy'
import moment from 'moment'
const createPolicy = (user_id, policy:string[]) => {
    const createdAt = moment().format("DD MM YYYY hh:mm:ss");
    const user = user_id 
    const userPolicy = new Policy({
        user,
        createdAt,
        policy

    })
}