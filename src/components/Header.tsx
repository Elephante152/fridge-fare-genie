import { Link, useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  return (
    <header className="text-center relative space-y-6">
      <div className="flex justify-between items-start">
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/recipe"
                className={cn(
                  "text-brand-jet/70 hover:text-brand-myrtleGreen transition-colors",
                  location.pathname === "/recipe" && "text-brand-myrtleGreen font-medium"
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
        <UserMenu />
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-medium bg-clip-text text-transparent animate-gradient-x bg-gradient-to-r from-brand-aquamarine via-brand-myrtleGreen to-brand-yellow bg-[length:200%_100%] mb-4">
          MealPrepGenie v3
        </h1>
        <p className="text-lg text-brand-jet/70 max-w-xl mx-auto">
          Getting delicious recipe suggestions is as easy as 1-2-3!
        </p>
      </div>
    </header>
  );
};

export default Header;