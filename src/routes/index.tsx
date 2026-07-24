import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, X, Mic2, Settings2, Sliders, Speaker,
  ShieldCheck, Wrench, Truck, Sparkles,
  MapPin, Mail, Phone, ArrowRight, CheckCircle2, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel, CarouselContent, CarouselItem,
} from "@/components/ui/carousel";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-console.jpg";
import gearConsole from "@/assets/gear-console.jpg";
import gearBackline from "@/assets/gear-backline.jpg";
import gearSpeakers from "@/assets/gear-speakers.jpg";
import gearMic from "@/assets/gear-mic.jpg";

const siteUrl = import.meta.env.VITE_SITE_URL ?? "http://localhost:5173";
const lovableAssetUrl = (path: string) => `https://shobdo-sonic-glow.lovable.app${path.startsWith("/") ? path : `/${path}`}`;


const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gear", label: "Gear Inventory" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const services = [
  {
    icon: Sliders,
    title: "Mid-Scale Live Production",
    desc: "Turnkey sound reinforcement for concerts, outdoor festivals, weddings, and large community events up to 2,000 capacity. Complete delivery, setup, flawless mixing, and strike.",
  },
  {
    icon: Settings2,
    title: "System Tuning & Engineering",
    desc: "Professional front-of-house and monitor mixing, system optimization, and freelance engineering for venues and touring acts.",
  },
];

const highlights = [
  { icon: ShieldCheck, title: "Certified Audio Engineers", desc: "Expert mixing for any crowd size." },
  { icon: Wrench, title: "Pro-Grade Equipment", desc: "Meticulously maintained, industry-standard gear." },
  { icon: Truck, title: "Seamless DMV Logistics", desc: "On-time delivery, setup, and strike." },
  { icon: Sparkles, title: "Custom Tailored Solutions", desc: "From intimate panels to massive outdoor concerts." },
];

type GearCategory = "consoles" | "speakers" | "microphones";

const gearItems: Record<GearCategory, { name: string; spec: string; image: string }[]> = {
  consoles: [
    { name: "Midas M32", spec: "Industry-standard 40-input digital live console", image: lovableAssetUrl("/__l5e/assets-v1/932d96a4-7f4b-4eb8-862b-b9ce2d50a898/midas_m32.png") },
    { name: "Yamaha TF3", spec: "48 mono inputs · TouchFlow workflow", image: lovableAssetUrl("/__l5e/assets-v1/21a1e05d-481a-4c74-99c4-41485e076799/yamaha_tf3.png") },
    { name: "Behringer XAir, Midas MR18, Midas M32C", spec: "Compact rack & wireless-control digital mixers", image: lovableAssetUrl("/__l5e/assets-v1/b0730dfc-9200-4bee-a73f-bd657785d048/midas_behringer_rack.png") },
  ],
  speakers: [
    { name: "RCF Line Array (3x3)", spec: "Engineered for 1,000–2,000 person crowd coverage", image: lovableAssetUrl("/__l5e/assets-v1/a30a15ae-eda5-4e11-8773-708815f640ba/rcf_black.png") },
    { name: "QSC & RCF Subwoofers", spec: "High-impact low end for outdoor festivals", image: lovableAssetUrl("/__l5e/assets-v1/78815b2b-f323-4d73-9dcc-4e3f6e4fd488/qsc_subs.png") },
    { name: "QSC K12.2 Powered Speakers", spec: "2,000W active tops · monitors or fills", image: lovableAssetUrl("/__l5e/assets-v1/7a7ddff4-82ba-4a55-8005-9ca46925b1c0/qsc_k122.png") },
    { name: "Yamaha DBR12 Powered Speakers", spec: "Reliable powered tops for fills & breakouts", image: lovableAssetUrl("/__l5e/assets-v1/d39432fc-edb8-47d2-8b59-5d6146af5c76/yamaha_dbr12.png") },
  ],
  microphones: [
    { name: "Shure SM57 / SM58 / Beta 58", spec: "Industry-standard dynamic vocal & instrument mics", image: lovableAssetUrl("/__l5e/assets-v1/0aebe5bc-6ca7-454d-b3b9-d8361df975c6/shure_mics.png") },
  ],
};

const tabs: { value: GearCategory; label: string; icon: typeof Mic2 }[] = [
  { value: "speakers", label: "Speakers & PA", icon: Speaker },
  { value: "consoles", label: "Digital Consoles", icon: Sliders },
  { value: "microphones", label: "Microphones", icon: Mic2 },
];

const reviews: { quote: string; author: string; role?: string }[] = [
  {
    quote:
      "Sadaf is one of the BEST sound Engineers I have ever worked with. He single handedly conducted an amazing show at the Top of the Town in Arlington, VA. The sound was flawless and the entire show was so good just because of Sadaf's unparalleled control of the sound system. The pricing was very reasonable. I will not go to anyone but Sadaf to do my sound engineering for all my shows that I organize as I don't have to worry about the most important aspect of any show which is the sound system. I wish Sadaf and Tuned all the best!!",
    author: "Faisal Quader",
    role: "Founder of BEST",
  },
  {
    quote:
      "Tuned is an exceptional sound production company! Sadaf worked seamlessly throughout our event and went above and beyond to ensure every performance, announcement, and presentation was heard clearly to the entire audience. He has been an essential part of our community by bringing his best at every event, big or small, with amazing service and speed. Sadaf effortlessly took charge of all sound management at our 100+ guest event, going through soundchecks with all performers and emcees, maintaining an organized stage, and solving any problems that came up throughout the day. Whatever you need, Sadaf got it handled!",
    author: "Evana",
    role: "Singer / Songwriter",
  },
  {
    quote: "Our sound check and live band performance ran perfectly thanks to Tuned.",
    author: "Live Band Client",
  },
  {
    quote:
      "Arranged a small valentine's day gathering at my house and had a small musical event. Tuned turned the whole atmosphere into something magical with sound! These people genuinely loves this craft and you can see it in their eyes, and in their craft! Price was very reasonable! Kudos to Tuned, and to Sadaf!",
    author: "Sharmin Shayla",
    role: "Event Organizer",
  },
  {
    quote:
      "We were very skeptical about sound when the event organizer told us that Tuned was going to do sound for us, since we didn't really know who they were and how would they do! But boy were we astounded! Incredibly good! Sadaf is just flawless and probably the most patient dude we have ever come across! We have been hiring them for every gig ever since!",
    author: "Agoon",
    role: "Local band based in Maryland",
  },
  {
    quote:
      "I initially hired Tuned Audio for my daughter's graduation ceremony because they were the most affordable option I could find. I wasn't expecting this level of professionalism, but they were simply brilliant, absolutely brilliant! The sound was excellent, everything ran smoothly, and they made the entire experience stress-free. I wouldn't hesitate to hire them again.",
    author: "Kathy",
  },
  {
    quote:
      "Sadaf is an incredibly talented musician and did an outstanding job managing the sound at my sister's wedding. From the ceremony to the reception, everything sounded clear, balanced, and professionally handled. He was organized, attentive to every detail, and ensured the music and audio ran seamlessly throughout the event. His musical talent, professionalism, and calm presence made a real difference on such an important day. We received many compliments from our guests about the quality of the sound and the overall atmosphere he helped create. I highly recommend Sadaf to anyone looking for a skilled musician and reliable sound professional for weddings or special events. Thank you for helping make my sister's wedding so memorable!",
    author: "Alif",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Tuned",
  "image": new URL("/og.jpg", siteUrl).href,
  "description": "Premium PA systems, digital consoles, wireless mics, and live audio engineering serving DC, Maryland, and Virginia.",
  "url": siteUrl,
  "telephone": "+1-202-555-0143",
  "email": "bookings@tunedaudio.com",
  "areaServed": [
    { "@type": "City", "name": "Washington, DC" },
    { "@type": "State", "name": "Maryland" },
    { "@type": "State", "name": "Virginia" },
  ],
  "serviceType": [
    "Live Sound Engineering",
    "PA System Rental",
    "Audio Equipment Rental",
    "Event Production",
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": String(reviews.length),
  },
  "review": reviews.map((r) => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": r.author },
    "reviewBody": r.quote,
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tuned — Audio Services | Pro Sound Rental in the DMV" },
      { name: "description", content: "Premium PA systems, digital consoles, wireless mics, and live audio engineering serving DC, Maryland, and Virginia." },
      { property: "og:title", content: "Tuned — Audio Services | Pro Sound in the DMV" },
      { property: "og:description", content: "Premium sound rentals, live engineering, and event production across the DMV." },
      { property: "og:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const [reviewsApi, setReviewsApi] = useState<import("embla-carousel-react").UseEmblaCarouselType[1] | null>(null);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);

  useEffect(() => {
    if (!reviewsApi) {
      return;
    }

    const updateSelectedIndex = () => {
      setSelectedReviewIndex(reviewsApi.selectedScrollSnap());
    };

    updateSelectedIndex();
    reviewsApi.on("select", updateSelectedIndex);
    reviewsApi.on("reInit", updateSelectedIndex);

    return () => {
      reviewsApi.off("select", updateSelectedIndex);
      reviewsApi.off("reInit", updateSelectedIndex);
    };
  }, [reviewsApi]);

  useEffect(() => {
    if (!reviewsApi) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const snapCount = reviewsApi.scrollSnapList().length;
      if (!snapCount) {
        return;
      }

      const nextIndex = (reviewsApi.selectedScrollSnap() + 1) % snapCount;
      setSelectedReviewIndex(nextIndex);
      reviewsApi.scrollTo(nextIndex);
    }, 3500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [reviewsApi]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Quote request sent", {
      description: "Our team will follow up within one business day.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex flex-col leading-none">
            <span className="font-montserrat text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
              Tuned
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              Audio Services
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
            <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow">
              <a href="#contact">Get a Quote</a>
            </Button>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="#contact" onClick={() => setOpen(false)}>Get a Quote</a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative isolate overflow-hidden">
          <img
            src={heroImg}
            alt="Live concert mixing console"
            width={1920}
            height={1280}
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 -z-10 bg-(image:--gradient-hero)" />
          <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />

          <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Serving DC · Maryland · Virginia
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
              Engineered for the Crowd.{" "}
              <span className="text-gradient-primary">Built for the Mix.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Professional live sound production with premium gear, optimized for
              small-to-medium events of 1,000 to 2,000 people across the DMV area.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow">
                <a href="#gear">Explore Our Inventory <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-card/40 backdrop-blur hover:bg-card">
                <a href="#contact">Book Production</a>
              </Button>
            </div>

            <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 border-t border-border/60 pt-8">
              {[
                { k: "1K–2K", v: "Crowd capacity" },
                { k: "DMV", v: "DC · MD · VA" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-bold text-foreground sm:text-3xl">{s.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about-tuned" className="border-t border-border/60 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Our Story" title="About Tuned." />
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  Tuned was built from a genuine love for live sound. What started as a small setup in
                  a family garage has grown into providing professional audio services for medium-sized
                  concerts, festivals, weddings, corporate events, and community gatherings.
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Our goal has never been to become the biggest-and we never intend to be.
                  </span>{" "}
                  We're passionate about creating memorable experiences through great sound and helping every
                  event sound its best.
                </p>
                <p>
                  We believe professional-quality audio should be accessible to everyone.{" "}
                  <span className="font-semibold text-foreground">
                    That's why we keep our pricing fair and often below the industry average,
                  </span>{" "}
                  making high-quality sound more affordable for local communities and event organizers.
                </p>
                <p>
                  At the end of the day, we're simply people who love the craft of live sound-and we're
                  excited to share that passion with every event we serve.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                  <img
                    src={gearConsole}
                    alt="Tuned audio mixing console"
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                    <img
                      src={gearSpeakers}
                      alt="Speaker and PA equipment"
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                    <img
                      src={gearMic}
                      alt="Microphone setup for live events"
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT — LEADERSHIP */}
        <section id="about" className="border-t border-border/60 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Led by Ahsan Sadaf.
              </h2>
              <p className="mt-6 text-sm uppercase tracking-widest text-primary">
                CEO & Lead Sound Engineer
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="border-t border-border/60 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Services" title="Built for the mid-scale stage." />
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GEAR */}
        <section id="gear" className="relative border-t border-border/60 py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Gear Inventory" title="The rig behind 2,000-person events." />

            <Tabs defaultValue="speakers" className="mt-12">
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                {tabs.map((t) => (
                  <TabsTrigger
                    key={t.value}
                    value={t.value}
                    className="gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <t.icon className="h-4 w-4" />
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((t) => (
                <TabsContent key={t.value} value={t.value} className="mt-10">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gearItems[t.value].map((g) => (
                      <article
                        key={g.name}
                        className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                      >
                        <div className="aspect-4/3 overflow-hidden bg-muted">
                          <img
                            src={g.image}
                            alt={g.name}
                            width={800}
                            height={640}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-base font-bold">{g.name}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">{g.spec}</p>
                          <Button asChild variant="ghost" className="mt-4 h-auto p-0 text-primary hover:bg-transparent hover:text-primary">
                            <a href="#contact">
                              Request in Quote <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="border-t border-border/60 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Why Tuned" title="Engineered for the room. Built for the road." />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.title} className="rounded-2xl border border-border bg-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-bold">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        {/* REVIEWS */}
        <section id="reviews" className="border-t border-border/60 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Reviews" title="What community people say." />
            <Carousel opts={{ loop: true, align: "start" }} setApi={setReviewsApi} className="mt-14">
              <CarouselContent>
                {reviews.map((r) => (
                  <CarouselItem key={r.author} className="md:basis-1/2 lg:basis-1/3">
                    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
                      <Quote className="h-8 w-8 text-primary" />
                      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-muted-foreground">
                        {r.quote}
                      </blockquote>
                      <figcaption className="mt-6 border-t border-border/60 pt-4">
                        <div className="text-sm font-bold text-foreground">{r.author}</div>
                        {r.role && (
                          <div className="mt-1 text-xs uppercase tracking-widest text-primary">
                            {r.role}
                          </div>
                        )}
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex flex-col items-center gap-5">
                <div className="flex flex-wrap justify-center gap-2">
                  {reviewsApi?.scrollSnapList().map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedReviewIndex(index);
                        reviewsApi?.scrollTo(index);
                      }}
                      aria-label={`Go to review slide ${index + 1}`}
                      aria-current={selectedReviewIndex === index}
                      className={cn(
                        "h-2.5 rounded-full transition-all",
                        selectedReviewIndex === index
                          ? "w-8 bg-primary"
                          : "w-2.5 bg-border hover:bg-primary/60",
                      )}
                    />
                  ))}
                </div>
              </div>
            </Carousel>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative border-t border-border/60 py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Request a Quote
                </span>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                  Let's chat.
                </h2>

                <div className="mt-10 space-y-4 rounded-2xl border border-border bg-card p-6">
                  <ContactRow icon={MapPin} title="Coverage" value="DC · Maryland · Virginia" />
                  <ContactRow icon={Mail} title="Email" value="bookings@tunedaudio.com" />
                  <ContactRow icon={Phone} title="Phone" value="(202) 555-0143" />
                </div>

                <ul className="mt-8 space-y-3 text-sm">
                  {["Free site survey for full productions", "Insured & licensed", "Backup rigs on standby"].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" required>
                    <Input id="name" name="name" required placeholder="Jane Smith" maxLength={100} />
                  </Field>
                  <Field id="email" label="Email" required>
                    <Input id="email" name="email" type="email" required placeholder="jane@venue.com" maxLength={255} />
                  </Field>
                  <Field id="date" label="Event Date" required>
                    <Input id="date" name="date" type="date" required />
                  </Field>
                  <Field id="location" label="Event Location" required>
                    <Input id="location" name="location" required placeholder="Washington, DC" maxLength={200} />
                  </Field>
                  <Field id="crowd" label="Estimated Crowd Size">
                    <Select name="crowd" defaultValue="1000-2000">
                      <SelectTrigger id="crowd">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-500">Under 500</SelectItem>
                        <SelectItem value="500-1000">500 – 1,000</SelectItem>
                        <SelectItem value="1000-2000">1,000 – 2,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field id="service" label="Service Needed">
                    <Select name="service" defaultValue="full">
                      <SelectTrigger id="service">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Production</SelectItem>
                        <SelectItem value="rental">Gear Rental Only</SelectItem>
                        <SelectItem value="engineering">Sound Engineering Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field id="details" label="Tell Us About Your Event / Gear Needed" className="sm:col-span-2">
                    <Textarea
                      id="details"
                      name="details"
                      rows={5}
                      placeholder="Venue size, headcount, performers, channel count, anything specific…"
                      maxLength={2000}
                    />
                  </Field>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow sm:w-auto"
                >
                  Send Booking Request <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex flex-col leading-none">
            <span className="font-montserrat text-base font-extrabold tracking-tight text-foreground">
              Tuned
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Audio Services
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Proudly serving Washington D.C., Maryland, and Virginia. © {new Date().getFullYear()} Tuned.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}

function ContactRow({ icon: Icon, title, value }: { icon: typeof Mail; title: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/30">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function Field({
  id, label, required, className, children,
}: { id: string; label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="ml-1 text-primary">*</span>}
      </Label>
      {children}
    </div>
  );
}
