import type { ChangeEvent, FormEvent } from 'react';
import type { UserFormData } from '../types';

type Props = {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  onSubmit: () => void;
  onClear: () => void;
  editingId: string | null;
};

const EDUCATION_OPTIONS = ['Grade school', 'High school', 'College'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const SKILL_OPTIONS = ['TypeScript', 'React', 'Node', 'NoSQL'];

const UserForm = ({ formData, setFormData, onSubmit, onClear, editingId }: Props) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((s) => s !== value),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{editingId ? 'Edit User' : 'Add User'}</h2>

      <div className="field">
        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          min={0}
          value={formData.age}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="education">Education</label>
        <select
          id="education"
          name="education"
          value={formData.education}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          {EDUCATION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <span className="field-label">Gender</span>
        <div className="options">
          {GENDER_OPTIONS.map((opt) => (
            <label key={opt} className="inline">
              <input
                type="radio"
                name="gender"
                value={opt}
                checked={formData.gender === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <span className="field-label">Skills</span>
        <div className="options">
          {SKILL_OPTIONS.map((skill) => (
            <label key={skill} className="inline">
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={formData.skills.includes(skill)}
                onChange={handleSkillChange}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
        />
      </div>

      <div className="actions">
        <button type="submit">{editingId ? 'Save User' : 'Add User'}</button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default UserForm;
