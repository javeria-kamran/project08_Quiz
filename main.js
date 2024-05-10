import inquirer from "inquirer";
let apilink = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
async function fetchdata(data) {
    let fetchquiz = await fetch(data);
    let quiz = await fetchquiz.json();
    return quiz.results;
}
let data = await fetchdata(apilink);
async function startquiz() {
    let score = 0;
    let fname = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "What is your name"
    });
    for (let i = 1; i < 5; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answer.map((val) => val)
        });
        if (ans.quiz === data[i].correct_answer) {
            ++score;
            console.log("correct answer");
        }
        else {
            console.log(data[i].correct_answer);
        }
        console.log(`Dear ${fname.fname} your score is ${score} out of ${"5"}`);
    }
}
startquiz();
