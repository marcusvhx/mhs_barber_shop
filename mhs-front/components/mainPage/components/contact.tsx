"use client";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Contact() {
  return (
    <div className="BScontactLinkContainer">
      <div className="BScontactLink">
        <InstagramIcon sx={{ fontSize: "40px" }} />
        <a href="https://www.instagram.com/mhs_barbershop/" target="_blank">
          @mhs_barbershop
        </a>
      </div>
    </div>
  );
}
