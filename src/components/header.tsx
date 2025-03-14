import Link from "next/link";
import Logo from "../../public/logo.svg";
import User from "../../public/user.svg";
import Time from "../../public/time.svg";
import Exit from "../../public/exit.svg";

const Header = () => {
  return (
    <header className="mx-auto font-medium py-6 fixed bg-white w-full">
      <div className="flex justify-between w-[960px] mx-auto">
        <div className="flex gap-8">
          <Link href="/">
            <Logo />
          </Link>

          <Link href="/about" className="flex gap-4 items-center ">
            <User />
            <p>Профиль</p>
          </Link>

          <Link href="/about" className="flex gap-4 items-center">
            <Time />
            <p>История</p>
          </Link>
        </div>
        <Link href="/about" className="flex gap-4 items-center">
          <Exit />
          <p>Выйти</p>
        </Link>
      </div>
    </header>
  );
};
export default Header;
