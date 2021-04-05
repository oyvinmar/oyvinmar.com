open Utils;

type imageModule = {default: string};

[@bs.module] external profileImage: imageModule = "./img/profile.png";

type action =
  | Hide
  | Toggle;

type menu =
  | Visible
  | Hidden;

type state = {menu};

[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action, state) {
        | (Toggle, Visible) => Hidden
        | (Toggle, Hidden) => Visible
        | (Hide, _) => Hidden
        },
      Hidden,
    );

  React.useEffect1(
    () => {
      let id = ReasonReactRouter.watchUrl(_url => dispatch(Toggle));
      Some(() => ReasonReactRouter.unwatchUrl(id));
    },
    [||],
  );

  let toggleClass =
    switch (state) {
    | Visible => "fixed md:relative inset-0 md:inset-auto pt-32 md:pt-0 bg-white dark:bg-gray-900 z-10"
    | Hidden => "hidden"
    };

  <nav>
    <div className="relative flex justify-between z-20">
      <div className="flex items-center">
        <img
          className="h-12 w-12 mr-4 md:h-14 md:w-14 lg:h-20 lg:w-20 rounded-full"
          alt="Picture of Øyvind Marthinsen"
          src={profileImage.default}
        />
        <a
          href="/"
          className="block text-black no-underline text-xl lg:text-3xl font-extrabold leading-none lg:leading-tight dark:text-gray-300">
          {str({j|Øyvind Marthinsen|j})}
        </a>
      </div>
      <button
        className="block md:hidden" onClick={_event => dispatch(Toggle)}>
        <span className="sr-only"> {str("Toggle navigation")} </span>
        {state === Visible
           ? <svg
               className="fill-current w-4 h-4"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20">
               <path
                 d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
               />
             </svg>
           : <svg
               className="fill-current w-4 h-4"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20">
               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
             </svg>}
      </button>
    </div>
    <ul
      className={fromList([
        "md:flex pl-8 md:pl-16 md:uppercase font-bold md:font-normal text-pink-600 space-y-4 md:space-y-0 md:space-x-6 tracking-tight",
        toggleClass,
      ])}>
      <li> <NavLink href="/"> {str("About me")} </NavLink> </li>
      <li> <NavLink href="/lifestream"> {str("Lifestream")} </NavLink> </li>
      <li> <NavLink href="/elsewhere"> {str("Elsewhere")} </NavLink> </li>
      <li> <NavLink href="/contact"> {str("Contact")} </NavLink> </li>
    </ul>
  </nav>;
};
