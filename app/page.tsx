"use client";
import { useEffect } from "react";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";
import { useState } from "react";
// import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/20/solid";

export default function Mein() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    professionalSummary: '',
    profession: '',
    education: [''],
    jobExperience: '',
    skills: [''],
    expertise:'',
    language:[''],
    profileImage: null,
    // imageUrl:
    filename:'',
  });

  const generatePDF = () => {
    const element = document.getElementById("resume-content");
    const filename = formData.filename || 'reume.pdf';
    const options = {
      filename: `${filename}.pdf`,
      html2canvas: { scale:4 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayChange = (index, field, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [field]: updatedArray
    });
  };

  const addField = (field)=>{
    setFormData({
      ...formData,
      [field]:[...formData[field],'']
    });
  };

  const [imageUrl, setImageUrl] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file,
      });
      setImageUrl(URL.createObjectURL(file)); // Create a URL for the image preview
    }
  };

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const toggleVisibility = ()=>{
      setIsVisible(!isVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl text-black bg-white shadow-xl rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold text-center">Fill Your Details</h2>
        <div className="flex">
          <div className="w-full md:w-1/3 p-6">
          
            <form>
            <label className="block mt-2">Phone</label>
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
                className="mt-1 block w-full p-2 border-solid rounded"
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
              
              <label className="block mt-2">Education</label>
              
              {formData.education.map((edu, index) => (
                <textarea
                  key={index}
                  value={edu}
                  onChange={(e) => handleArrayChange(index, 'education', e.target.value)}
                  className="mt-1 block w-full p-2 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => addField('education')}
                className="bg-slate-700 mt-2 font-semibold px-4 py-2 rounded text-white "
              >
                Add More Education
              </button>
              
              <label className="block mt-2">Skills</label>
              {formData.skills.map((edu,index) => (
                 <input 
                 key={index}
                 value={edu}
                 onChange={(e)=>handleArrayChange(index,'skills',e.target.value)}
                 className="mt-1 block w-full p-2 border rounded"
                 />
              ))}
             
              <button 
                type="button"
                onClick={()=>addField('skills')}
                className="bg-slate-700 mt-2 font-semibold px-4 py-2 rounded text-white "
              >Add More Education</button>
              <label className="block mt-2">language</label>
              {formData.language.map((edu,index)=>(
                <input
                key={index}
                name="language"
                value={edu}
                onChange={(e)=>handleArrayChange(index,'language',e.target.value)}
                className="mt-1 block w-full p-2 border rounded"
              />
              ))}
              <button 
                type="button"
                onClick={()=>addField('language')}
                className="bg-slate-700 mt-2 font-semibold px-4 py-2 rounded text-white "

              >Add More language</button>
              
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
              <label className="block mt-2">profession</label>
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
              <label className="block mt-2">jobExperience</label>
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
      <div id="resume-content" className="min-h-screen flex items-center justify-center py-4  sm:px-6 lg:px-8">
      
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="w-full md:w-1/3 p-6 text-white bg-[#163853]">
            {/* Image and Contact Information */}
            <div className="flex items-center justify-center mb-4">
            <img
                src={imageUrl || "default-profile.jpg"} // Fallback image if none is uploaded
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white"
              />
            </div>
            {/* Contact Information */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold ">Contact</h2>
              <hr className="mt-1 h-1 bg-white " />
              <p className="mt-1  flex">
                {formData.phone || 'Your phone number'}
              </p>
              <p className="mt-1 flex">
                 {formData.email || 'Your email'}
              </p>
              <p className="mt-1 flex">
                {formData.location || 'Your location'}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Education</h2>
              <hr className="mt-1 h-1 bg-white"></hr>
              <p className="mt-2 ">{formData.education.length > 0
                ? formData.education.map((item, index) => (
                    <span key={index}>
                      {item}
                      <br />
                    </span>
                  ))
                : 'Your Education'}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">language</h2>
              <hr className="mt-1 h-1 bg-white"></hr>
              <p className="mt-2">{formData.language.length > 0  
              ? formData.language.map((item,index)=>(
                <span key={index}>{item}<br/></span>
              ))
               :'language'}</p>
            </div>
            <div className="mt-6">
                {isVisible && (
                  <div>
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <hr className="mt-1 h-1 bg-white" />
                    <p className="mt-1">
                      {formData.skills.length > 0
                        ? formData.skills.map((item, index) => (
                            <span key={index} className="block">
                              {item}
                            </span>
                          ))
                        : 'Your Skills'}
                    </p>
                  </div>
                )}
                <button
                  onClick={toggleVisibility}
                  className="bg-white mt-2 font-semibold px-4 py-2 rounded text-[#163853]"
                >
                  {isVisible ? 'Hide Skills' : 'Show Skills'}
                </button>
              </div>
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
    <div className="justify-center items-center flex pb-8">
      <button
          onClick={generatePDF}
          className="bg-slate-700 text-white py-2 px-4 rounded mt-4 "
        >
          Download PDF
      </button>
      </div>
      </div>
    </div>
  );
}