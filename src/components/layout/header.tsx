import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className="text-center px-5 pt-5">
      <h1 className="text-3xl font-bold text-gray-900 mb-5 dark:text-white">
        React ⚛️ + Vite ⚡ + shadcn/ui
      </h1>

      <nav className="flex justify-center gap-2">
        <Button variant="ghost" asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/fetch">Fetch</Link>
        </Button>
        <ModeToggle />
      </nav> 
    </header>
  )
}

export default Header