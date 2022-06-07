import mongoose, { ObjectId } from 'mongoose'

export interface IClientDoc extends mongoose.Document{

    name: string,
    email: string,
    phoneNumber: string,
    slug: string,

    project: mongoose.Schema.Types.ObjectId;

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: mongoose.Schema.Types.ObjectId;
    id: mongoose.Schema.Types.ObjectId;

    // functions
    getAllClients(): IClientDoc

}

export interface IProjectDoc extends mongoose.Document{

    name: string,
    description: string,
    status: string
    slug: string,

    client: mongoose.Schema.Types.ObjectId;

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: mongoose.Schema.Types.ObjectId;
    id: mongoose.Schema.Types.ObjectId;

    // functions
    getAllProjects(): IProjectDoc

}