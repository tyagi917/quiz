// import React from 'react';
import ReactDOM from 'react-dom';
import React,{Component} from  'react';
import "./assets/style.css";
import quizService from "./quizService/index.js";
import QuestionBox from "./component/QuestionBox.js";
import Result from "./component/Result.js"

//import App from './App';
import * as serviceWorker from './serviceWorker';
class QuizBee extends Component {
	state={
		questionBank:[],
		score:0
		
	};
	getQuestion=()=>{
		quizService().then(question=>{
			this.setState({
				questionBank:question,
				score:0,
				response:0
			})

		})
	}
	computeAnswer=(answers,correctanswer)=>{
		if(answers==correctanswer)
		{
			this.setState({
				score:this.state.score+1

			})
		}
		this.setState({
			response:this.state.response<5?this.state.response+1:5
		})
	}
	playAgain=()=>{
		this.getQuestion();
		this.setState({
			score:0,
			response:0
		})

	}
	componentDidMount()
	{
		this.getQuestion();
	}
	render(){
		return (
		<div className="container">
		<div className="title">QuizBee</div>
		{this.state.questionBank.length>0&&this.state.response<5&& this.state.questionBank.map(({question,answers,correct,questionId})=>
		<QuestionBox question={question} options={answers} key={questionId}
		selected={answer=>this.computeAnswer(answer,correct)}
		/>

		)}
		{this.state.response===5?(<Result score={this.state.score} playAgain={this.playAgain}/>):null}
		</div>
			);

	}
}

ReactDOM.render(
  <React.StrictMode>
    <QuizBee />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
