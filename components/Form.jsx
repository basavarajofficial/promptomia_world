import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full p-5 max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
        </h1>
        <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world, and let your imagination run wild with any AI-Powered platform.
        </p>


        <form  
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
          >
            <label>
              <span className="font-satoshi font-semibold text-base text-grey-700">Your AI Prompt</span>
              <textarea className="form_textarea"
                value={post.prompt}
                onChange={(e) => setPost({...post, prompt: e.target.value})}
                placeholder="Write your prompt here..."
                required
              />
            </label>

            <label>
              <span className="font-satoshi font-semibold text-base text-grey-700">
                Tag {` `}
                <span className="font-normal">(#products, #webdevelopment, #idea, #emai)</span>
              </span>
              <input className="form_input"
                value={post.tag}
                onChange={(e) => setPost({...post, tag: e.target.value})}
                placeholder="#tags"
                required
              />
            </label>

            <div className="flex-end mx-3 mv-5 gap-5">
              <Link href='/' className='text-grey-500 text-sm' >
                Cancel
              </Link>
              <button type="submit" disabled={submitting} className="px-5 py-1.5 text-small bg-primary-orange rounded-full text-white">
                {submitting ? `${type}...` : type}
              </button>
            </div>
          </form>
    </section>
  )
};

export default Form;
