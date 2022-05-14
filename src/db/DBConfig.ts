
const userName = process.env['BD_USER_NAME']
const userPassword = process.env['BD_USER_PASSWORD']

export const dbUri = `mongodb+srv://${userName}:${userPassword}@kparser.rxy0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
