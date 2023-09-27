import "./styles.css";

import logo from "@/public/imgs/MHSlogo.png";

import ArrowBackTop from "./components/ArrowBackTop";
import NavBar from "./components/NavBar";
import Contact from "./components/contact";
import BSMenu from "./components/Menu";

import Image from "next/image";
import Link from "next/link";

export default function MHSBarberShop() {
  return (
    <div className="BSbody w-full h-screen overflow-hidden overflow-y-auto flex flex-col scroll-pt-14 scroll-smooth">
      <ArrowBackTop />
      {/* ==================== header ==================== */}
      <header className="h-14 w-full px-5 bg-neutral-800 flex justify-between items-center fixed z-10 ">
        <a href="#BShome">
          <Image className="h-12 w-12 ml-8" src={logo} alt="" />
        </a>
        <NavBar />
      </header>

      {/* ==================== home ==================== */}
      <div
        id="BShome"
        className="home w-full relative mt-14 flex flex-col items-center justify-center gap-7 text-center"
      >
        <div>
          <h1 className="homeTitle">MHS</h1>
          <h1 className="homeTitle">Barber Shop</h1>
        </div>
        <Link
          href="entrar"
          className="mt-5 w-[300px] h-12 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition cursor-pointer text-white text-3xl"
        >
          Fazer Reserva
        </Link>
      </div>

      {/* ==================== menu ==================== */}

      <div
        id="BSmenu"
        className="menu w-full flex flex-col items-center justify-center relative"
      >
        <p className="text-yellow-400 text-5xl capitalize absolute top-5 right-1/2 translate-x-1/2">
          serviços
        </p>

        <BSMenu />
      </div>

      {/* ================== horarios ================== */}

      <div
        id="BShours"
        className="bg-white w-full min-h-[250px] flex flex-col items-center justify-center text-3xl uppercase relative overflow-hidden border-black border-b"
      >
        <p>segunda - sexta</p>
        <p>10:00 - 20:00</p>
        <hr className="w-1/2 border-black border my-4" />
        <p>sábados</p>
        <p>10:00 - 22:00</p>

        <div id="BShourDetail1"></div>
        <div id="BShourDetail2"></div>
      </div>

      {/* ================== localização ================== */}

      <div id="BSaddress" className="address w-full bg-white pt-5">
        <p className="mapTitle text-3xl font-bold uppercase text-center">
          endereço
        </p>
        <div className="addressCard ml-[5vw] w-[310px] p-2 text-xl rounded-lg bg-neutral-100">
          <h4>MHS barber shop</h4>
          <br />
          <p>R. Martinópolis,</p>
          <p>844 - Muribeca dos Guararapes,</p>
          <p>Jaboatão dos Guararapes - PE, 54320-042</p>
        </div>
        <iframe
          className="BSmap w-4/5 h-4/5 rounded-3xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463.1840754716972!2d-34.933242527819694!3d-8.160951006872551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae15481497225%3A0x54f2f4c73b3f7379!2sMHS%20barber%20shop!5e0!3m2!1spt-BR!2sbr!4v1687784096271!5m2!1spt-BR!2sbr"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* ================== contato ================== */}
        <div
          id="BScontact"
          className="contact self-start ml-[5vw] p-5 rounded-lg bg-neutral-100 flex flex-col items-center gap-5 "
        >
          <p className="text-bleck text-center text-3xl tracking-wider uppercase">
            contato
          </p>

          <Contact />
        </div>
      </div>
      <footer className="BSfooter">
        <p>MHS Barber Shop - Copyright &copy;</p>
        design and code by Marcus Xavier
      </footer>
    </div>
  );
}
