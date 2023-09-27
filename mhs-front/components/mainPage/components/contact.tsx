"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Contact() {
  return (
    <div className="BScontactLinkContainer">
      <div className="BScontactLink">
        <WhatsAppIcon sx={{ fontSize: "40px" }} />
        <p>(81) 99999-9999</p>
      </div>

      <div className="BScontactLink">
        <InstagramIcon sx={{ fontSize: "40px" }} />
        <a href="https://www.instagram.com/mhs_barbershop/" target="_blank">
          @mhs_barbershop
        </a>
      </div>
    </div>
  );
}
