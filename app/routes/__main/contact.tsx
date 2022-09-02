import { ReactNode, useEffect, useState } from 'react';

interface ItemProps {
  email?: string;
}

const Email = ({ email }: ItemProps) => {
  return (
    <span className="">
      <a className="text-link space-x-1" href={'mailto:' + email}>
        <svg
          className="inline fill-current"
          height="16"
          width="16"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
            <g>
              <path d="M14.8780488,10.097561 L20,14 L20,16 L13.627451,11.0980392 L10,14 L6.37254902,11.0980392 L0,16 L0,14 L5.12195122,10.097561 L0,6 L0,4 L10,12 L20,4 L20,6 L14.8780488,10.097561 Z M18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 Z" />
            </g>
          </g>
        </svg>
        <span> {email} </span>
      </a>
    </span>
  );
};

const Contact = () => {
  let [email, setEmail] = useState(() => '');
  useEffect(() => {
    setEmail('oyvinmar@gmail.com');
  });
  return (
    <div className="space-y-5">
      <h1> Send me an email? </h1>
      <p>
        You can reach me at: <Email email={email} />
      </p>
    </div>
  );
};

export default Contact;
