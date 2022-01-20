import React, { useRef, useState } from 'react';


interface Person {
          firstName: string,

          lastName: string,
};


interface Props {
          text: string,

          ok?: boolean,

          num?: number,

          fn?: () => void, //str, num
          fxn?: (bob: string) => string,

          obj?: {
                    f1: string,

          },

          // anoda obj
          person: Person,

          handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
          
}


/* export const TextField: React.FC<Props> = ({
text, ok, num, fn, fxn, obj, person
}) => {}
*/

interface TextNode {
          text: string,
}



export const TextField: React.FC<Props> = ({ handleChange }) => {
          // const [count, setCount] = useState<number | null | undefined > (5);

          const [count, setCount] = useState<TextNode> ({text: ""});

          const inputRef = useRef<HTMLInputElement>(null);

          const divRef = useRef<HTMLDivElement>(null);

          
          setCount({text: "goodnight"})

          return (
                    <div ref={divRef}>
                              <input  
                                        ref={inputRef} 

                                        onChange={handleChange}
                              />

                              {count} {setCount}
                    </div>
                    
          );
};


// export default TextField;
