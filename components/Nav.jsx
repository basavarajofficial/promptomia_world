"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
} from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);



  return (
    <nav className="flex-between w-full md-16 pt-3">
      <Link href="/" className="flex gap-2 flex-cenetr">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptomia logo"
          className="object-contain"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>


      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn"
            onClick={() => {
              signOut();
            }}>
              Sign Out
            </button>

            <Link href="profile">
              <Image
              alt="Promptomia logo"
              src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile device */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
            alt="Promptomia logo"
              src={session?.user.image}
              className="rounded-full"
              width={30}
              height={30}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href='/profile'
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link href='/create-prompt'
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button type="button" 
                className="mt-5 w-full black_btn"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}>
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
                  type="button"
                  className="black_btn"
                  key={provider}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
