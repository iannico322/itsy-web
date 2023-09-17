import Logo from "./../../images/Itsy_logo.png";
const EmtScreen = () => {
  return (
    <div className=" animate__animated animate__zoomIn flex  flex-col justify-center items-center w-full h-full min-h-[600px] gap-4">
      <img src={Logo} alt="logo" className=" h-[85px] w-[90px]" />
      <h1 className="text-md font-semibold text-accent-foreground/70 text-center w-[50%] ">
        Hey dear, I'm ITSY your culinary spider buddy! share your items, and
        I'll weave dishes so snappy!
      </h1>
    </div>
  );
};

export default EmtScreen;
