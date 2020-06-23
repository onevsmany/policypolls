import {Model, Schema, model, Document, SchemaTypes, } from 'mongoose';
import { string } from 'joi';


interface IPolicyDocument extends Document{
    policies: string[],
    addPolicies: (policyArray:string[]) => void,
    getPolicies: () => string[]
}

const policySchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: true
    },

    policies:{
        type: Array,
        required: false,
        default: []

    },
    lastUpdated:{
        type:string,
        default: null
    },
    createdAt:{
        type:string,
        required:false
    }
})


/**
 * @description returns the polcies for a particular user 
 */



policySchema.methods.addPolicies = async function(policy:string[]){
    try{
        this.policies.concat(policy)
        this.policies.save()

    }catch(e){
        throw new Error('error adding policy for this user')
    }
}

const Policy = model<IPolicyDocument>('Policy',  policySchema)

export default Policy