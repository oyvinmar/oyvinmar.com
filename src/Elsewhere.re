open Utils;

let component = ReasonReact.statelessComponent("Elsewhere");

module ListItem = {
  [@react.component]
  let make = (~children, ~href: string) => {
    <li className="flex items-center space-x-4">
      <svg
        className="text-pink-900 fill-current "
        viewBox="0 0 20 20"
        width="20"
        height="20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
          <g id="icon-shape">
            <path
              d="M20,10 C20,4.4771525 15.5228475,0 10,0 C4.4771525,0 9.50500275e-16,4.4771525 6.123234e-16,10 C2.74146524e-16,15.5228475 4.4771525,20 10,20 C15.5228475,20 20,15.5228475 20,10 L20,10 Z M18,10 C18,5.581722 14.418278,2 10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 C14.418278,18 18,14.418278 18,10 L18,10 Z M10,12 L10,8 L5,8 L5,12 L10,12 L10,12 Z M15,10 L10,5 L10,15 L15,10 L15,10 Z"
            />
          </g>
        </g>
      </svg>
      // <svg
      //   xmlns="http://www.w3.org/2000/svg"
      //   className="text-pink-900 fill-current"
      //   viewBox="0 0 24 24"
      //   width="24"
      //   height="24">
      //   <path
      //     d="M6.1 21.98a1 1 0 0 1-1.45-1.06l1.03-6.03-4.38-4.26a1 1 0 0 1 .56-1.71l6.05-.88 2.7-5.48a1 1 0 0 1 1.8 0l2.7 5.48 6.06.88a1 1 0 0 1 .55 1.7l-4.38 4.27 1.04 6.03a1 1 0 0 1-1.46 1.06l-5.4-2.85-5.42 2.85zm4.95-4.87a1 1 0 0 1 .93 0l4.08 2.15-.78-4.55a1 1 0 0 1 .29-.88l3.3-3.22-4.56-.67a1 1 0 0 1-.76-.54l-2.04-4.14L9.47 9.4a1 1 0 0 1-.75.54l-4.57.67 3.3 3.22a1 1 0 0 1 .3.88l-.79 4.55 4.09-2.15z"
      //   />
      // </svg>
      <a href className="text-link"> children </a>
    </li>;
  };
};

[@react.component]
let make = () => {
  <ul className="space-y-6">
    <ListItem href="http://github.com/oyvinmar"> {str("Github")} </ListItem>
    <ListItem href="http://facebook.com/oyvind.marthinsen">
      {str("Facebook")}
    </ListItem>
    <ListItem href="http://twitter.com/oyvinmar"> {str("Twitter")} </ListItem>
    <ListItem href="http://linkedin.com/in/oyvinmar">
      {str("Linkedin")}
    </ListItem>
  </ul>;
};
