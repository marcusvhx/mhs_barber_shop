import Section from "@/components/layout/Section";
import Title from "@/components/ui/Title";
import Hours from "./Hours";
import Address from "./Address";
import Contact from "./Contact";

export default function ContactArea({}: {}) {
  return (
    <Section id="contact" className="flex flex-col py-8 gap-8 items-center">
      <Hours />
      <Address />
      <Contact/>
    </Section>
  );
}
