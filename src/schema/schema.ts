import Project from '../models/Project.model'
import Client from '../models/Client.model'
import { IClientDoc, IProjectDoc } from '../utils/types.util'

import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} from 'graphql'


const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { 
            type: ClientType,
            resolve(parent: IProjectDoc, data: any){
                return Client.find({ _id: parent.client })
            }
        }
    })
})

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        projects: {
            type: new GraphQLList(ProjectType),
            resolve: (parent: any, data: IProjectDoc) => {
                return Project.find({});
            }
        },

        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve: (parent: any, data: IProjectDoc) => {
                return Project.findOne({ _id: data._id })
            }
        },

        clients: {
            type: new GraphQLList(ClientType),
            resolve: (parent: any, data: IClientDoc) => {
                return Client.find({});
            }
        },

        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve: (parent: any, data: IClientDoc) => {
                return Client.findOne({ _id: data._id })
            }
        }

    }
});

export default new GraphQLSchema({ query: RootQuery })