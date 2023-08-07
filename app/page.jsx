import Feed from "@components/Feed"

const Home = () => {
  return (
    <div>
      <section className="w-full flex-center flex-col" >
        <h1 className="head_text text-center" >Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Propmts</span>
        </h1>

        <p className="desc text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate nisi repudiandae alias aliquam! Eum iusto quia culpa eaque earum quo.</p>

        {/* feed */}
        <Feed />
      </section>
    </div>
  )
}

export default Home
