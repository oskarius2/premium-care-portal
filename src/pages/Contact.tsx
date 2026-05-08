import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";
import { siteBrand, siteMedicalDisclaimer } from "@/config/siteBrand";
import { siteContact } from "@/config/siteContact";
import { TelSurfaceLink, MailSurfaceLink } from "@/components/ContactAnchors";
import { Ornament } from "@/components/ui/Ornament";

const Contact = () => {
  return (
    <>
      {/* HERO */}
      <section className="bg-surface section-y-sm border-b border-border/75">
        <div className="container-wide max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow">Kontakt</span>

          <Ornament className="text-foreground/30 mt-5 mb-6 md:mt-6 md:mb-7" width={88} glyph="diamond" />

          <h1 className="heading-xl text-balance">
            Hör av dig{" "}
            <em className="font-serif italic font-normal text-primary/85">
              när du vill.
            </em>
          </h1>

          <p className="lead mt-5 md:mt-7 max-w-2xl">
            Vi hjälper dig med frågor om behandling, tider, avbokning eller om du vill diskutera lämplighet innan du bokar ett specifikt protokoll.
          </p>

          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed border-t border-border/75 pt-7 mt-9">
            {siteMedicalDisclaimer}
          </p>
        </div>
      </section>

      {/* KONTAKTKORT */}
      <section className="section-y-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 grid-divided max-w-5xl mx-auto">
            <TelSurfaceLink className="group bg-background p-7 md:p-9 flex flex-col transition-colors hover:bg-card">
              <div className="flex items-center justify-between mb-6">
                <span className="eyebrow">Telefon</span>
                <Phone size={16} strokeWidth={1.75} className="text-primary/70" />
              </div>
              <p className="font-serif text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
                {siteContact.phoneDisplay}
              </p>
              <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">
                {siteContact.openingHoursSummary}
              </p>
            </TelSurfaceLink>

            <MailSurfaceLink className="group bg-background p-7 md:p-9 flex flex-col transition-colors hover:bg-card">
              <div className="flex items-center justify-between mb-6">
                <span className="eyebrow">E-post</span>
                <Mail size={16} strokeWidth={1.75} className="text-primary/70" />
              </div>
              <p className="font-serif text-2xl md:text-[1.875rem] leading-tight tracking-tight text-foreground mb-2 break-all group-hover:text-primary transition-colors">
                {siteContact.emailDisplay}
              </p>
              <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">
                {siteContact.emailReplyHint}
              </p>
            </MailSurfaceLink>

            <div className="bg-background p-7 md:p-9 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="eyebrow">Adress</span>
                <MapPin size={16} strokeWidth={1.75} className="text-primary/70" />
              </div>
              <p className="font-serif text-2xl md:text-[1.625rem] leading-tight tracking-tight text-foreground mb-1">
                {siteContact.addressStreet}
              </p>
              <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">
                {siteContact.addressPostalLine}
              </p>
            </div>

            <div className="bg-background p-7 md:p-9 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="eyebrow">Öppettider</span>
                <Clock size={16} strokeWidth={1.75} className="text-primary/70" />
              </div>
              <ul className="text-[0.9375rem] space-y-2.5">
                <li className="flex justify-between gap-4 border-b border-border/75 pb-2">
                  <span className="text-muted-foreground">Mån–Fre</span>
                  <span className="font-medium tabular-nums text-foreground text-right">{siteContact.openingHoursWeekdays}</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-border/75 pb-2">
                  <span className="text-muted-foreground">Lördag</span>
                  <span className="font-medium tabular-nums text-foreground text-right">{siteContact.openingHoursSaturday}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Söndag</span>
                  <span className="text-muted-foreground tabular-nums text-right">{siteContact.openingHoursSunday}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link to="/boka" className="btn-primary btn-large">
              <Calendar size={20} strokeWidth={1.75} /> Boka tid online istället
            </Link>
          </div>
        </div>
      </section>

      {/* KARTA */}
      <section className="bg-surface border-y border-border/75 py-12 md:py-16">
        <div className="container-wide">
          {siteContact.mapEmbedUrl ? (
            <div className="media-frame overflow-hidden aspect-[16/9]">
              <iframe
                title={`Karta till ${siteBrand.name}`}
                src={siteContact.mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-foreground/15 bg-background/80 aspect-[16/9] flex flex-col items-center justify-center px-6 text-center">
              <MapPin className="text-primary/60 mb-4" size={32} strokeWidth={1.5} />
              <p className="font-serif text-lg md:text-xl leading-tight text-foreground mb-2">
                Karta kommer snart
              </p>
              <p className="text-[0.9375rem] text-muted-foreground max-w-md leading-relaxed">
                När besöksadressen är spikad: lägg in en inbäddnings-URL från Google Maps eller OpenStreetMap i{" "}
                <code className="text-[0.8125rem] bg-muted px-2 py-0.5 rounded">siteContact.mapEmbedUrl</code>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
