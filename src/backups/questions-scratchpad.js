import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Reorder, getItemStyle } from "./utils";
import Answers from "./answer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fake data generator
const getQuestions = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `question-${k}`,
    content: `question ${k}`,
    answers: [`${k}1`, `${k}2`, `${k}3`]
  }));

// const getAnswers = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => {
//     return {
//       id: `answer-${k}`,
//       content: `answer ${k}`
//     };
//   });

const grid = 8;

const iconStyle = {
  float: "left"
};

export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  width: 350
});

export const getAnswerListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 4,
  width: 250
});

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: getQuestions(3)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    console.log(result);
    console.log(this.state.questions);
    // dropped outside the list
    if (!result.destination) {
      console.log("no-change");
      return;
    }

    if (result.type === "QUESTIONS") {
      console.log("Questions");
      const questions = Reorder(
        this.state.questions,
        result.source.index,
        result.destination.index
      );

      this.setState({
        questions
      });
    } else {
      console.log("Answers");
      const answers = Reorder(
        this.state.questions[parseInt(result.type, 10)].answers,
        result.source.index,
        result.destination.index
      );

      const questions = JSON.parse(JSON.stringify(this.state.questions));

      questions[result.type].answers = answers;

      //console.log(answers);

      this.setState({
        questions
      });
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.questions.map((question, index) => (
          <Droppable droppableId={`droppable${index}`} type={`${index}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getAnswerListStyle(snapshot.isDraggingOver)}
              >
                {question.answers.map((answer, index) => {
                  return (
                    <Draggable key={answer} draggableId={answer} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <span {...provided.dragHandleProps}>
                            <FontAwesomeIcon
                              icon={"grip-vertical"}
                              style={iconStyle}
                            />
                          </span>
                          {answer}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    );
  }
}

export default Questions;
