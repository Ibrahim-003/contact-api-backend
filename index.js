//USING EXPRESS
const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());

// app.use((request, response, next) => {
//     console.log(request.method);
//     console.log(request.path);
//     console.log(request.body);
//     console.log("------");

//     next();
// })

let contacts = [
  {
    name: "John Doe",
    phoneNumber: "12345",
    id: 1,
  },
  {
    name: "Jane Smith",
    phoneNumber: "67890",
    id: 2,
  },
  {
    name: "Mike Johnson",
    phoneNumber: "54321",
    id: 3,
  },
  {
    name: "Emily Davis",
    phoneNumber: "09876",
    id: 4,
  },
  {
    name: "Chris Wilson",
    phoneNumber: "13579",
    id: 5,
  },
  {
    name: "Sarah Thompson",
    phoneNumber: "24680",
    id: 6,
  },
  {
    name: "David Brown",
    phoneNumber: "98765",
    id: 7,
  },
  {
    name: "Hensei Yusaki",
    phoneNumber: "11111",
    id: 8,
  },
  {
    name: "Argenis",
    phoneNumber: "99231",
    id: 9,
  },
  {
    name: "Ibrahim",
    phoneNumber: "99911",
    id: 10,
  },
  {
    name: "Waldemar",
    phoneNumber: "99911",
    id: 11,
  },
];

let counter = 0;

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/contacts", (request, response) => {
  response.json(contacts);
});

app.get("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    response.json(contact);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);

  response.status(204).end();
});

const generatedId = () => {
  const maxId =
    contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.id))
      : 0;

  return maxId + 1;
};

app.post("/api/contacts", (request, response) => {
  const contact = request.body;

  if (!contact.phoneNumber || !contact.name) {
    return response.status(400).json({
      error: "Name or phone number missing",
    });
  }

  const newContact = {
    name: contact.name,
    phoneNumber: contact.phoneNumber,
    id: generatedId(),
  };

  contacts = [...contacts, newContact];
  response.json(contact);
});

app.use((request, response) => {
    console.log(request.path);
    response.status(404).json({
        error: "Not found"
    })
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
