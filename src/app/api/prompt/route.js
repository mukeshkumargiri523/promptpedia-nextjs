import { Prompt } from "@/models/promptModel";
import { connectDb } from "@/utils/database";

export const GET = async () => {
  try {
    await connectDb();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
