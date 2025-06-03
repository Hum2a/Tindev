import React, { useState, ChangeEvent, useRef, useLayoutEffect } from 'react';
import styles from './DevForm.module.css';
import { TIMEZONES } from './constants/timezones';
import { COUNTRY_CODES } from './constants/countryCodes';
import { CURRENCIES } from './constants/currencies';
import { SALARY_PERIODS } from './constants/salaryPeriods';
import { EMPLOYMENT_TYPES } from './constants/employmentTypes';
import { AVAILABILITIES } from './constants/availabilities';
import {
  FRAMEWORKS_AND_LIBRARIES,
  PROGRAMMING_LANGUAGES,
  TOOLS_AND_PLATFORMS,
  DATABASES,
  DEVOPS,
  TESTING_TOOLS,
  METHODOLOGIES
} from './constants/skills';
import { LANGUAGES } from './constants/languages';

interface DevFormProps {
  profile?: {
    displayName?: string;
    email?: string;
    photoURL?: string;
  };
  onSubmit: (data: any) => void;
}

const DevForm: React.FC<DevFormProps> = ({ profile, onSubmit }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      firstName,
      middleNames,
      lastName,
      displayName,
      email,
      profilePhoto: profilePhoto || profile?.photoURL,
      city,
      country,
      timezone,
      phoneCode,
      phone,
      currentJobTitle,
      currentEmployer,
      yearsExperience,
      employmentType,
      availability,
      salary: {
        currency: salaryCurrency,
        period: salaryPeriod,
        amount: salaryAmount
      },
      skills: {
        frameworks,
        languages,
        tools,
        databases,
        devops,
        testingTools,
        methodologies
      },
      spokenLanguages
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <h2 className={styles.formTitle}>Developer Profile</h2>

      {/* Collapsible Basic Information Section */}
      <button
        type="button"
        className={styles.sectionHeader}
        onClick={() => setShowBasic((prev) => !prev)}
        aria-expanded={showBasic}
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
          <label className={styles.formLabel}>Timezone</label>
          <select
            className={styles.formInput}
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
            aria-label="Select timezone"
          >
            <option value="">Select timezone</option>
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
              aria-label="Select country code"
            >
              {COUNTRY_CODES.map(code => (
                <option key={code.code} value={code.code}>{code.code}</option>
              ))}
            </select>
            <input
              type="tel"
              className={styles.formInput}
              placeholder="Phone number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Collapsible Professional Information Section */}
      <button
        type="button"
        className={styles.sectionHeader}
        onClick={() => setShowProfessional((prev) => !prev)}
        aria-expanded={showProfessional}
      >
        <span>Professional Information</span>
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
            placeholder="e.g. Senior Frontend Developer"
            value={currentJobTitle}
            onChange={e => setCurrentJobTitle(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Current Employer</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Company name"
            value={currentEmployer}
            onChange={e => setCurrentEmployer(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Years of Experience</label>
          <input
            type="number"
            className={styles.formInput}
            placeholder="Years"
            value={yearsExperience}
            onChange={e => setYearsExperience(e.target.value)}
            min="0"
            max="100"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Employment Type</label>
          <select
            className={styles.formInput}
            value={employmentType}
            onChange={e => setEmploymentType(e.target.value)}
            aria-label="Select employment type"
          >
            <option value="">Select employment type</option>
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
            aria-label="Select availability"
          >
            <option value="">Select availability</option>
            {AVAILABILITIES.map(avail => (
              <option key={avail} value={avail}>{avail}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Expected Salary</label>
          <div className={styles.salaryRow}>
            <input
              type="number"
              className={styles.formInput}
              placeholder="Amount"
              value={salaryAmount}
              onChange={e => setSalaryAmount(e.target.value)}
              min="0"
            />
            <select
              className={styles.salaryCurrencySelect}
              value={salaryCurrency}
              onChange={e => setSalaryCurrency(e.target.value)}
              aria-label="Select salary currency"
            >
              {CURRENCIES.map(currency => (
                <option key={currency.code} value={currency.code}>{currency.code}</option>
              ))}
            </select>
            <select
              className={styles.salaryPeriodSelect}
              value={salaryPeriod}
              onChange={e => setSalaryPeriod(e.target.value)}
              aria-label="Select salary period"
            >
              {SALARY_PERIODS.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Skills & Expertise Section */}
      <button
        type="button"
        className={styles.sectionHeader}
        onClick={() => setShowSkills((prev) => !prev)}
        aria-expanded={showSkills}
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
        <SkillInputGroup
          label="Programming Languages"
          skills={languages}
          setSkills={setLanguages}
          options={PROGRAMMING_LANGUAGES}
          placeholder="Add programming languages"
        />

        <SkillInputGroup
          label="Frameworks & Libraries"
          skills={frameworks}
          setSkills={setFrameworks}
          options={FRAMEWORKS_AND_LIBRARIES}
          placeholder="Add frameworks and libraries"
        />

        <SkillInputGroup
          label="Tools & Platforms"
          skills={tools}
          setSkills={setTools}
          options={TOOLS_AND_PLATFORMS}
          placeholder="Add tools and platforms"
        />

        <SkillInputGroup
          label="Databases"
          skills={databases}
          setSkills={setDatabases}
          options={DATABASES}
          placeholder="Add databases"
        />

        <SkillInputGroup
          label="DevOps"
          skills={devops}
          setSkills={setDevops}
          options={DEVOPS}
          placeholder="Add DevOps tools"
        />

        <SkillInputGroup
          label="Testing Tools"
          skills={testingTools}
          setSkills={setTestingTools}
          options={TESTING_TOOLS}
          placeholder="Add testing tools"
        />

        <SkillInputGroup
          label="Methodologies"
          skills={methodologies}
          setSkills={setMethodologies}
          options={METHODOLOGIES}
          placeholder="Add methodologies"
        />

        <SpokenLanguagesInput
          languages={spokenLanguages}
          setLanguages={setSpokenLanguages}
          options={LANGUAGES}
        />
      </div>

      <button type="submit" className={styles.formButton}>
        Save Profile
      </button>
    </form>
  );
};

interface SkillInputGroupProps {
  label: string;
  skills: string[];
  setSkills: (skills: string[]) => void;
  options?: string[];
  placeholder?: string;
}

const SkillInputGroup: React.FC<SkillInputGroupProps> = ({ label, skills, setSkills, options, placeholder }) => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (options) {
      setFilteredOptions(
        options.filter(opt => 
          opt.toLowerCase().includes(value.toLowerCase()) && !skills.includes(opt)
        )
      );
    }
    setShowDropdown(true);
  };

  const handleAdd = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (input.trim() && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
      setInput('');
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd(e);
    }
  };

  const handleRemove = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleDropdownSelect = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInput('');
      setShowDropdown(false);
    }
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>{label}</label>
      <div className={styles.skillsBubbleContainer}>
        {skills.map(skill => (
          <div key={skill} className={styles.skillBubble}>
            {skill}
            <button
              type="button"
              className={styles.removeSkill}
              onClick={() => handleRemove(skill)}
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className={styles.skillInputRow}>
        <input
          type="text"
          className={styles.formInput}
          placeholder={placeholder}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <button
          type="button"
          className={styles.addSkillButton}
          onClick={handleAdd}
          disabled={!input.trim()}
        >
          Add Skill
        </button>
      </div>
      {showDropdown && filteredOptions.length > 0 && (
        <div className={styles.formSkillsDropdown}>
          {filteredOptions.map(option => (
            <div
              key={option}
              className={styles.formSkillsDropdownItem}
              onClick={() => handleDropdownSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface SpokenLanguagesInputProps {
  languages: { language: string; proficiency: string }[];
  setLanguages: (langs: { language: string; proficiency: string }[]) => void;
  options?: string[];
}

const SpokenLanguagesInput: React.FC<SpokenLanguagesInputProps> = ({ languages, setLanguages, options }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [proficiency, setProficiency] = useState('');

  const handleAdd = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (selectedLanguage && proficiency && !languages.some(l => l.language === selectedLanguage)) {
      setLanguages([...languages, { language: selectedLanguage, proficiency }]);
      setSelectedLanguage('');
      setProficiency('');
    }
  };

  const handleRemove = (lang: string) => {
    setLanguages(languages.filter(l => l.language !== lang));
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>Spoken Languages</label>
      <div className={styles.skillsBubbleContainer}>
        {languages.map(({ language, proficiency }) => (
          <div key={language} className={styles.skillBubble}>
            {language} ({proficiency})
            <button
              type="button"
              className={styles.removeSkill}
              onClick={() => handleRemove(language)}
              aria-label={`Remove ${language}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <select
          className={styles.formInput}
          value={selectedLanguage}
          onChange={e => setSelectedLanguage(e.target.value)}
          aria-label="Select spoken language"
        >
          <option value="">Select language</option>
          {options?.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <select
          className={styles.formInput}
          value={proficiency}
          onChange={e => setProficiency(e.target.value)}
          aria-label="Select language proficiency"
        >
          <option value="">Select proficiency</option>
          <option value="Native">Native</option>
          <option value="Fluent">Fluent</option>
          <option value="Advanced">Advanced</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Basic">Basic</option>
        </select>
        <button
          type="button"
          className={styles.addSkillButton}
          onClick={handleAdd}
          disabled={!selectedLanguage || !proficiency}
        >
          Add Language
        </button>
      </div>
    </div>
  );
};

export default DevForm; 