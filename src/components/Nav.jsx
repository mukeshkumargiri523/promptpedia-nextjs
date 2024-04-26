"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logoImage from "../assets/prompt_icon1.jpg";

function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const settingProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    settingProviders();
  }, []);
  return (
    <nav className="flex-between pb-2 bg-rose-500 w-full mb-16 pt-3 px-4">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logoImage}
          alt="promptpedia logo"
          width={30}
          height={30}
          className="object-contain rounded-full"
        />
        <p className="logo_text">Promptpedia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt{" "}
            </Link>
            <button onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <div className="border-solid  border-4 border-l-rose-200 rounded-full">
                <Image
                  src={session?.user?.image}
                  width={38}
                  height={38}
                  className="rounded-full "
                  alt="profile"
                />
              </div>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div className="border-solid  border-4 border-l-rose-200 rounded-full">
              <Image
                src={session?.user?.image}
                width={38}
                height={38}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropDown((prev) => !prev)}
              />
            </div>
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(providers.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
