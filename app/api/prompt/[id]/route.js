import Prompt from "@models/prompt"
import { connectToDb } from "@utils/database"


// Get
export const GET = async (req, { params }) => {
    try {
        await connectToDb();

        const prompts = await Prompt.findById(params.id).populate('creator');

        if(!prompts){
            return new Response("Prompts not found!!", { status: 404 })
        }
        
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed get prompt", { status: 500 })
    }
} 


//Patch

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDb();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request,  { params }) => {
    try {
        await connectToDb();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", {status : 200});

    } catch (error) {
        return new Response("Failed to Delete Prompt", { status: 500 });
    }

}