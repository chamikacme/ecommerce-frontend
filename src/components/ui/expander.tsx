import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  children: React.ReactNode;
  title: string;
};

const Expander = ({ children, title }: Props) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-slate-50 p-2 rounded hover:bg-slate-100"
    >
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="p-0 text-primary hover:no-underline text-base">
          {title}
        </AccordionTrigger>
        <AccordionContent className="px-0 py-1">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Expander;
