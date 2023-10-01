import Logo from "./../../images/Itsy_logo.png";
const EmtScreen = () => {
  return (
    <div className=" animate__animated animate__zoomIn flex  flex-col justify-center items-center w-full h-full min-h-[600px] sm:min-h-[400px] gap-4">
      <img src={Logo} alt="logo" className=" h-[85px] object-contain sm:h-[40px]" />
      <h1 className="text-md font-semibold text-accent-foreground/70 text-center w-[50%] sm:text-sm ">
        Hey dear, I'm ITSY your culinary spider buddy! share your items, and
        I'll weave dishes so snappy!
      </h1>
    </div>
  );
};

export default EmtScreen;
