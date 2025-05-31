import React, { useState } from 'react';
import styles from './DevForm.module.css';

const DevForm: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput('');
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSkill(e);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Developer Profile</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="skills" className={styles.formLabel}>Skills</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              id="skills"
              name="skills"
              type="text"
              placeholder="e.g. React, Node.js, TypeScript"
              className={styles.formInput}
              value={skillInput}
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillKeyDown}
              autoComplete="off"
            />
            <button
              type="button"
              className={styles.addSkillButton}
              onClick={handleAddSkill}
              disabled={!skillInput.trim()}
            >
              Add
            </button>
          </div>
          {skills.length > 0 && (
            <div className={styles.skillsBubbleContainer}>
              {skills.map(skill => (
                <span
                  key={skill}
                  className={styles.skillBubble}
                  onClick={() => handleRemoveSkill(skill)}
                  tabIndex={0}
                  title="Remove skill"
                >
                  {skill} <span className={styles.removeSkill}>&times;</span>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="experience" className={styles.formLabel}>Years of Experience</label>
          <input id="experience" name="experience" type="number" min="0" placeholder="e.g. 3" className={styles.formInput} />
        </div>
        <button type="submit" className={styles.formButton}>Save</button>
      </form>
    </div>
  );
};

export default DevForm; 