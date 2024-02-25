import {
    Outlet,
    Link,
    useLoaderData,
    Params,
    Form,
} from "react-router-dom";
  
const contacts = [
    {
        id: "ryan",
        first: "Ryan",
        last: "Florence",
        favorite: true,
        },
        {
        id: "michael",
        first: "Michael",
        last: "Jackson",
        favorite: true,
        },
        {
        id: "tyler",
        first: "Tyler",
        last: "McGinnis",
        favorite: true,
        },
        {
        id: "kyle",
        first: "Kyle",
        last: "Simpson",
        favorite: true,
        },
        {
        id: "kent",
        first: "Kent",
        last: "Dodds",
        favorite: false,
    }
];
  
export async function loader({ params }: Params<string>) {
    // if (!contact) {
    //     throw new Response("", {
    //       status: 404,
    //       statusText: "Not Found",
    //     });
    //   }
    
  return { contacts };
}

export async function action() {
    const contact = {
        id: `${contacts?.length + 1}`,
        first: "Your",
        last: "Name",
        favorite: true,
    };
    contacts.push(contact);
    return { contact };
  }
  /* other code */
  
  export default function Root() {
    const { contacts }:any = useLoaderData();
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          {/* other code */}
  
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact:any) => (
                  <li key={contact.id}>
                    <Link to={`contacts/${contact?.id}`}>
                      {contact?.first || contact?.last ? (
                        <>
                          {contact?.first} {contact?.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
          {/* other code */}
        </div>
      </>
    );
  }