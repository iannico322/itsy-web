import { Link } from "react-router-dom"

const Page1 = () => {
  return (
    <div className="flex items-center justify-center w-screen h-full bg-background">
      <Link to="/react-vite-supreme/page1">Link</Link>
        <h1 className="text-4xl text-accent-foreground"> Page 1</h1>
  
    </div>
  )
}

export default Page1