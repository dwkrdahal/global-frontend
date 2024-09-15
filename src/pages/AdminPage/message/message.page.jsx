import { useEffect, useState } from "react";
import { PageTitle } from "../../../components/admin";

const URL = import.meta.env.VITE_APP_URL;
const token = localStorage.getItem("user_token");

function MessagePage() {
  const dummyMsg = {
    id: 11233,
    senderName: "harimaya",
    senderPhone: "0i010414",
    message: "hello this is manual check",
  };

  const [message, setMessage] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const result = await fetch(`${URL}/message`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await result.json();
    setMessage(data.result);
  };
  return (
    <>
      <div className="container px-4">
        <PageTitle title="Messages" breadCrumbs={[{ name: "messages" }]} />

        <h5> Messages</h5>
        {message && message.length > 0 ? (
          <section id="messages" className="card mb-4">
            <div className="table responsive table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>sender</th>
                  <th>phone</th>
                  <th>email</th>
                  <th>message</th>
                  <th>is Resolved</th>
                </tr>
              </thead>

              {/* TODO: Run loop here */}
              <tbody>
                {message.map((msg, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{msg.senderName}</td>
                    <td> {msg.senderPhone} </td>
                    <td> {msg.senderEmail} </td>
                    <td> {msg.message} </td>
                    <td> {msg.isResolved ? "No" : "Yes"} </td>
                  </tr>
                ))}
              </tbody>
            </div>
          </section>
        ) : (
          <p className="text-center text-danger">
            you have not received any messages yet
          </p>
        )}
      </div>
    </>
  );
}

export default MessagePage;
