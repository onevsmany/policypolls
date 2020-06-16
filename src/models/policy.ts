import {Model, Schema, model, Document} from 'mongoose';


interface IPolicyDocument extends Document{
    policies: string[],
    addPolicies: (policyArray:string[]) => void,
    getPolicies: () => string[]
}

const policySchema = new Schema({
    policies:{
        type: Array,
        required: false,
        default: []

    },
    lastUpdated:{
        type:Number,
        default: null
    }
})



policySchema.methods.getPolicies = async function(){
    try{
        const userPolicies: string[] = this.policies;
        return userPolicies
        
    }catch(e){
        throw new Error('Unable to get policies for this particular user');
    }
}

policySchema.methods.addPolicies = async function(policy:string[]){
    try{
        this.policies.concat(policy)
        this.policies.save()

    }catch(e){
        throw new Error('error adding policy for this user')
    }
}

const Policy = model<IPolicyDocument>('Policy',  policySchema)