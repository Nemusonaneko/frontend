"use client";

import React from "react";
import { themeList } from "../../theme/_list";
import { toast } from "react-hot-toast";

function setEvent(e: any) {
  var newThemeI = themeList.find(
    (a) => a.identifier === (e?.target?.value || e)
  )?.identifier;
  if (!newThemeI) return;
  // console.log("changing theme from to", newThemeI);
  toast.loading(`Changing theme to ${newThemeI}.`);

  /* remove old theme */
  document.documentElement.classList.remove(
    ...themeList.map((t) => t.identifier)
  );

  /* add new theme */
  document.documentElement.classList.add(newThemeI);
  localStorage.setItem("user.theme.identifier", newThemeI);
  toast.success(`Changed theme to ${newThemeI}.`);
}

function Icon(props: any) {
  return (
    <svg
      className="themeActivator text-[color:var(--bg3)] hover:text-[color:var(--text)]"
      {...props}
      width="24px"
      fill="currentColor"
      viewBox="0 0 32 32"
      version="1.1"
    >
      <path d="M20 8h-4v-4h4v4zM28 16v-4h-4v4h4zM28 24v-4h-4v4h4zM8 4v4h4v-4h-4zM20 16h4v4h-4v8h-16v-16h8v-4h4v4h4v4zM16 16h-8v8h8v-8zM28 4h-4v4h4v-4zM20 8v4h4v-4h-4z"></path>
    </svg>
  );
}

function ThemeCard({ theme }: { theme: any }) {
  return (
    <>
      <div
        className={
          theme.identifier +
          " themeCard flex flex-col text-center bg-[color:var(--bg0)] outline-8"
        }
        title={theme.desc}
        onClick={() => setEvent(theme.identifier)}
      >
        <p className="text-[color:var(--text)]">{theme.name}</p>

        <div className="themeCardColours-fr h-2/4 flex flex-col justify-center align-center mt-5">
          <div className="inline-flex flex-row mx-auto">
            <span className="block bg-[color:var(--bg0)]"></span>
            <span className="block bg-[color:var(--bg1)]"></span>
            <span className="block bg-[color:var(--bg2)]"></span>
            <span className="block bg-[color:var(--bg3)]"></span>
            <span className="block bg-[color:var(--text)]"></span>
            <span className="block bg-[color:var(--darktext)]"></span>
          </div>
          <div className="themeCardColours-lr inline-flex flex-row mx-auto">
            <span className="block bg-[color:var(--red)]"></span>
            <span className="block bg-[color:var(--orange)]"></span>
            <span className="block bg-[color:var(--yellow)]"></span>
            <span className="block bg-[color:var(--green)]"></span>
            <span className="block bg-[color:var(--blue)]"></span>
            <span className="block bg-[color:var(--purple)]"></span>
          </div>
        </div>
      </div>
    </>
  );
}

function ThemeCards({ setOpen }: { setOpen: any }) {
  return (
    <div
      id="ThemeCards"
      className="flex flex-wrap justify-center border-box"
      onClick={() => setOpen(false)}
    >
      {themeList.map((theme, idx) => (
        <ThemeCard theme={theme} key={idx} />
      ))}
    </div>
  );
}

export default function ThemeSwitcher() {
  var [isOpen, setOpen] = React.useState<boolean>(false);

  React.useEffect(function () {
    console.log("themes", themeList);

    if (localStorage.getItem("user.theme.identifier") === null) {
      localStorage.setItem("user.theme.identifier", "original");
    }

    // UI starts with class original to make sure page doesnt flashbang the user
    document.documentElement.classList.remove("original");
    document.documentElement.classList.add(
      localStorage.getItem("user.theme.identifier") ?? "original"
    );
  }, []);

  return (
    <>
      <Icon
        onClick={() => {
          setOpen((o) => !o);
        }}
      />
      <div
        id={`theme_switcher_${isOpen ? "open" : "closed"}`}
        style={isOpen ? {} : { top: "-100vh" }}
        className="fixed left-1/2"
      >
        <ThemeCards setOpen={setOpen} />
      </div>
    </>
  );
}
/*
    <div id={`theme_switcher_${isOpen?"open":"closed"}`} style={isOpen?{}:{top:"-50px"}} className="fixed left-1/2">
      <select id={`stheme-${theme}`} onChange={setEvent} value={theme} className="text-black bg-white">
        {themeList.map( (theme, idx) =>
          <option
            key={theme.identifier}
            value={theme.identifier}
          >{theme.name}</option>
        )}
      </select>
    </div>
*/
