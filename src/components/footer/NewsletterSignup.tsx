import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the newsletter signup
    toast.success("Vielen Dank für Ihre Anmeldung!");
    setEmail("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
      <p className="text-sm text-gray-300 mb-4">
        Bleiben Sie auf dem Laufenden mit unseren neuesten Updates und Branchennews.
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
          <Button 
            type="submit"
            variant="outline"
            className="bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};