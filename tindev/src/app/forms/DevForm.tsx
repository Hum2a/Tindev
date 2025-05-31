import React, { useState, ChangeEvent, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './DevForm.module.css';
import { useAuth } from '@/lib/hooks/useAuth';
import { TIMEZONES } from './constants/timezones';
import { COUNTRY_CODES } from './constants/countryCodes';
import { CURRENCIES } from './constants/currencies';
import { SALARY_PERIODS } from './constants/salaryPeriods';
import { EMPLOYMENT_TYPES } from './constants/employmentTypes';
import { AVAILABILITIES } from './constants/availabilities';
import { SKILLS } from './constants/skills';

const DevForm: React.FC = () => {
  const { profile } = useAuth();

  // Collapsible section state
  const [showBasic, setShowBasic] = useState(true);
  const [showProfessional, setShowProfessional] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [middleNames, setMiddleNames] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [useProfileDisplayName, setUseProfileDisplayName] = useState(false);
  const [email, setEmail] = useState('');
  const [useProfileEmail, setUseProfileEmail] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
  const [useProfilePhoto, setUseProfilePhoto] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [phoneCode, setPhoneCode] = useState('+44');
  const [phone, setPhone] = useState('');

  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [currentEmployer, setCurrentEmployer] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [availability, setAvailability] = useState('');
  const [salaryCurrency, setSalaryCurrency] = useState('USD');
  const [salaryPeriod, setSalaryPeriod] = useState('Annually');
  const [salaryAmount, setSalaryAmount] = useState('');

  const handleUseProfileDisplayName = () => {
    if (!useProfileDisplayName && profile?.displayName) {
      setDisplayName(profile.displayName);
    }
    setUseProfileDisplayName(!useProfileDisplayName);
  };

  const handleUseProfileEmail = () => {
    if (!useProfileEmail && profile?.email) {
      setEmail(profile.email);
    }
    setUseProfileEmail(!useProfileEmail);
  };

  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUseProfilePhoto = () => {
    if (!useProfilePhoto && profile?.photoURL) {
      setProfilePhoto(profile.photoURL);
    }
    setUseProfilePhoto(!useProfilePhoto);
  };

  // Skills & Expertise section state
  const [showSkills, setShowSkills] = useState(false);
  const [primarySkills, setPrimarySkills] = useState<string[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<string[]>([]);
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [databases, setDatabases] = useState<string[]>([]);
  const [devops, setDevops] = useState<string[]>([]);
  const [testingTools, setTestingTools] = useState<string[]>([]);
  const [methodologies, setMethodologies] = useState<string[]>([]);
  const [spokenLanguages, setSpokenLanguages] = useState<{ language: string; proficiency: string }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number, width: number}>({top: 0, left: 0, width: 0});

  useLayoutEffect(() => {
    if (showSkills && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [showSkills]);

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Developer Profile</h2>
      <form>
        {/* Collapsible Basic Information Section */}
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => setShowBasic((prev) => !prev)}
          aria-expanded={!!showBasic}
        >
          <span>Basic Information</span>
          <span className={styles.sectionChevron + (showBasic ? ' ' + styles.sectionChevronOpen : '')}>
            ▼
          </span>
        </button>
        <div
          className={styles.sectionContent}
          style={{ maxHeight: showBasic ? 2000 : 0, opacity: showBasic ? 1 : 0, pointerEvents: showBasic ? 'auto' : 'none' }}
        >
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <div className={styles.nameRow}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Middle Names"
                value={middleNames}
                onChange={e => setMiddleNames(e.target.value)}
                autoComplete="additional-name"
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Display Name / Username
              {profile?.displayName && (
                <button
                  type="button"
                  className={styles.useProfileButton}
                  onClick={handleUseProfileDisplayName}
                >
                  {useProfileDisplayName ? 'Undo' : 'Use my account display name'}
                </button>
              )}
            </label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Display name or username"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Email
              {profile?.email && (
                <button
                  type="button"
                  className={styles.useProfileButton}
                  onClick={handleUseProfileEmail}
                >
                  {useProfileEmail ? 'Undo' : 'Use my account email'}
                </button>
              )}
            </label>
            <input
              type="email"
              className={styles.formInput}
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Profile Photo
              {profile?.photoURL && (
                <button
                  type="button"
                  className={styles.useProfileButton}
                  onClick={handleUseProfilePhoto}
                >
                  {useProfilePhoto ? 'Undo' : 'Use my account photo'}
                </button>
              )}
            </label>
            <div className={styles.photoUploadRow}>
              <input
                type="file"
                accept="image/*"
                id="profilePhotoUpload"
                style={{ display: 'none' }}
                onChange={handleProfilePhotoChange}
              />
              <label htmlFor="profilePhotoUpload" className={styles.uploadButton}>
                Upload Photo
              </label>
              {(profilePhotoPreview || profilePhoto) && (
                <img
                  src={profilePhotoPreview || profilePhoto}
                  alt="Profile preview"
                  className={styles.profilePreview}
                />
              )}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Location</label>
            <div className={styles.locationRow}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                autoComplete="address-level2"
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                autoComplete="country"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              className={styles.formInput}
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
            >
              <option value="">Select your timezone</option>
              {TIMEZONES.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number</label>
            <div className={styles.phoneRow}>
              <select
                className={styles.phoneCodeSelect}
                value={phoneCode}
                onChange={e => setPhoneCode(e.target.value)}
                aria-label="Country code"
              >
                {COUNTRY_CODES.map(opt => (
                  <option key={opt.code} value={opt.code}>
                    {opt.code} ({opt.country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className={styles.formInput}
                placeholder="e.g. 1234 567890"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
          </div>
        </div>
        {/* Collapsible Professional Details Section */}
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => setShowProfessional((prev) => !prev)}
          aria-expanded={!!showProfessional}
        >
          <span>Professional Details</span>
          <span className={styles.sectionChevron + (showProfessional ? ' ' + styles.sectionChevronOpen : '')}>
            ▼
          </span>
        </button>
        <div
          className={styles.sectionContent}
          style={{ maxHeight: showProfessional ? 2000 : 0, opacity: showProfessional ? 1 : 0, pointerEvents: showProfessional ? 'auto' : 'none' }}
        >
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Current Job Title</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. Senior Software Engineer"
              value={currentJobTitle}
              onChange={e => setCurrentJobTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Current Employer / Company</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. Google, Freelance, etc."
              value={currentEmployer}
              onChange={e => setCurrentEmployer(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Years of Experience</label>
            <input
              type="number"
              min="0"
              className={styles.formInput}
              placeholder="e.g. 5"
              value={yearsExperience}
              onChange={e => setYearsExperience(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Employment Type</label>
            <select
              className={styles.formInput}
              value={employmentType}
              onChange={e => setEmploymentType(e.target.value)}
              title="Employment Type"
            >
              <option value="">Select type</option>
              {EMPLOYMENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Availability</label>
            <select
              className={styles.formInput}
              value={availability}
              onChange={e => setAvailability(e.target.value)}
              title="Availability"
            >
              <option value="">Select availability</option>
              {AVAILABILITIES.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Expected Salary / Hourly Rate</label>
            <div className={styles.salaryRow}>
              <select
                className={styles.salaryCurrencySelect}
                value={salaryCurrency}
                onChange={e => setSalaryCurrency(e.target.value)}
                title="Currency"
              >
                {CURRENCIES.map(opt => (
                  <option key={opt.code} value={opt.code}>
                    {opt.code} ({opt.symbol})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                className={styles.formInput}
                placeholder="Amount"
                value={salaryAmount}
                onChange={e => setSalaryAmount(e.target.value)}
                style={{ maxWidth: 120 }}
              />
              <select
                className={styles.salaryPeriodSelect}
                value={salaryPeriod}
                onChange={e => setSalaryPeriod(e.target.value)}
                title="Period"
              >
                {SALARY_PERIODS.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Collapsible Skills & Expertise Section */}
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => setShowSkills((prev) => !prev)}
          aria-expanded={!!showSkills}
        >
          <span>Skills & Expertise</span>
          <span className={styles.sectionChevron + (showSkills ? ' ' + styles.sectionChevronOpen : '')}>
            ▼
          </span>
        </button>
        <div
          className={styles.sectionContent}
          style={{ maxHeight: showSkills ? 2000 : 0, opacity: showSkills ? 1 : 0, pointerEvents: showSkills ? 'auto' : 'none' }}
        >
          <SkillInputGroup label="Primary Skills" skills={primarySkills} setSkills={setPrimarySkills} placeholder="e.g. JavaScript, Python, React" />
          <SkillInputGroup label="Secondary Skills" skills={secondarySkills} setSkills={setSecondarySkills} />
          <SkillInputGroup label="Frameworks & Libraries" skills={frameworks} setSkills={setFrameworks} />
          <SkillInputGroup label="Programming Languages" skills={languages} setSkills={setLanguages} />
          <SkillInputGroup label="Tools & Platforms" skills={tools} setSkills={setTools} placeholder="e.g. AWS, Docker, Figma" />
          <SkillInputGroup label="Databases" skills={databases} setSkills={setDatabases} placeholder="e.g. MongoDB, PostgreSQL" />
          <SkillInputGroup label="DevOps / CI/CD Experience" skills={devops} setSkills={setDevops} />
          <SkillInputGroup label="Testing Tools" skills={testingTools} setSkills={setTestingTools} placeholder="e.g. Jest, Cypress" />
          <SkillInputGroup label="Methodologies" skills={methodologies} setSkills={setMethodologies} placeholder="e.g. Agile, Scrum, Kanban" />
          <SpokenLanguagesInput languages={spokenLanguages} setLanguages={setSpokenLanguages} />
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

// Reusable skill input group component
const SkillInputGroup: React.FC<{
  label: string;
  skills: string[];
  setSkills: (skills: string[]) => void;
  placeholder?: string;
}> = ({ label, skills, setSkills, placeholder }) => {
  const [input, setInput] = useState('');
  const [dropdownMode, setDropdownMode] = useState(false);
  const [dropdownQuery, setDropdownQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const handleAdd = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) setSkills([...skills, trimmed]);
    setInput('');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd(e);
  };
  const handleRemove = (skill: string) => setSkills(skills.filter(s => s !== skill));

  // Dropdown mode logic
  const filteredSkills = SKILLS.filter(
    s => s.toLowerCase().includes(dropdownQuery.toLowerCase()) && !skills.includes(s)
  );
  const handleDropdownSelect = (skill: string) => {
    setSkills([...skills, skill]);
    setDropdownQuery('');
    setDropdownOpen(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number, width: number}>({top: 0, left: 0, width: 0});

  useLayoutEffect(() => {
    if (dropdownOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [dropdownOpen]);

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {label}
        <button
          type="button"
          className={styles.addSkillButton}
          style={{ padding: '0.4rem 1rem', fontSize: '0.95rem', marginLeft: 8 }}
          onClick={() => setDropdownMode(m => !m)}
          aria-pressed={dropdownMode}
        >
          {dropdownMode ? 'Switch to Manual' : 'Search Skills'}
        </button>
      </label>
      {!dropdownMode ? (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className={styles.formInput}
            placeholder={placeholder || 'Add skill'}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button
            type="button"
            className={styles.addSkillButton}
            onClick={handleAdd}
            disabled={!input.trim()}
          >
            Add
          </button>
        </div>
      ) : (
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <input
            ref={inputRef}
            type="text"
            className={styles.formInput}
            placeholder={placeholder || 'Search skills...'}
            value={dropdownQuery}
            onChange={e => {
              setDropdownQuery(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            autoComplete="off"
            style={{ width: '100%' }}
          />
          {dropdownOpen && filteredSkills.length > 0 && ReactDOM.createPortal(
            <ul
              className={styles['form-skillsDropdown']}
              style={{
                position: 'absolute',
                top: dropdownPos.top,
                left: dropdownPos.left,
                width: dropdownPos.width,
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {filteredSkills.map(skill => (
                <li
                  key={skill}
                  className={styles['form-skillsDropdownItem']}
                  onMouseDown={() => handleDropdownSelect(skill)}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleDropdownSelect(skill);
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>,
            document.body
          )}
        </div>
      )}
      {skills.length > 0 && (
        <div className={styles.skillsBubbleContainer}>
          {skills.map(skill => (
            <span
              key={skill}
              className={styles.skillBubble}
              onClick={() => handleRemove(skill)}
              tabIndex={0}
              title="Remove skill"
            >
              {skill} <span className={styles.removeSkill}>&times;</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Spoken languages input group
const SpokenLanguagesInput: React.FC<{
  languages: { language: string; proficiency: string }[];
  setLanguages: (langs: { language: string; proficiency: string }[]) => void;
}> = ({ languages, setLanguages }) => {
  const [input, setInput] = useState('');
  const [proficiency, setProficiency] = useState('');
  const profOptions = ['Native', 'Fluent', 'Professional', 'Conversational', 'Basic'];
  const handleAdd = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && proficiency && !languages.some(l => l.language === trimmed)) {
      setLanguages([...languages, { language: trimmed, proficiency }]);
    }
    setInput('');
    setProficiency('');
  };
  const handleRemove = (lang: string) => setLanguages(languages.filter(l => l.language !== lang));
  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>Spoken Languages (with proficiency)</label>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          className={styles.formInput}
          placeholder="e.g. English, Spanish"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoComplete="off"
          style={{ flex: 2 }}
        />
        <select
          className={styles.formInput}
          value={proficiency}
          onChange={e => setProficiency(e.target.value)}
          style={{ flex: 1, minWidth: 120 }}
          title="Proficiency"
        >
          <option value="">Proficiency</option>
          {profOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button
          type="button"
          className={styles.addSkillButton}
          onClick={handleAdd}
          disabled={!input.trim() || !proficiency}
        >
          Add
        </button>
      </div>
      {languages.length > 0 && (
        <div className={styles.skillsBubbleContainer}>
          {languages.map(lang => (
            <span
              key={lang.language}
              className={styles.skillBubble}
              onClick={() => handleRemove(lang.language)}
              tabIndex={0}
              title="Remove language"
            >
              {lang.language} <span style={{ fontWeight: 400, color: '#374151', marginLeft: 4 }}>({lang.proficiency})</span> <span className={styles.removeSkill}>&times;</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevForm; 