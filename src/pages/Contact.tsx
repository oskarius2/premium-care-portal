import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";
import { siteBookingNotice, siteBrand, siteMedicalDisclaimer } from "@/config/siteBrand";
import { siteContact } from "@/config/siteContact";
import { TelSurfaceLink, MailSurfaceLink } from "@/components/ContactAnchors";
import { Ornament } from "@/components/ui/Ornament";
import PageFlowNav from "@/components/layout/PageFlowNav";

const Contact = () => {
  const hasPhone = Boolean(siteContact.phoneDisplay.trim() && siteContact.phoneTel);
  const hasEmail = Boolean(siteContact.emailDisplay.trim() && siteContact.emailAddress);
  const hasAnyHours = Boolean(
    siteContact.openingHoursWeekdays.trim() ||
      siteContact.openingHoursSaturday.trim() ||
      siteContact.openingHoursSunday.trim()
  );

  return (
    <>
      <section className="bg-surface section-y-sm border-b border-border/75">
        <div className="container-wide max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow">Kontakt</span>
          <Ornament
            className="text-foreground/30 mt-4 mb-5 sm:mt-5 sm:mb-6 md:mt-6 md:mb-7"
            width={72}
            glyph="diamond"
          />

          <h1 className="heading-xl text-balance">
            Här hittar du
            <em className="font-serif italic font-normal text-primary/85"> kliniken.</em>
          </h1>

          <p className="lead mt-4 sm:mt-5 md:mt-7 max-w-2xl">
            Kontaktsidan är tillfälligt förenklad tills alla uppgifter är färdiga för publicering. Adressen är inlagd nu, och övriga kontaktvägar kan fyllas på senare utan att sidan behöver byggas om.
          </p>

          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed border-t border-border/75 pt-6 sm:pt-7 mt-7 sm:mt-9">
            {siteBookingNotice} {siteMedicalDisclaimer}
          </p>
        </div>
      </section>

      <section className="section-y-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 grid-divided max-w-5xl mx-auto">
            {hasPhone ? (
              <TelSurfaceLink className="group bg-background p-6 sm:p-7 md:p-9 flex flex-col transition-colors hover:bg-card">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span className="eyebrow">Telefon</span>
                  <Phone size={16} strokeWidth={1.75} className="text-primary/70" />
                </div>
                <p className="font-serif text-[1.7rem] sm:text-3xl md:text-4xl leading-tight tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors break-all">
                  {siteContact.phoneDisplay}
                </p>
                <p className="text-[0.92rem] sm:text-[0.9375rem] text-muted-foreground leading-relaxed">
                  {siteContact.openingHoursSummary || "Telefonuppgifter publiceras tillsammans med öppettider."}
                </p>
              </TelSurfaceLink>
            ) : (
              <div className="bg-background p-6 sm:p-7 md:p-9 flex flex-col">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span className="eyebrow">Telefon</span>
                  <Phone size={16} strokeWidth={1.75} className="text-primary/40" />
                </div>
                <p className="font-serif text-[1.55rem] sm:text-2xl md:text-[1.875rem] leading-tight tracking-tight text-foreground mb-2">
                  Publiceras senare
                </p>
                <p className="text-[0.92rem] sm:text-[0.9375rem] text-muted-foreground leading-relaxed">
                  När telefonnummer och telefontider är klara läggs de in här utan att designen behöver ändras.
                </p>
              </div>
            )}

            {hasEmail ? (
              <MailSurfaceLink className="group bg-background p-6 sm:p-7 md:p-9 flex flex-col transition-colors hover:bg-card">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span className="eyebrow">E-post</span>
                  <Mail size={16} strokeWidth={1.75} className="text-primary/70" />
                </div>
                <p className="font-serif text-[1.4rem] sm:text-2xl md:text-[1.875rem] leading-tight tracking-tight text-foreground mb-2 break-all group-hover:text-primary transition-colors">
                  {siteContact.emailDisplay}
                </p>
                <p className="text-[0.92rem] sm:text-[0.9375rem] text-muted-foreground leading-relaxed">
                  {siteContact.emailReplyHint || "Svarstid visas här när e-postadressen är publicerad."}
                </p>
              </MailSurfaceLink>
            ) : (
              <div className="bg-background p-6 sm:p-7 md:p-9 flex flex-col">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span className="eyebrow">E-post</span>
                  <Mail size={16} strokeWidth={1.75} className="text-primary/40" />
                </div>
                <p className="font-serif text-[1.55rem] sm:text-2xl md:text-[1.875rem] leading-tight tracking-tight text-foreground mb-2">
                  Kommer snart
                </p>
                <p className="text-[0.92rem] sm:text-[0.9375rem] text-muted-foreground leading-relaxed">
                  E-postadress kan aktiveras senare när den är klar för publicering och kopplad till kliniken.
                </p>
              </div>
            )}

            <div className="bg-background p-6 sm:p-7 md:p-9 flex flex-col">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <span className="eyebrow">Adress</span>
                <MapPin size={16} strokeWidth={1.75} className="text-primary/70" />
              </div>
              <p className="font-serif text-[1.4rem] sm:text-2xl md:text-[1.625rem] leading-tight tracking-tight text-foreground mb-1">
                {siteContact.addressStreet}
              </p>
              <p className="text-[0.92rem] sm:text-[0.9375rem] text-muted-foreground leading-relaxed">
                {siteContact.addressPostalLine}
              </p>
            </div>

            <div className="bg-background p-6 sm:p-7 md:p-9 flex flex-col">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <span className="eyebrow">Öppettider</span>
                <Clock size={16} strokeWidth={1.75} className="text-primary/70" />
              </div>
              {hasAnyHours ? (
                <ul className="text-[0.92rem] sm:text-[0.9375rem] space-y-2 sm:space-y-2.5">
                  {siteContact.openingHoursWeekdays.trim() && (
                    <li className="flex justify-between gap-3 sm:gap-4 border-b border-border/75 pb-2">
                      <span className="text-muted-foreground">Mån–Fre</span>
                      <span className="font-medium tabular-nums text-foreground text-right">
                        {siteContact.openingHoursWeekdays}
                      </span>
                    </li>
                  )}
                  {siteContact.openingHoursSaturday.trim() && (
                    <li className="flex justify-between gap-3 sm:gap-4 border-b border-border/75 pb-2">
                      <span className="text-muted-foreground">Lördag</span>
                      <span className="font-medium tabular-nums text-foreground text-right">
                        {siteContact.openingHoursSaturday}
                      </span>
                    </li>
                  )}
                  {siteContact.openingHoursSunday.trim() && (
                    <li className="flex justify-between gap-3 sm:gap-4">
                      <span className="text-muted-foreground">Söndag</span>
                      <span className="text-muted-foreground tabular-nums text-right">
                        {siteContact.openingHoursSunday}
                      </span>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-[0.92rem] sm:text-[0.9375rem] text-muted-foreground leading-relaxed">
                  Öppettider publiceras här när schemat är fastställt.
                </p>
              )}
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-12 md:mt-16">
            <Link to="/boka" className="btn-primary btn-large w-full sm:w-auto justify-center">
              <Calendar size={20} strokeWidth={1.75} /> Boka konsultation online
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface border-y border-border/75 py-10 sm:py-12 md:py-16">
        <div className="container-wide">
          {siteContact.mapEmbedUrl ? (
            <div className="media-frame overflow-hidden aspect-[4/3] sm:aspect-[16/9]">
              <iframe
                title={`Karta till ${siteBrand.name}`}
                src={siteContact.mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-foreground/15 bg-background/80 aspect-[4/3] sm:aspect-[16/9] flex flex-col items-center justify-center px-5 sm:px-6 text-center">
              <MapPin className="text-primary/60 mb-3 sm:mb-4" size={28} strokeWidth={1.5} />
              <p className="font-serif text-[1.05rem] sm:text-lg md:text-xl leading-tight text-foreground mb-2">
                Karta kommer snart
              </p>
              <p className="text-[0.92rem] sm:text-[0.9375rem] text-muted-foreground max-w-md leading-relaxed">
                När kartlänk finns på plats kan den läggas in direkt i{" "}
                <code className="text-[0.78rem] sm:text-[0.8125rem] bg-muted px-2 py-0.5 rounded">
                  siteContact.mapEmbedUrl
                </code>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-y-sm">
        <div className="container-wide">
          <PageFlowNav currentPath="/kontakt" />
        </div>
      </section>
    </>
  );
};

export default Contact;
