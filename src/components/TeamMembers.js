import React, { useContext } from "react";
import { WebsiteContext } from "../App";
import { Grid, Tooltip } from "@mui/material";
const team = require("../data/teamMembers.json");

const TeamMembers = () => {
  const { mobile } = useContext(WebsiteContext);
  
  return (
    <Grid container spacing={2}>
      {team.map((member, i) =>
        <Grid item xs={12} md={6} key={i}>
          {member.link ?
            <a href={member.link} target="_blank" rel="noopener noreferrer" className={mobile ? "mobileTeammateWrapper": "teammateWrapper"}>
              {member.image ?
                (member.name === "Litzia Galvan" ?
                  <Tooltip title="Photo by Meg Mindlin Photography" placement="bottom">
                    <img src={require("../images/UCSC Team/" + member.image)} alt={member.name + "'s Profile Picture"} className="teammatePic" />
                  </Tooltip>
                  :
                  <img src={require("../images/UCSC Team/" + member.image)} alt={member.name + "'s Profile Picture"} className="teammatePic" />
                )
                :
                <div className="teammateInitialsWrapper">
                  <h1 className="teammateInitials">{member.initials}</h1>
                </div>
              }
              <div className={mobile ? "flexColumnCenter" : "marginLeft20"}>
                <h2>{member.name}</h2>
                <p className="grayText">
                  {member.role}
                  <br></br>
                  {member.education}
                </p>
              </div>
            </a>
            :
            <div className={mobile ? "mobileTeammateWrapper": "teammateWrapper"} key={i}>
              {member.image ?
                (member.name === "Litzia Galvan" ?
                  <Tooltip title="Photo by Meg Mindlin Photography" placement="bottom">
                    <img src={require("../images/UCSC Team/" + member.image)} alt={member.name + "'s Profile Picture"} className="teammatePic" />
                  </Tooltip>
                  :
                  <img src={require("../images/UCSC Team/" + member.image)} alt={member.name + "'s Profile Picture"} className="teammatePic" />
                )
                :
                <div className="teammateInitialsWrapper">
                  <h1 className="teammateInitials">{member.initials}</h1>
                </div>
              }
              <div className={mobile ? "flexColumnCenter" : "marginLeft20"}>
                <h2>{member.name}</h2>
                <p className="grayText">
                  {member.role}
                  <br></br>
                  {member.education}
                </p>
              </div>
            </div>
          }
        </Grid>
      )}
    </Grid>
  );
};

export default TeamMembers;