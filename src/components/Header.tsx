import { UserMenu } from "./UserMenu";

const Header = () => {
  return (
    <header className="text-center relative">
      <div className="absolute right-0 top-0">
        <UserMenu />
      </div>
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