import Feed from "@/components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-col flex-center">
      <h3 className="head_text text_center">
        Discover & Share <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h3>
      <p className="desc text-center">
        PromptPedia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      {/* feed */}
      <Feed />
    </section>
  );
}
