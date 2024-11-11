"use client";
import Image from 'next/image';
import html2pdf from "html2pdf.js";
import React, { useState } from 'react';

export default function ResumeForm() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  type FormData = {
    name: string;
    email: string;
    phone: string;
    location: string;
    professionalSummary: string;
    profession: string;
    education: string[];
    jobExperience: string;
    skills: string[];
    expertise: string;
    language: string[];
    profileImage: null;
    filename: string;
  };

 

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    professionalSummary: "",
    profession: "",
    education: [] as string[],  // E
    jobExperience: "",
    skills: [] as string[], 
    expertise: "",
    language: [] as string[],  
    profileImage: null as File | null,  // Ensure the type is correct here
    filename: ""
  });
  


  // PDF generation function
  const generatePDF = () => {
    
    const element = document.getElementById("resume-content");
    const filename = formData.filename || "resume.pdf";
    const options = {
      filename,
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  // Handle input changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleArrayChange = (index: number, field: 'skills' | 'education' | 'language', value: string) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };
  
  
  

  // Add new fields for skills, education, or language
  const addField = (field: 'skills' | 'education' | 'language') => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };
  

  // Image handling
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // Store the file URL in state
      };
      reader.readAsDataURL(file); // Read the image file as a URL
    }
  };
  
  

  // Toggle visibility of skills section
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-screen text-black flex items-center justify-center py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-center">Fill Your Details</h2>
        <div className="flex">
          <div className="w-full md:w-1/3 p-6">
            <form>
              <label className="block mt-2">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />

              <label className="block mt-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />

              <label className="block mt-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />

              <label className="block mt-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />

              {/* Render Education Fields */}
              <label className="block mt-2">Education</label>
              {formData.education.map((edu, index) => (
                <textarea
                  key={index}
                  value={edu}
                  onChange={(e) =>
                    handleArrayChange(index, "education", e.target.value)
                  }
                  className="mt-1 block w-full p-2 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => addField("education")}
                className="bg-slate-700 mt-2 font-semibold px-4 py-2 rounded text-white"
              >
                Add More Education
              </button>

              {/* Render Skills Fields */}
              <label className="block mt-2">Skills</label>
              {formData.skills.map((skill, index) => (
                <input
                  key={index}
                  value={skill}
                  onChange={(e) =>
                    handleArrayChange(index, "skills", e.target.value)
                  }
                  className="mt-1 block w-full p-2 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => addField("skills")}
                className="bg-slate-700 mt-2 font-semibold px-4 py-2 rounded text-white"
              >
                Add More Skills
              </button>

              {/* Render Language Fields */}
              <label className="block mt-2">Language</label>
              {formData.language.map((lang, index) => (
                <input
                  key={index}
                  value={lang}
                  onChange={(e) =>
                    handleArrayChange(index, "language", e.target.value)
                  }
                  className="mt-1 block w-full p-2 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => addField("language")}
                className="bg-slate-700 mt-2 font-semibold px-4 py-2 rounded text-white"
              >
                Add More Languages
              </button>
            </form>
          </div>

          <div className="w-full md:w-2/3 p-6">
            <form>
              <label className="block mt-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />

              <label className="block mt-2">Profession</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />

              <label className="block mt-2">Professional Summary</label>
              <textarea
                name="professionalSummary"
                value={formData.professionalSummary}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />

              <label className="block mt-2">Expertise</label>
              <textarea
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />

              <label className="block mt-2">Job Experience</label>
              <textarea
                name="jobExperience"
                value={formData.jobExperience}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />

              <label className="block mt-2">Filename</label>
              <input
                name="filename"
                value={formData.filename}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />
            </form>
          </div>
        </div>

        {/* Resume Preview Section */}
        <div id="resume-content" className="min-h-screen  flex items-center justify-center py-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Section */}
              <div className="w-full md:w-1/3 p-6 text-white bg-[#163853]">
                <div className="flex items-center justify-center mb-4">
                  <Image 
                     src={imageUrl || "/default-profile.jpg"}  // Default image if no file selected
                     alt="Profile"
                     className="w-40 h-40 rounded-full border-4 border-white"
                     width={40}
                     height={40}
                  />
                </div>
                {/* Contact Information */}
                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Contact</h2>
                  <hr className="border-white" />
                  <p className="mt-2">Phone: {formData.phone}</p>
                  <p className="mt-2">Email: {formData.email}</p>
                  <p className="mt-2">Location: {formData.location}</p>
                </div>
                {/* Education Section */}
                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Education</h2>
                  <hr className="border-white" />
                  <ul className="mt-2">
                    {formData.education.map((edu, index) => (
                      <li key={index} className="mt-2">{edu}</li>
                    ))}
                  </ul>
                </div>
                {/* Skills Section */}
                {isVisible && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <hr className="border-white" />
                    <ul className="mt-2">
                      {formData.skills.map((skill, index) => (
                        <li key={index} className="mt-2">{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Languages</h2>
                  <ul className="mt-2">
                    {formData.language.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
                {/* Toggle Button */}
                <button onClick={toggleVisibility} className="mt-4 bg-white text-[#163853] px-4 py-2 rounded">
                  {isVisible ? "Hide Skills" : "Show Skills"}
                </button>
              </div>

              {/* Right Section */}
              <div className="bg-white w-full md:w-2/3 p-8 text-[#163853]">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-8">
              <span className="text-gray-700">{formData.name || 'Your Name'}</span>
            </h1>
            <p className="text-lg mt-2">{formData.profession || 'Your Profession'}</p>

            <h2 className="text-2xl font-semibold mt-14">Professional Summary</h2>
            <p className="mt-3 text-lg">
            {formData.professionalSummary || 'Write your professional summary here.'}
            </p>

            <h2 className="text-2xl font-semibold mt-8">Expertise</h2>
            <p className="mt-3 text-lg">
            {formData.expertise || 'Write your expertise here.'}
            </p>

            <h2 className="text-2xl font-semibold mt-8">Job Experience</h2>
            <p className="mt-4 text-lg">
            {formData.jobExperience || 'Job Experience'}
            </p>
          </div>
            </div>
          </div>
        </div>

        {/* Generate PDF Button */}
        <div className="flex items-center justify-center py-4">
          <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
