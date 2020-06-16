import User from '../models/user';

const addPolicy = (id, email) => {
    User.findOne({_id:id, email}).then
}