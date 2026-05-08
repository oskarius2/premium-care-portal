import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";
import { siteContact } from "@/config/siteContact";
import { siteBrand } from "@/config/siteBrand";
import { TelLink, MailLink } from "@/components/ContactAnchors";
import { Ornament } from "@/components/ui/Ornament";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border/75 mt-24">
      <div className="container-wide py-14 md:py-20 grid gap-12 md:grid-cols-3">
        <div className="md:pr-8">
          <p className="font-serif text-[1.65rem] sm:text-4xl leading-tight tracking-tight text-primary mb-1">
            {siteBrand.name}
          </p>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-primary/80 mb-5"
             style={{ fontVariant: "small-caps" }}>
            — {siteBrand.tagline} —
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Medicinsk skönhetsklinik med legitimerade sjuksköterskor. Skinbooster och bioremodellering — efter individuell konsultation i {siteContact.city}.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Kontakt
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-primary mt-1 shrink-0" />
              <TelLink className="font-medium text-foreground hover:text-primary transition-colors">
                {siteContact.phoneDisplay}
              </TelLink>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-primary mt-1 shrink-0" />
              <MailLink className="text-foreground hover:text-primary break-all transition-colors">
                {siteContact.emailDisplay}
              </MailLink>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary mt-1 shrink-0" />
              <span className="text-foreground">{siteContact.addressOneLine}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Öppettider
          </h3>
          <ul className="space-y-2.5 text-sm text-foreground">
            <li className="flex justify-between gap-4 border-b border-border/75 pb-2">
              <span className="text-muted-foreground">Mån–Fre</span>
              <span className="font-medium tabular-nums text-right">{siteContact.openingHoursWeekdays}</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-border/75 pb-2">
              <span className="text-muted-foreground">Lördag</span>
              <span className="font-medium tabular-nums text-right">{siteContact.openingHoursSaturday}</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-muted-foreground">Söndag</span>
              <span className="text-muted-foreground tabular-nums text-right">{siteContact.openingHoursSunday}</span>
            </li>
          </ul>
          <Link to="/boka" className="btn-primary mt-7 w-full">Boka tid</Link>
        </div>
      </div>

      <div className="border-t border-border/75">
        <div className="container-wide py-7 flex flex-col items-center gap-3">
          <Ornament className="text-foreground/25" width={84} glyph="diamond" />
          <p className="text-xs text-muted-foreground text-center tracking-wide">
            © {new Date().getFullYear()} {siteBrand.name} · Alla rättigheter förbehållna
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
