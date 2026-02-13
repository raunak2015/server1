const express = require("express");

const app = express();



const data = [
    {
        "studentName": "ABDUL HAQUE",
        "University": "SUxCG 714",
        "UniversityUID": "108444"
    },
    {
        "studentName": "ADITYA KUMAR",
        "University": "SUxCG 702",
        "UniversityUID": "108716",
    },
    {
        "studentName": "AMAN KUMAR",
        "University": "SUxCG 702",
        "UniversityUID": "108500"
    },
    {
        "studentName": "AMRIT RAJ",
        "University": "SUxCG 702",
        "UniversityUID": "108587"
    },
    {
        "studentName": "Jay Patel",
        "University": "SUxCG 714",
        "UniversityUID": "108540"
    },

]

app.get("/", (req, res) => {
    res.send("Express server is running");
});
app.get("/cg/students", (req, res) => {
    res.send(data);
});
app.get("/cg/students/id/:UniversityUID", (req, res) => {
  const userId = (req.params.UniversityUID);
  const user = data.find(u => u.UniversityUID === userId);

  if (!user) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(user);
});
app.get("/cg/students/name/:studentName", (req, res) => {
  const userId = (req.params.studentName).toLowerCase();
  const user = data.find(u => u.studentName.toLowerCase() === userId);

  if (!user) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(user);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});