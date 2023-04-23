import { useState, useEffect } from "react";
import axios from "axios";

export default function Main() {
  const [data, setData] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    email: "",
    gender: "",
    profile: "",
    skills: []
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000", formData)
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        const errorMsg=err.response.data.error||err.response.data;
        alert(errorMsg)
        console.log(err);
      });
  };

  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      const isChecked = event.target.checked;
      const skill = event.target.value;
      let updatedSkills = formData.skills;

      if (isChecked) {
        updatedSkills.push(skill);
      } else {
        updatedSkills = updatedSkills.filter((s) => s !== skill);
      }

      setFormData({
        ...formData,
        skills: updatedSkills
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    }
  };

  const getData = () => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        console.log(res);
     
        setData(res.data);
      })
      .catch((err) => {
        alert("Error getting data");
        console.log(err.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <div className="heading">Student Enrollment Form</div>
      <div className="container">
        <div className="left">
          <form method="post" className="post" onSubmit={handleSubmit}>
            <div className="box">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="input"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="box">
              <label htmlFor="roll">Roll:</label>
              <input
                type="text"
                id="roll"
                name="roll"
                className="input"
                placeholder="roll"
                value={formData.roll}
                onChange={handleChange}
              />
            </div>

            <div className="box">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                className="input"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="box">
              <label htmlFor="profile">Profile:</label>
              <input
                type="text"
                id="profile"
                name="profile"
                className="input"
                placeholder="profile"
                value={formData.profile}
                onChange={handleChange}
              />
            </div>

            <div className="box">
              <label htmlFor="image">Image Link:</label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="image link"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="gender ">
                <label htmlFor="gender">Gender:</label>
                <div className="form-check gender-inputs">
                  <div className="male">
                    <input
                      type="radio"
                      name="gender"
                      onClick={() =>
                        setFormData({ ...formData, gender: "Male" })
                      }
                      className="form-check-input"
                    ></input>
                    <label htmlFor="gender" className="form-check-label">
                      Male
                    </label>
                  </div>
                  <div className="female">
                    <input
                      type="radio"
                      name="gender"
                      onClick={() =>
                        setFormData({ ...formData, gender: "Female" })
                      }
                      className="form-check-input"
                    ></input>
                    <label htmlFor="gender" className="form-check-label">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="skills">
                <label htmlFor="gender">Skills:</label>
                <div className="skills-align">
                  <div className="skills-inputs">
                    <input
                      type="checkbox"
                      name="skills"
                      value="Machine Learning"
                      onChange={handleChange}
                    />
                    <label htmlFor="ml"> ML</label>
                  </div>
                  <div className="skills-inputs">
                    <input
                      type="checkbox"
                      name="skills"
                      value="FS Web Development"
                      onChange={handleChange}
                    />
                    <label htmlFor="wd">WD</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="skills"
                      value="Cloud Computing"
                      onChange={handleChange}
                    />
                    <label htmlFor="cc"> CD</label>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" name="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="right">
          {Array.isArray(data) ? (
            data.map((currData) => {
              return (
                <div key={currData.roll} className="details">
                  <div className="info-left">
                    <div>{`${currData.name} |${currData.roll} |${currData.email}   | ${currData.gender} | ${currData.profile}`}</div>
                    {currData.skills.map((currSkill) => {
                      return <div key={currSkill}>{currSkill}</div>;
                    })}
                  </div>
                  <div className="info-right  image-container">
                    <img src={currData.image} alt="profile" />
                  </div>
                </div>
              );
            })
          ) : (
            <div>No data available</div>
          )}
        </div>
      </div>
    </div>
  );
}
