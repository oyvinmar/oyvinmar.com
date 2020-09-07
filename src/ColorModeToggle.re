open ColorModeContext;

[@react.component]
let make = () => {
  let (mode, dispatch) = useColorMode();

  <button
    className="focus:outline-none absolute right-0 top-0 mr-5 mt-6"
    onClick={_ => {dispatch(Toogle)}}>
    {switch (mode) {
     | Dark => <Sun className="fill-current" />
     | Light => <Moon />
     }}
  </button>;
};
