import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";
import { siteContact } from "@/config/siteContact";
import { siteBookingNotice, siteBrand } from "@/config/siteBrand";
import { TelLink, MailLink } from "@/components/ContactAnchors";
import { Ornament } from "@/components/ui/Ornament";

const Footer = () => {
  const hasPhone = Boolean(siteContact.phoneDisplay.trim() && siteContact.phoneTel);
  const hasEmail = Boolean(siteContact.emailDisplay.trim() && siteContact.emailAddress);
  const hasAnyHours = Boolean(
    siteContact.openingHoursWeekdays.trim() ||
      siteContact.openingHoursSaturday.trim() ||
      siteContact.openingHoursSunday.trim()
  );

  return (
    <footer className="bg-surface border-t border-border/75">
      <div className="container-wide py-12 md:py-14 grid gap-10 md:grid-cols-3">
        <div className="md:pr-8">
          <p className="font-serif text-[1.65rem] sm:text-4xl leading-tight tracking-tight text-primary mb-1">
            {siteBrand.name}
          </p>
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-primary/80 mb-5"
            style={{ fontVariant: "small-caps" }}
          >
            — {siteBrand.tagline} —
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Medicinsk skönhetsklinik med legitimerade sjuksköterskor. Första bokningen är konsultation i {siteContact.city}; behandling planeras efter 48 timmars betänketid.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Kontakt
          </h3>
          <ul className="space-y-3 text-sm">
            {hasPhone && (
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-primary mt-1 shrink-0" />
                <TelLink className="font-medium text-foreground hover:text-primary transition-colors">
                  {siteContact.phoneDisplay}
                </TelLink>
              </li>
            )}
            {hasEmail && (
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-primary mt-1 shrink-0" />
                <MailLink className="text-foreground hover:text-primary break-all transition-colors">
                  {siteContact.emailDisplay}
                </MailLink>
              </li>
            )}
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary mt-1 shrink-0" />
              <span className="text-foreground">{siteContact.addressOneLine}</span>
            </li>
          </ul>
          {!hasPhone && !hasEmail && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-4 max-w-xs">
              Adress är publicerad nu. Övriga kontaktuppgifter läggs in när de är klara för publicering.
            </p>
          )}
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Öppettider
          </h3>

          {hasAnyHours ? (
            <ul className="space-y-2.5 text-sm text-foreground">
              {siteContact.openingHoursWeekdays.trim() && (
                <li className="flex justify-between gap-4 border-b border-border/75 pb-2">
                  <span className="text-muted-foreground">Mån–Fre</span>
                  <span className="font-medium tabular-nums text-right">
                    {siteContact.openingHoursWeekdays}
                  </span>
                </li>
              )}
              {siteContact.openingHoursSaturday.trim() && (
                <li className="flex justify-between gap-4 border-b border-border/75 pb-2">
                  <span className="text-muted-foreground">Lördag</span>
                  <span className="font-medium tabular-nums text-right">
                    {siteContact.openingHoursSaturday}
                  </span>
                </li>
              )}
              {siteContact.openingHoursSunday.trim() && (
                <li className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Söndag</span>
                  <span className="text-muted-foreground tabular-nums text-right">
                    {siteContact.openingHoursSunday}
                  </span>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Öppettider uppdateras här när de är fastställda.
            </p>
          )}

          <Link to="/boka" className="btn-primary mt-6 w-full">
            Boka konsultation
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed mt-3">
            {siteBookingNotice}
          </p>
        </div>
      </div>

      <div className="border-t border-border/75">
        <div className="container-wide py-7 flex flex-col items-center gap-3">
          <Ornament className="text-foreground/25" width={72} glyph="diamond" />
          <p className="text-xs text-muted-foreground text-center tracking-wide">
            © {new Date().getFullYear()} {siteBrand.name} · Alla rättigheter förbehållna
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
