import React, { useState } from "react";

export default function App() {
  return (
    <div className="relative lg:grid lg:grid-cols-2">
      <Info />

      <div className="lg:min-h-screen flex justify-center items-center py-20 px-10 bg-green-500 text-green-100">
        <div className="max-w-xl mx-auto">
          {/* create a secret message */}
          {/* input: secret message */}
          {/* input: passphrase */}
          <h2 className="text-3xl font-bold mb-2 text-white">
            Create a Secret
          </h2>
          <CreateSecretForm />
        </div>
      </div>
      <div className="lg:min-h-screen flex justify-center items-center py-20 px-10 bg-blue-500 text-blue-100">
        <div className="max-w-xl mx-auto">
          {/* input: hash */}
          {/* input: passphrase */}
          {/* show: secret message */}
          <h2 className="text-3xl font-bold mb-2 text-white">Show a Secret</h2>
          <ShowSecretForm />
        </div>
      </div>
    </div>
  );
}

function CreateSecretForm() {
  const [message, setMessage] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [secretId, setSecretId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      "https://python-ots-app-8p2lv.ondigitalocean.app/secrets",
      {
        method: "POST",
        data: JSON.stringify({ message, passphrase }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();

    // now we have a hash/id from the api
    // display that to the user so they can give that to friends
    setSecretId(data.id);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="font-bold text-xs mb-1">What's Your Secret?</label>
        <textarea
          className="w-full p-2 rounded mb-2 text-gray-800"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
          {message}
        </textarea>

        <label className="font-bold text-xs mb-1">Passphrase</label>
        <input
          className="w-full p-2 rounded mb-4 text-gray-800"
          type="text"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />

        <button className="py-4 px-6 rounded bg-yellow-400 text-yellow-900 text-lg">
          Create My Secret
        </button>
      </form>

      {/* success message */}
      {secretId && (
        <div className="bg-white text-gray-800 p-4 rounded shadow mt-10">
          <p>
            Your secret message ID is{" "}
            <strong className="text-blue-400 font-bold">{secretId}</strong>.
          </p>
        </div>
      )}
    </>
  );
}

function ShowSecretForm() {
  const [id, setId] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [secretMessage, setSecretMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      `https://python-ots-app-8p2lv.ondigitalocean.app/secrets/${id}`,
      {
        method: "POST",
        data: JSON.stringify({ id, passphrase }),
      }
    );
    const data = await res.json();

    // now we have a hash/id from the api
    // display that to the user so they can give that to friends
    alert(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="font-bold text-xs mb-1">
          What is your secret ID?
        </label>
        <input
          className="w-full p-2 rounded mb-4 text-gray-800"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <label className="font-bold text-xs mb-1">
          What is the passphrase?
        </label>
        <input
          className="w-full p-2 rounded mb-4 text-gray-800"
          type="text"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />

        <button className="py-4 px-6 rounded bg-red-400 text-red-900 text-lg">
          Show My Secret
        </button>
      </form>

      {/* show the secret message */}
      {secretMessage && (
        <div className="bg-white text-gray-800 p-4 rounded shadow mt-10">
          <p className="mb-3">
            Your secret message is{" "}
            <strong className="text-blue-400 font-bold">{secretMessage}</strong>
            .
          </p>
        </div>
      )}
    </>
  );
}

function Info() {
  return (
    <div className="bg-white rounded shadow-2xl absolute top-0 right-0 mr-8 mt-8 p-5">
      <h2 className="font-bold text-xl mb-4">One Time Secret App</h2>

      <p>
        A demo app built to showcase{" "}
        <a href="https://www.digitalocean.com/products/app-platform/">
          DigitalOcean App Platform
        </a>
        .
      </p>
    </div>
  );
}
