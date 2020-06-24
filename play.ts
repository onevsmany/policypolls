import Policy from './src/models/policy'

const user = '5ee8e88d8ab1265b3445a0aa'
const createdAt = '24 06 2020 04:22:14'
const policies = ['healthcasre', 'dffffddd', 'ddddsqwd']
const me = new Policy({
    user,
    createdAt,
    policies
    
})
me.save()

console.log(me);