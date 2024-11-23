import React, { useState } from 'react';

const AddCourseForm = ({ onSave, onCancel }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      courseName,
      goals: [], // Initially no goals, as the course is being added
    };
    onSave(newCourse); // Call the save handler with the new course data
  };

  return (
    <div className="add-course-form">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course Description:</label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
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

export default AddCourseForm;
