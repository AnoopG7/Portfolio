import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="pb-8 pt-4">
      <Separator className="mb-8 bg-border" />
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="text-center text-sm text-muted-foreground">
          Built by{" "}
          <span className="text-accent font-medium">Anoop Gupta</span>
          {" · "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
