import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import FooterTop from "../images/Footer/Footer.svg";
import CoastSnapLogo from "../images/Footer/CoastSnapLogo.svg";
const links = require("../data/footer.json");

const Footer = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div id="footer" className="fullWidth">
      <img src={FooterTop} alt="Start of Footer" className="fullWidth footerTop" />
      <div className="footerContent darkBlueBackground whiteText">
        <div className="flexRowCenter">
          <img src={CoastSnapLogo} alt="CoastSnap Logo" className={"footerLogo " + (mobile ? "smallerFooterLogo" : "")} />
          <h1>CoastSnap in Santa Cruz</h1>
        </div>
        <div className={tablet ? "flexColumn" : "flexRowAlignStart"}>
          {Object.keys(links).map((section) => (
            <div className={tablet ? "flexColumnCenter" : "flexRowAlignStart"}>
              <h2>{section}</h2>
              <ul className={"footerLinksWrapper marginBottom10" + (tablet ? "" : " footerLinksMargin")}>
              {Object.entries(links[section]).map(([linkName, url]) => (
                <li>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {linkName}
                  </a>
                </li>
              ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;