import { Router } from "express";
import { dashboardPage, homePage, loginPage, registerPage } from "../services/renderServices.js";
import { authorizeLogin, authorizeToken } from "../services/authServices.js";

const appRoutes = Router({ mergeParams: true });

const moduleData = {
    laws: [
        {
            name: 'Some law name',
            id: 1,
            thumbnail: 'some source'
        },
        {
            name: 'Some other law name',
            id: 2,
            thumbnail: 'some source'
        },
        {
            name: 'Nammaloda law',
            id: 3,
            thumbnail: 'some source'
        },
    ]
}

appRoutes.get("/", homePage);
appRoutes.get("/login", authorizeLogin, loginPage);
appRoutes.get("/register", authorizeLogin, registerPage);

appRoutes.get("/dashboard", authorizeToken, dashboardPage);
appRoutes.get("/dashboard/modules/:moduleId", authorizeToken, (req, res) => {
    const moduleID = req.params.moduleId;
    // console.log(moduleID);

    // Call DB to check for moduleID then render page like that
    res.render("module", {moduleData});
});
appRoutes.get("/dashboard/modules/:moduleId/:lawId", authorizeToken, (req, res) => {
    const moduleID = req.params.moduleId;
    const lawID = req.params.lawId;
    // console.log(moduleID, lawID);

    // Call DB to check for moduleID then render page like that
    const lawData = {
        lawName: 'Right to chiildren Act',
        scenarioVideo: `/videos/modules/${moduleID}/${lawID}/scenario-1.mp4`,
        questionVideo: `/videos/modules/${moduleID}/${lawID}/scenario-1.mp4`,
        choicesVideos: {
            1: `/videos/modules/${moduleID}/${lawID}/ans-1.mp4`,
            2: `/videos/modules/${moduleID}/${lawID}/ans-2.mp4`,
            3: `/videos/modules/${moduleID}/${lawID}/ans-3.mp4`,
            4: `/videos/modules/${moduleID}/${lawID}/ans-4.mp4`,
        }
    }
    res.render("law", { lawData });
});
export default appRoutes;