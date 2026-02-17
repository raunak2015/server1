const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const users = [
    {
        att: '80',
        uid: 108243,
        tatal_sub: 14,
        bouns: '20',
        name: 'Dax'
    },
    {
        att: '85',
        uid: 108285,
        tatal_sub: 14,
        bouns: '15',
        name: 'Abdul'
    },
    {
        att: '80',
        uid: 108250,
        tatal_sub: 14,
        bouns: '25',
        name: 'Himmat'
    }
];


app.get("/user/:uid", (req, res) => {

    const uid = Number(req.params.uid);

    const user = users.find(i => i.uid === uid);

    if (!user) {
        return res.status(404).json({ message: "User not found!!" });
    }

    res.status(200).json(user);
});


app.put("/user/:uid", (req, res) => {

    const userId = Number(req.params.uid);

    const index = users.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        uid: userId,
        name: req.body.name,
        att: req.body.att,
        tatal_sub: req.body.tatal_sub,
        bouns: req.body.bouns
    };

    res.status(200).json({
        message: "User replaced successfully",
        user: users[index]
    });
});

app.post("/user", (req, res) => {
    const newUser = {
        uid: req.body.uid,
        name: req.body.name,
        att: req.body.att,
        tatal_sub: req.body.tatal_sub,
        bouns: req.body.bouns
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});

app.patch("/user/:uid", (req, res) => {

  const userId = Number(req.params.uid);

  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name !== undefined) user.name = req.body.name;
  if (req.body.att !== undefined) user.att = req.body.att;
  if (req.body.tatal_sub !== undefined) user.tatal_sub = req.body.tatal_sub;
  if (req.body.bouns !== undefined) user.bouns = req.body.bouns;

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});


app.delete("/user/:uid", (req, res) => {

  const userId = Number(req.params.uid);

  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const deletedUser = users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser[0]
  });

});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
