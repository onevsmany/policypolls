import bcrypt from 'bcrypt'



const sa = async () => {
    let passord = 'samflexino';
    let salt = await bcrypt.hash(passord, 10)
    const match = await bcrypt.compare(passord, salt)
    await console.log(match)
}
sa()