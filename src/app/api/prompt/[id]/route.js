import { Prompt } from "@/models/promptModel";
import { connectDb } from "@/utils/database";

//get
export const GET = async (request, { params }) => {
  try {
    await connectDb();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get prompt", {
      status: 500,
    });
  }
};

//patch
export const PATCH = async (request, { params }) => {
  try {
    await connectDb();
    const { prompt, tag } = await request.json();
    const existingPrompt = await Prompt.findById(params.id).populate("creator");
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

//delete
export const DELETE = async (request, { params }) => {
  try {
    await connectDb();
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
};
