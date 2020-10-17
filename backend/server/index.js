const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const moment = require("moment");
const bcrypt = require('bcrypt');

// Cost factor for encryption algo
const saltRounds = 10;

//middleware
app.use(cors());
app.use(express.json());

// Images
app.get('/images/:name', async (req, res) => {

    res.sendFile(path.join(__dirname, "../images", req.params.name));
})

//ROUTES//
//----------------------User Story 1---------------------------------------
//-Get 3 projets a mettre sur la page principale
app.get("/Accueil", async (req, res) => {
    try {
        // Hard-coded project code
        const projectInfo = await pool.query("SELECT * from project WHERE code between 1 and 3");
        res.json(projectInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//---------------------User Story 2---------------------------------------
//-Get tout les projets pour mettre sur la page projets
app.get("/Projets", async (req, res) => {
    try {
        // Hard-coded project code
        const projectInfo = await pool.query("SELECT * from project");
        res.json(projectInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//--------------------User Story 3 et 4------------------------------------
//create  a user
//Il reste a gérer l'erreur dans le cas ou la contrainte de l'email unique est brisé
app.post("/utilisateur", async (req, res) => {
    try {
        const {nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays, password} = req.body;
        const newUser = await pool.query("INSERT INTO utilisateur (nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays) VALUES($1, $2 ,$3 ,$4 ,$5 ,$6 ,$7, $8, $9, $10) RETURNING *",
            [nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays]
        );
        res.json(newUser.rows[0]);

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            await pool.query("INSERT INTO login (username, password, user_id) VALUES($1, $2 ,$3)",
                [email, hash, newUser.rows[0].user_id]);
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.error(err.message); //TODO Add stronger handling
        } else {
            console.error(err.message);
        }
    }
})

//create  a member
//il va falloir aller chercher le user_id grace a la variable de session
app.post("/utilisateur/membre", async (req, res) => {
    try {
        const {user_id} = req.body;
        const adhesion = new Date();
        const statutAdhesion = "Actif";
        const newMember = await pool.query("INSERT INTO member (user_id, adhesion, statutAdhesion) VALUES($1, $2 ,$3) RETURNING *",
            [user_id, adhesion, statutAdhesion]
        );
        res.json(newMember.rows[0]);
        const hello = "";
    } catch (err) {
        console.error(err.message);
    }
})

//---------------------User Story 5------------------------------------
// User story 5
// Get all the user/passwords to validate the info. If a single row is returned from the query, the user is validate.
// If validated, return true, else, false.
const crypto = require('crypto');


const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

const authTokens = {};

app.post("/login", async (req, res) => {
  /*Attention !
  * Il n'y a aucune validation/sanitation d'input. Requete a risque d'injection.*/
  const { username, password } = req.body;
  let login;
  
  try {
    //Find the login
    login = await pool.query("SELECT password, user_id FROM login WHERE USERNAME=$1", [username]);    
  } catch (err) {
    console.error(err.message);
  }
  
  if (!login || !login.rowCount) {
    console.log('check login ***')
    res.status(401).json({
      message: 'Invalid username or password',
    });
    return;
  }

  const userLogin = {
    userID: login.rows[0].user_id,
    username: login.rows[0].username,
    password: login.rows[0].password,
  }
  
  //Check Password  
  let authToken;
  bcrypt.compare(password, userLogin.password, async (err, result) => {
    if (!result) {
      console.log('bcrypt ***')
      res.status(401).json({
        message: 'Invalid username or password',
      });
      return;
    }

    authToken = generateAuthToken();
    authTokens[authToken] = userLogin
    console.log('Token'+authToken)

    // Create error
    // UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    //res.cookie('Authtoken', authToken);
  });
  
  // TODO find user
  try {
    const user = await pool.query("SELECT * FROM utilisateur WHERE user_id=$1", [userLogin.userID]);
    console.log('Find user***')
    res.json({
      user: user.rows[0],
      token: authToken,
    });
  } catch (err) {
    console.error(err.message);
  }

});



    



// create user space. Get all the value necessary using the username.
app.put("/welcomePage/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;

        const userInfo = await pool.query("SELECT UTILISATEUR.nom, UTILISATEUR.prenom, UTILISATEUR.user_id, " +
            "member.statutadhesion FROM UTILISATEUR INNER JOIN member ON member.user_id=utilisateur.user_id WHERE utilisateur.user_id=$1", [userID]);
        //console.log(userInfo.rows.length);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
        console.error(err.message);
    }
})

app.put("/userSpace/:userID", async (req, res) => {

    try {
        const userID = req.params.userID;
        const userInfo = await pool.query("Select * FROM UTILISATEUR INNER JOIN login ON UTILISATEUR.user_id=login.user_id where login.user_id =$1", [userID]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Add project


//---------------------User Story 6------------------------------------
//Trouver les compte rendu d'un projet
app.get("/report/:code", async (req, res) => {
    try {
        const codeProjet = req.params.code;
        const reportInfo = await pool.query("SELECT * from report where projet = $1", [codeProjet]);

        res.json(reportInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//List de projet d'un membre
// Get the list of the project of a certain member with given userID and return the list.

app.put("/userSpaceProjetList/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        const projetInfo = await pool.query("SELECT * FROM PROJECT inner join participant on  participant.projet=project.code inner join login on login.user_id=participant.user_id WHERE login.user_id=$1", [userID]);
        res.json(projetInfo.rows);
        //console.log(projetInfo.rows.length);
    } catch (err) {

        console.error(err.message);
    }
})

//---------------------User Story 7------------------------------------
//Ajouter project

app.post("/ajoutProjet/:titre/:descCourte/:sommaire/:startDate/:endDate/:responsable", async (req, res) => {
    try {
        const titre = req.params.titre;
        const descCourte = req.params.descCourte;
        const sommaire = req.params.sommaire;
        const debutestime = moment(req.params.startDate).format("YYYY-MM-DD");
        const finestime = moment(req.params.endDate).format("YYYY-MM-DD");
        const statutprojet = 'proposé';
        const budget = 0;
        const totalfondscoll = 0;
        const totaldepense = 0;
        const {image} = req.body;
        console.log(req.body);
        const debutreel = moment(req.params.endDate).format("YYYY-MM-DD");
        const debutfin = moment(req.params.endDate).format("YYYY-MM-DD");
        const etatavancement = '';
        const responsable = req.params.responsable;
        // Check if the update is successful. If the difference between number of total project line before and after the commit
        // is one then the commit is successful. If commit is successful, return true, else false

        const oldProjectQuery = await pool.query("select * from project");
        await pool.query("INSERT INTO project (titre, description, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, responsable) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)  RETURNING *",
            [titre, descCourte, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, responsable])
        // GET THE ID OF CREATED PROJECT

        const projetInfo = await pool.query("SELECT code FROM PROJECT WHERE PROJECT.titre = $1 AND PROJECT.description = $2 AND PROJECT.sommaire = $3", [titre, descCourte, sommaire]);
        const projectID = projetInfo.rows[0].code;
        // Updating the participant table
        await pool.query("INSERT INTO PARTICIPANT (projet, user_id, comite) VALUES ($1, $2, $3)", [projectID, responsable, "Responsible"]);
        const newProjectQuery = await pool.query("select * from project");
        if (newProjectQuery.rows.length - oldProjectQuery.rows.length === 1) {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (err) {
        console.error(err.message);
    }
})

//Trouver tout les membres de la bdd qui ne sont PAS deja dans le comité

app.get("/allMembers/:projectID", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const userInfo = await pool.query("SELECT DISTINCT (u.user_id, u.nom, u.prenom)FROM utilisateur u " +
            "inner join member m on u.user_id = m.user_id where m.user_id NOT IN (" +
            "select p.user_id from participant p where p.projet=1" +
            " group by p.user_id)", [codeProjet]);
        res.json(userInfo.rows);
        console.log(userInfo.rows)
    } catch (err) {
        console.error(err.message);
    }
})


//Trouver tout les bénévoles de la bdd qui ne sont PAS deja dans le comité

app.get("/allBenevoles/:projectID", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const userInfo = await pool.query("SELECT DISTINCT (user_id, nom, prenom)FROM utilisateur where user_id NOT IN (" +
            "select p.user_id from participant p where p.projet=1" +
            " group by p.user_id)", [codeProjet]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Créer un participant (ajouter un membre au comité)
app.post("/AjouterMembre", async (req, res) => {
    try {

        const {code, user_id} = req.body;
        const role = "Membre"
        const newComite = await pool.query("INSERT INTO participant (projet, user_id, comite) VALUES($1, $2 ,$3) RETURNING *",
            [code, user_id, role]
        );
        res.json(newComite.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Créer un participant (ajouter un benevole au comité)
app.post("/AjouterBenevole", async (req, res) => {
    try {

        const {code, user_id} = req.body;
        const role = "Benevole"
        const newComite = await pool.query("INSERT INTO participant (projet, user_id, comite) VALUES($1, $2 ,$3) RETURNING *",
            [code, user_id, role]
        );
        res.json(newComite.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})


// Detail of a specific project
app.post("/projectDetail:projectID", async (req, res) => {
    try {

        const projectID = req.params.projectID;
        const projectDetail = await pool.query("SELECT * FROM PROJECT WHERE PROJECT.code = $1", [projectID]);
        res.json(projectDetail.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Afficher tout les membre d'un projet

app.get("/VoirMembreProjet/:projectID", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const role = 'Member';
        const participantInfo = await pool.query("SELECT Utilisateur.nom, UTILISATEUR.PRENOM from UTILISATEUR INNER JOIN participant "
            + "ON participant.user_id=UTILISATEUR.user_id WHERE participant.projet = $1 and participant.comite = $2 ", [codeProjet, role]);
        res.json(participantInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Afficher tout les benevoles d'un projet

app.get("/VoirBenevoleProjet/:projectID", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const role = 'benevole';
        const participantInfo = await pool.query("SELECT Utilisateur.nom, UTILISATEUR.PRENOM from UTILISATEUR INNER JOIN participant "
            + "ON participant.user_id=UTILISATEUR.user_id WHERE participant.projet = $1 and participant.comite = $2 ", [codeProjet, role]);
        res.json(participantInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Supprimer un participant d'un projet

app.delete("/SupprimerParticipant/:code/:id", async (req, res) => {
    try {
        const {projet, id} = req.params;
        const deleteParticipant = await pool.query("DELETE FROM participant WHERE projet = $1 and user_id = $2", [projet, id]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});


//get member info

app.get("/member/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const userInfo = await pool.query("SELECT adhesion, statutAdhesion from member WHERE user_id = $1", [id]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//create a donation


/*POST new fundraising */
app.post('/projects/:projectId/campaign', async (req, res) => {
  //Check data received
  const errors = [];

  if (!req.body.begin) {
    errors.push('No start date provided');
  }

  if (!req.body.end) {
    errors.push('No end date provided');
  }

  if (!req.body.goal) {
    errors.push('No amount provided');
  }

  //Create new campaign
  const newCampaign = {
    projectId: req.body.projectId,
    start: req.body.start,
    end: req.body.end,
    goal: req.body.goal
  };

  const sql = 'INSERT INTO fundraising (projet, debut, fin, objectif) VALUES ($1,$2,$3,$4)';
  const params = Object.keys(newCampaign).map((key) => {
    return newCampaign[key];
  });

  try {
    await pool.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({error: err.message});
        return;
      }
      res.json({
        message: "success",
        campaign: {
          ...newCampaign,
          id: this.lastID,
        },
      });
    });
  } catch (error) {

  }
});


/* GET current campaign for a project */
app.get('/projects/:projectId/campaign', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const result = await pool.query("SELECT * FROM fundraising WHERE projet = $1 AND fin > NOW()", [projectId]);
    if (!result || !result.rowCount) {
      res.json({
        message: "No current campaign",
        campaign: null,
      });
      return;
    }
    
    res.json({
      message: "Campaign found",
      campaign: result.rows[0]
    });
  } catch(error) {
    res.status(500).json({error: error.message});
  }
});


/* GET donations for a project */
app.get('/projects/:projectId/donations', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const result = await pool.query("SELECT * FROM don WHERE fundraising IN (SELECT fundraising_id FROM fundraising WHERE projet = $1)", [projectId]);
    if (!result || !result.rowCount) {
      res.json({
        message: "No Donations",
        donations: [],
      });
      return;
    }
    
    res.json({
      message: "Donations found",
      donations: result.rows[0]
    });
  } catch(error) {
    res.status(500).json({error: error.message});
  }
});


app.listen(5000, () => {
    console.log("server has started on port 5000")
});

