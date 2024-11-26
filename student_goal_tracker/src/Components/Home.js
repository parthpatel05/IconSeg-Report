import React, { useEffect, useState } from 'react';
import './Home.css';
import AddGoalForm from './AddGoalForm'; 
import AddCourseForm from './AddCourseForm';

const Home = () => {
  const [info, setInfo] = useState([
    {
      courseName: 'Physics',
      goals: [
        { goalName: 'HW1', details: 'Finish by Sunday', progress: 3, targetDate: generateRandomDate() },
        { goalName: 'Lab Report', details: 'Submit by Tuesday', progress: 4, targetDate: generateRandomDate() },
      ],
    },
    {
      courseName: 'Math',
      goals: [
        { goalName: 'Practice Problems', details: 'Complete Chapter 5', progress: 4, targetDate: generateRandomDate() },
        { goalName: 'Quiz Preparation', details: 'Revise Algebra', progress: 2, targetDate: generateRandomDate() },
      ],
    },
    {
      courseName: 'Chemistry',
      goals: [
        { goalName: 'Organic Worksheet', details: 'Solve 10 problems', progress: 2, targetDate: generateRandomDate() },
        { goalName: 'Lab Safety Quiz', details: 'Review safety measures', progress: 1, targetDate: generateRandomDate() },
      ],
    },
    {
      courseName: 'Computer Science',
      goals: [
        { goalName: 'Debugging Task', details: 'Fix all syntax errors', progress: 3, targetDate: generateRandomDate() },
        { goalName: 'Code Review', details: 'Review peer projects', progress: 2, targetDate: generateRandomDate() },
      ],
    },
  ]);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const handleAddCourseClick = () => {
    setShowAddCourseForm(true);
  };

  const handleSaveCourse = (newCourse) => {
    setInfo((prevInfo) => [...prevInfo, newCourse]);
    setShowAddCourseForm(false);
  };

  const handleCancelAddCourse = () => {
    setShowAddCourseForm(false);
  };
  
  // Function to generate a random date between now and a week from now
  function generateRandomDate() {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 7); // Random number of days from 0 to 6
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() + randomDays);
    
    // Format the date as YYYY-MM-DD
    const formattedDate = randomDate.toISOString().split('T')[0];
    return formattedDate;
  }

  const [selectedGoal, setSelectedGoal] = useState(null); // For toggling goal details view

  // Example sub-goals data for demonstration
  const [subGoals, setSubGoals] = useState([
    { progress: 4 },
    { progress: 1 },
    { progress: 2 },
  ]);

  useEffect(()=>{
    console.log(subGoals);
  }, [subGoals])

  useEffect(()=>{
    console.log(info);
  }, [info])

  // Calculate the total progress dynamically based on sub-goals
  const calculateTotalProgress = () => {
    const maxProgress = subGoals.length * 5; // Assuming each sub-goal has a max progress of 5
    const currentProgress = subGoals.reduce((sum, sg) => sum + sg.progress, 0);
    return Math.round((currentProgress / maxProgress) * maxProgress); // Scale to a 10-point progress bar
  };

  // Handles clicking on a goal to view details
  const handleGoalClick = (goal, course_idx) => {
    const currentProgress = goal.progress * 3;    
    let remaining = currentProgress;
    const p1 = Math.min(5, Math.floor(Math.random() * Math.min(remaining, 5)) + 1);
    remaining -= p1;
    const p2 = Math.min(5, Math.floor(Math.random() * Math.min(remaining, 5)) + 1);
    remaining -= p2;
    const p3 = Math.max(0, Math.min(5, remaining));
    
    setSubGoals([
      { progress: p1 },
      { progress: p2 },
      { progress: p3 },
    ]);
  
    // Select the goal
    setSelectedGoal({...goal, course:info[course_idx].courseName});
  };

  // Handles going back to the main view
  const handleBackClick = () => {
    setSelectedGoal(null);
    
    setSubGoals(null);
  };

  const updateGoalProgress = (courseName, goalName, newProgress) => {
    setInfo(prevInfo =>
      prevInfo.map(course =>
        course.courseName === courseName
          ? {
              ...course,
              goals: course.goals.map(goal =>
                goal.goalName === goalName
                  ? { ...goal, progress: newProgress }
                  : goal
              ),
            }
          : course
      )
    );
  };

  const updateSubGoalProgress = (index, newProgress) => {
    setSubGoals(prevSubGoals =>
      prevSubGoals.map((subGoal, i) =>
        i === index ? { ...subGoal, progress: newProgress } : subGoal
      )
    );
  };

  const handle_sub_goal_progress_change = (idx_goal, idx_progress, correctState=false) =>{
    if (!correctState) {
      return
    }
    
    let total = subGoals[0].progress + subGoals[1].progress + subGoals[2].progress - subGoals[idx_goal].progress + idx_progress+  1;

    const newProgress = Math.floor(total/3);
    console.log(newProgress, total);
    
    updateGoalProgress(selectedGoal.course, selectedGoal.goalName, newProgress)
    updateSubGoalProgress(idx_goal, idx_progress+1)
  }

  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const handleAddGoalClick = () => {
    setShowAddGoalForm(true); // Show the form
  };

  const handleSaveGoal = (courseName, newGoal) => {
    setInfo(prevInfo =>
      prevInfo.map(course =>
        course.courseName === courseName
          ? {
              ...course,
              goals: [...course.goals, newGoal], // Add the new goal to the course
            }
          : course
      )
    );
    setShowAddGoalForm(false); // Hide the form after saving
  };

  const handleCancelAddGoal = () => {
    setShowAddGoalForm(false); // Hide the form without saving
  };

  const [subGoalInfo, setSubGoalInfo] = useState({materials: ["Material 1", "Material 2", "Material 3"], description:"Generated subgoal description", showing:[false, false, false]})

  const handleSubGoalClick = (subGoalIndex, correctState=false) => {
    if (!correctState) {
      return
    }
    setSubGoalInfo((prevState) => {
      // Create a new array for showing with the boolean flipped at the specified index
      const updatedShowing = prevState.showing.map((item, index) =>
        index === subGoalIndex ? !item : item
      );
  
      // Return the updated state
      return {
        ...prevState,
        showing: updatedShowing,
      };
    });
  }


  return (
    <div className="study-manager">

      {showAddGoalForm || showAddCourseForm ? (
        <div>

          {showAddGoalForm? (<AddGoalForm
            courses={info} // Pass courses as a prop
            onSave={handleSaveGoal}
            onCancel={handleCancelAddGoal}
          />):
          (<AddCourseForm
            onSave={handleSaveCourse}
            onCancel={handleCancelAddCourse}
          />)}

        </div>
        
      ) :

        (<div>

          {(selectedGoal === null || subGoals === null) ? (
            <>
              <h1>Study Manager</h1>
              {info.map((course, courseIndex) => (
                <div className="course" key={courseIndex}>
                  <h2>{course.courseName}</h2>
                  {course.goals.map((goal, goalIndex) => (
                    <div
                      className="goal"
                      key={goalIndex}
                      onClick={() => handleGoalClick(goal, courseIndex)} // Open details view on click
                    >
                      <p>{goal.goalName}</p>
                      <div className="progress-bar">
                        {[...Array(5)].map((_, idx) => (
                          <span
                            key={idx}
                            className={idx < goal.progress ? 'filled' : ''}
                          ></span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="add-buttons">
                <button className="add-btn" onClick={handleAddGoalClick}>Add Goal</button>
                <button className="add-btn" onClick={handleAddCourseClick}>Add Course</button>
              </div>
            </>
          ) : (
            <div className="goal-details">
              <h1>Goal Details</h1>
              {/* Total Progress Based on Sub-Goals */}
              <div className="progress-bar">
                {[...Array(15)].map((_, idx) => (
                  <span
                    key={idx}
                    className={idx < calculateTotalProgress() ? 'filled' : ''}
                  ></span>
                ))}
              </div>
              <div className="details-field">
                <p><strong>Course:</strong> {selectedGoal.course}</p>
              </div>
              <div className="details-field">
                <p><strong>Goal Name:</strong> {selectedGoal.goalName}</p>
              </div>
              <div className="details-field">
                <p><strong>Target Date:</strong> {selectedGoal.targetDate}</p>
              </div>
              <div className="description">
                <p><strong>Description:</strong> {selectedGoal.details}</p>
              </div>
              <div className="sub-goals">
                {subGoals.map((subGoal, subGoalIndex) => (
                  <div className="sub-goal" key={subGoalIndex}>
                    <p onClick={() => handleSubGoalClick(subGoalIndex, true)}> <b>Sub Goal {subGoalIndex+1}:</b> Will be generated later by ML model</p>
                    <div className="progress-bar">
                      {[...Array(5)].map((_, idx) => (
                        <span
                          key={idx}
                          className={idx < subGoal.progress ? 'filled' : ''}
                          onClick={() => handle_sub_goal_progress_change(subGoalIndex, idx, true)}
                        ></span>
                      ))}
                      
                    </div>
                    {subGoalInfo.showing[subGoalIndex] &&
                        <div>
                          <div className="description">
                            <p>{subGoalInfo.description +" " + (subGoalIndex + 1)}</p>
                          </div>
                          <div className="materials">
                            <div className="material">{subGoalInfo.materials[0]}</div>
                            <div className="material">{subGoalInfo.materials[1]}</div>
                            <div className="material">{subGoalInfo.materials[2]}</div>
                          </div>
                        </div>
                      }
                  </div>
                ))}
              </div>
              <button onClick={handleBackClick}>Back</button>
            </div>
          )}
        </div>)}
    </div>
  );
};

export default Home;

