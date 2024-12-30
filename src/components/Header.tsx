import { Link, useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  return (
    <header className="text-center relative space-y-8">
      <div className="flex justify-between items-start">
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/recipe"
                className={cn(
                  "text-brand-turmericOrange/70 hover:text-brand-mustardYellow transition-colors duration-500",
                  location.pathname === "/recipe" && "text-brand-mustardYellow font-medium"
                )}
              >
                Generate
              </Link>
            </li>
            <li>
              <Link
                to="/saved-recipes"
                className={cn(
                  "text-brand-turmericOrange/70 hover:text-brand-mustardYellow transition-colors duration-500",
                  location.pathname === "/saved-recipes" && "text-brand-mustardYellow font-medium"
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
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-turmericOrange mb-4 bg-gradient-to-r from-brand-turmericOrange to-brand-mustardYellow bg-clip-text text-transparent animate-shimmer">
          MealPrepGenie v3
        </h1>
        <p className="text-lg text-brand-turmericOrange/70 max-w-xl mx-auto">
          Upload photos of your ingredients, and we'll suggest delicious recipes you can make with what you have.
        </p>
      </div>
    </header>
  );
};

export default Header;