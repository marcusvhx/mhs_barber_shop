import Section from "@/components/layout/Section";
import Hours from "./Hours";
import Address from "./Address";
import Contact from "./Contact";

export default function ContactArea({}: {}) {
  return (
    <Section id="contact" className="gap-8 sm:grid-cols-2 sm:grid-rows-none sm:h-[calc(100dvh-4rem)] py-12 sm:mt-8 md:mt-2">
      <Hours />
      <Address />
      <Contact/>
    </Section>
  );
}
