import React from "react";
const team = require("../data/teamMembers.json");

const TeamMembers = () => {
  return (
    <div>
      {team.map((member, i) =>
        <div className="flexColumnCenter teammateWrapper" key={i}>
          {member.image ?
            <img src={require("../images/UCSC Team/" + member.image)} alt={member.name + "'s Profile Picture"} className="teammatePic" />
            :
            <div className="teammateInitialsWrapper">
              <h1 className="teammateInitials">{member.initials}</h1>
            </div>
          }
          <h2>{member.name}</h2>
          <p className="grayText">
            {member.role}
            <br></br>
            {member.education}
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;