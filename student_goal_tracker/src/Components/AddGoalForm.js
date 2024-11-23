import React, { useState } from 'react';

const AddGoalForm = ({ courses, onSave, onCancel }) => {
  const [goalName, setGoalName] = useState('');
  const [courseName, setCourseName] = useState(courses[0]?.courseName || '');
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      goalName,
      details: description,
      progress: 1,
      targetDate:targetDate
    };
    onSave(courseName, newGoal); // Call the save handler with course name and goal data
  };

  return (
    <div className="add-goal-form">
      <h2>Add Goal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course:</label>
          <select
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.courseName} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Target Date (MM/DD/YYYY):</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm;
