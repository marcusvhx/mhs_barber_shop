import Employees from "./components/Employees";
import Home from "./components/Home";
import Services from "./components/Services";

export default function MainPage() {
  return (
    <main>
        <Home/>
        <Services />
        <Employees />
    </main>
  );
}
