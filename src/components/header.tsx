import Link from "next/link";
import Logo from "../../public/logo.svg";
import User from "../../public/user.svg";
import Time from "../../public/time.svg";
import Exit from "../../public/exit.svg";
import { Container } from "./container";

const Header = () => {
  return (
    <header className="mx-auto font-medium py-6 fixed bg-white w-full">
      <Container className="flex justify-between">
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
      </Container>
    </header>
  );
};
export default Header;
