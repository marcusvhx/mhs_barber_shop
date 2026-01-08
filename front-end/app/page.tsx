import Employees from "./components/Employees";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import ContactArea from "./components/ContactArea";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function MainPage() {
  return (
    <main>
      <Header />
      <Home />
      <Services />
      <Employees />
      <Portfolio />
      <ContactArea />
      <Footer />
    </main>
  );
}
