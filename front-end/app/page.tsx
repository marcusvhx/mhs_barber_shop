import Employees from "./components/Employees";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import ContactArea from "./components/ContactArea";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WarnModal from "./components/WarnModal";
import { cookies } from "next/headers";

export default async function MainPage() {
  const cookieStore = await cookies();
  const wasWarned = cookieStore.get("wasWarned")?.value === "true";
  return (
    <main>
      {!wasWarned && <WarnModal />}
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
