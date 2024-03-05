const {UNAME, PASSWORD}= process.env
export const ConnectionString =`mongodb+srv://${UNAME}:${PASSWORD}@cluster0.g67gmbi.mongodb.net/fanashDb?retryWrites=true&w=majority`
