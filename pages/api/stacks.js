import jwt from "jsonwebtoken";
import Stack from "../../models/Stack";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "POST":
            await handlePostRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        default:
            res.send(405).send("Request method not allowed!");
    }
}

const handleGetRequest = async (req, res) => {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    if (!userId) {
        return res.status(401).send("User authentication failed!");
    }

    try {
        const stacks = await Stack.find({ user: userId });
        if (stacks) {
            res.status(200).json(stacks);
        } else {
            res.status(200).send("No stacks have been created yet.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to fetch stacks.");
    }
}

const handlePostRequest = async (req, res) => {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    if (!userId) {
        return res.status(401).send("User authentication failed!");
    }

    try {   
        const stack = await new Stack({
            name: req.body.stackName,
            user: userId
        }).save();

        res.status(201).json(stack);
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to create stack.");
    }
}

const handleDeleteRequest = async (req, res) => {
    try {
        await Stack.findOneAndDelete({ id: req.params.id });
        res.status(204).send("Stack deleted.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Unable to delete stack.");
    }
}