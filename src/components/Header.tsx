import { Link, useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  return (
    <header className="text-center relative">
      <div className="absolute right-0 top-0">
        <UserMenu />
      </div>
      <nav className="absolute left-0 top-0">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className={cn(
                "text-brand-jet/70 hover:text-brand-myrtleGreen transition-colors",
                location.pathname === "/" && "text-brand-myrtleGreen font-medium"
              )}
            >
              Generate
            </Link>
          </li>
          <li>
            <Link
              to="/saved-recipes"
              className={cn(
                "text-brand-jet/70 hover:text-brand-myrtleGreen transition-colors",
                location.pathname === "/saved-recipes" && "text-brand-myrtleGreen font-medium"
              )}
            >
              Saved Recipes
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-myrtleGreen">
        Recipe Generator
      </h1>
      <p className="mt-4 text-lg text-brand-jet/70 max-w-xl mx-auto">
        Upload photos of your ingredients, and we'll suggest delicious recipes you can make with what you have.
      </p>
    </header>
  );
};

export default Header;