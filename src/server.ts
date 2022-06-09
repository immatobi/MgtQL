import express, { Application } from 'express'
import { config } from 'dotenv';
import colors from 'colors';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import connectDB from './config/db.config'
import { request, gql, GraphQLClient } from 'graphql-request'
import { GraphQLClient as GraphQLClientType } from 'graphql-request/dist/index'
import Tatum from './tantum.sv'

config();

// connect db
const connect = async () => {
    await connectDB()
}
connect()

const runCoin = async () => {

    if(process.env.BUYCOINS_SCERET_KEY && process.env.BUYCOINS_PUBLIC_KEY &&  process.env.BUYCOINS_API_URL){

        const authValue = Buffer.from(process.env.BUYCOINS_PUBLIC_KEY + ':' + process.env.BUYCOINS_SCERET_KEY).toString('base64');

        const client: GraphQLClientType = new GraphQLClient(process.env.BUYCOINS_API_URL, {
            headers: {
                authorization: `Basic ${authValue}`
            }
        });

        // generate address
        const createAddress = gql `
        mutation {
            createAddress(cryptocurrency: bitcoin) {
                cryptocurrency,
                address
            }
        }
        `

        // await client.request(createAddress).then((resp) => {
        //     console.log(resp);
        // }).catch((err) => {
        //     console.log(JSON.stringify(err.response))
        // })

        // get estimated network fee:
        // this will show you what you're likely to be charged if you're sending out
        const getFee = gql `
        query {
            getEstimatedNetworkFee(cryptocurrency: bitcoin, amount: 0.01) {
                estimatedFee,
                total
            }
        }
        `

        // await client.request(getFee).then((resp) => {
        //     console.log(resp);
        // }).catch((err) => {
        //     console.log(JSON.stringify(err.response))
        // })

        // get balances:
        const getBalances = gql `
        query {
            getBalances(cryptocurrency: bitcoin){
                id
                cryptocurrency
                confirmedBalance
            }
        }
        `
        await client.request(getBalances).then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.log(JSON.stringify(err.response))
        })

    }

}

const runTatum = async () => {

    const mnemonic = 'urge pulp usage sister evidence arrest palm math please chief egg abuse';
    const btc = await Tatum.generateBTCWallet(mnemonic.split(' ').join(''));

    console.log(btc.data)

}

runTatum()

const app: Application = express();

const PORT = process.env.PORT || 5000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development' ? true : false
}))

app.listen(PORT, () => {
    console.log(colors.yellow.bold(`Server running on port ${PORT}`))
})