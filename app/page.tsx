"use client";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    professionalSummary: "",
    profession: "",
    education: [""],
    jobExperience: "",
    skills: [""],
    expertise: "",
    language: [""],
    profileImage: null,
    filename: "",
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle array changes like skills, education, etc.
  const handleArrayChange = (index, field, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  // Add new fields for skills, education, or language
  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  // Image handling
  const [imageUrl, setImageUrl] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setImageUrl(URL.createObjectURL(file));
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
                onChange={handleFileChange}
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
                  <img
                    src={imageUrl || "default-profile.jpg"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full border-4 border-white"
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
              <div className="w-full md:w-2/3 p-6 bg-white text-black">
                {/* Profile and Summary */}
                <div>
                  <h2 className="text-2xl font-semibold">{formData.name}</h2>
                  <p className="text-lg">{formData.profession}</p>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Professional Summary</h2>
                  <p>{formData.professionalSummary}</p>
                </div>
                {/* Expertise Section */}
                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Expertise</h2>
                  <p>{formData.expertise}</p>
                </div>
                {/* Experience Section */}
                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Job Experience</h2>
                  <p>{formData.jobExperience}</p>
                </div>
                {/* Languages Section */}
                
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
