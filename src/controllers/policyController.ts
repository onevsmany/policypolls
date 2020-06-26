import Policy from '../models/policy'
import moment from 'moment'




export const createPolicy = async (user_id, policies:string[]) => {
    try{
        const found = await Policy.findOne({user:user_id}).exec()
        if(found){
            throw new Error('User has already created policy. Update instead')
        }
        const createdAt = await moment().format("DD MM YYYY hh:mm:ss");
        const user = await user_id 
        const userPolicy = await new Policy({
            user,
            createdAt,
            policies

        })
        await userPolicy.save();

    }catch(e){
        throw new Error(e.message)
    }
    
}

export const getUserPolicy = async (user_id) => {
    try{
        const userPolicy = await Policy.getPolicyByUser(user_id)
        return userPolicy.policies

    }catch(e){
        throw new Error()
    }

}

export const updateUserPolicy = async (user_id:string, policy:string[]) => {
    try{
        const userPolicy = await Policy.getPolicyByUser(user_id)
        const updatedPolicy = await userPolicy.policies.concat(policy)
        const lastUpdatedAt = await moment().format("DD MM YYYY hh:mm:ss")
        userPolicy.policies = await updatedPolicy
        userPolicy.lastUpdatedAt = await lastUpdatedAt
        await userPolicy.save()
    }catch(e){
      throw new Error('Could not update policy for this user')  
    }
}


/**
 * @todo write query to count and return all the unique values in the policy collection
 * @todo consider moving the policy colectiont to a seperate database and writ custom cluster config
 * for access  
 */
export const allPolicy = async () => {

}




