import Database from "../Database/index.js";
function AssignmentRoutes(app) {

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = Database.assignments
          .filter((a) => a.course === cid);
        res.send(assignments);
    });
    
    app.put("/api/courses/:cid/assignments/:aid", (req, res) => {
        const { cid, aid } = req.params;
        const assignment = req.body;
        Database.assignments = Database.assignments.map((a) =>
        a._id === aid ? { ...a, ...assignment } : a
        );
        res.sendStatus(204);
    });

    app.delete("/api/courses/:cid/assignments/:aid", (req, res) => {
        const { cid, aid } = req.params;
        Database.assignments = Database.assignments
          .filter((a) => a._id !== aid);
        res.sendStatus(204);
    }); 

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const assignment = { ...req.body,
            _id: new Date().getTime().toString() };
        Database.assignments.push(assignment);
        res.send(assignment);
    });
}
export default AssignmentRoutes;