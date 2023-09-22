import { Router } from "express";
import { dashboardPage, homePage, loginPage, registerPage } from "../services/renderServices.js";
import { authorizeLogin, authorizeToken } from "../services/authServices.js";

const appRoutes = Router({ mergeParams: true });

const moduleData = {
    laws: [
        {
            name: 'Child is in danger!',
            id: 1,
            thumbnail: 'some source'
        },
        {
            name: 'Child protection',
            id: 2,
            thumbnail: 'some source'
        },
    ]
}

const questionData = {
    1: {
        question: `If you witnessed a teacher misbehaving with a student, and you want to take action to protect the student's rights. Which law in India should you use to file a case in this situation?`,
        answers: {
            1: {
                option: 'Right to Information Act',
                isAnswer: false
            },
            2: {
                option: 'POCSO Act',
                isAnswer: true
            },
            3: {
                option: 'Motor Vehicles Act',
                isAnswer: false
            },
            4: {
                option: 'Income Tax Act',
                isAnswer: false
            },
        }
    },
    2: {
        question: `What is the primary goal of the Convention on the Rights of the Child (CRC)?`,
        answers: {
            1: {
                option: 'To protect the rights of adults',
                isAnswer: false
            },
            2: {
                option: 'To ensure that children receive gifts and privileges',
                isAnswer: false
            },
            3: {
                option: 'To promote and protect the rights of all children',
                isAnswer: true
            },
            4: {
                option: 'To limit the rights of children',
                isAnswer: false
            },
        }
    },
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
        questionVideo: `/videos/modules/${moduleID}/${lawID}/ques-1.mp4`,
        choicesVideos: {
            1: `/videos/modules/${moduleID}/${lawID}/ans-1.mp4`,
            2: `/videos/modules/${moduleID}/${lawID}/ans-2.mp4`,
            3: `/videos/modules/${moduleID}/${lawID}/ans-3.mp4`,
            4: `/videos/modules/${moduleID}/${lawID}/ans-4.mp4`,
        }
    }
    res.render("law", { lawData, lawID, questionData: questionData[lawID] });
});

export default appRoutes;