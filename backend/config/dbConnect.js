

 
module.exports  = mongoose.connect(`
mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153652.mlab.com:53652/oministack
`,{
    useNewUrlParser: true,
    useUnifiedTopology: true    
})