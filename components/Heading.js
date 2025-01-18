const Heading = (props) => {
  return (
    <h1
      className={`md:text-5xl text-4xl text-center my-6 font-bold font-playfair leading-[3rem] md:leading-[4rem] text-black ${props.style}`}
    >
      {props.title}
    </h1>
  )
}

export default Heading
