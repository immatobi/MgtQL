import express, { Application } from 'express'
import { config } from 'dotenv';
import colors from 'colors';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import connectDB from './config/db.config'

config();

// connect db
const connect = async () => {
    await connectDB()
}
connect()

const app: Application = express();

const PORT = process.env.PORT || 5000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development' ? true : false
}))

app.listen(PORT, () => {
    console.log(colors.yellow.bold(`Server running on port ${PORT}`))
})