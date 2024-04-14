import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link className="block py-2 px-3 font-light rounded md:bg-transparent hover:bg-green-bg transition-colors md:text-green-t" href={href}>
            {label}
          </Link>
        </li>
      );
    });

  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
      <nav className="fixed top-0 z-50 w-full bg-green-hd">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end ml-20">
              <a
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-t">
                  awsfanbois
                </span>
              </a>
            </div>
            <ul className="flex flex-col font-medium rounded-lg md:space-x-8 md:flex-row text-green-t">
              {links}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
